import React from "react";
import PropTypes from "prop-types"
import "./PDF3A.scss"
import pdfMake from "pdfmake/build/pdfmake";
import { EpfConstants } from "../../constants/EpfConstants";
import { groupBy } from "lodash";

export const MONTHS = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
}
const PDF3A = (props) => {

  const { tableData } = props;
  const { name, uan } = tableData[0]
  const groupedByTableData = groupBy(tableData, (data) => data.year);
  const yearlyData = {};
  for (const year of Object.keys(groupedByTableData)) {
    const currentYear = groupedByTableData[year];
    const startMonth = 4;
    yearlyData[year] = [];
    currentYear.forEach((monthData) => {
      if (monthData.month >= startMonth) {
        yearlyData[year].push(monthData);
      } else {
        yearlyData[year - 1]?.push(monthData);
      }
    })
  }

  let pdfPrintableContent = [];
  Object.values(yearlyData).forEach((yearData, yearIndex) => {
    // const isLastPage = yearIndex === Object.values(yearlyData).length - 1;
    if (!yearData?.length) return;
    const first = yearData[0];
    const periodFrom = `1st April ${first.year}`;
    const periodTo = `31st March ${first.year + 1}`;
    // !Header Content Definition
    const headerContent = [{ text: "(FORM 3-A Revised)", style: "header" },
    {
      text: "THE EMPLOYEES' PROVIDENT FUNDS SCHEME, 1952 AND THE EMPLOYEES' PENSION SCHEME, 1995",
      style: "header",
    },
    { text: "(Paras 35 and 42) and [Para 19]", style: "header" }];

    pdfPrintableContent.push(...headerContent);


    // !Define the table header
    const tableHeader = {
      style: "tableheader",
      table: {
        body: [
          [
            { text: "THE PERIOD FROM", style: "tableheader" },
            {
              text: `${periodFrom} to ${periodTo}`,
              style: "tableheader",
            },
          ],
        ],
      },
      layout: "noBorders",
    };
    pdfPrintableContent.push(tableHeader);

    // !Table Sub Header Definition
    const tableSubHeader = {
      style: "tablesubheader",
      table: {
        body: [
          ["1.ACCOUNT NO.", ":", `TN/2839/${uan}`],
          ["2.NAME/SURNAME", ":", `${name}`],
          ["3.Father's or Husband's Name", ":", ``],
          ["4.Name and Address of the Establishment", ":", "T.N.H.W.C.S.Ltd., (CO-OPTEX) Chennai-8.",],
          ["5.Statutory Rate of PF Contribution", ":", "12%"],
          ["6.Voluntary higher rate of employees Contribution if any", ":", "Rs.",],
        ],
      },
      layout: "noBorders",
    };

    pdfPrintableContent.push(tableSubHeader);

    // !Sentence Text Above Table
    const sentenceText = [
      {
        text: "Certified that the total amount of contribution (both shares) indicated in this CARD, i.e. Rs ........... has already been remitted in full A/c  No.1 and Pension A/c no.10 Rs ...........",
        style: "sentence",
      },
      {
        text: "Certified that the difference between the total of the contributions shown under columns 3 and 4(b) of the table and that arrived at on the total wages shown in column 2 at the prescribed rate is solely due to the rounded off the contribution to the nearest rupee under rules.",
        style: "sentence",
      },
    ];
    pdfPrintableContent.push(...sentenceText);


    // Get the current year data and form the table definition object 
    // This will create table definition for the current financial year
    let amountOfWages = 0, workerShare = 0, epfDiffBtwn = 0, pensionFnd = 0, amntAlreadyRemitd = 0, diffAmt = 0;
    let tableDataSource = [];
    let SummationRow = ["Total"];

    yearData.forEach((monthData, index) => {
      const { name, uan, year, month, ...rest } = monthData;
      tableDataSource.push([`${MONTHS[month]}-${year}`, ...Object.values(rest), null]);
      amountOfWages += rest.wages;
      workerShare += rest.work_share;
      epfDiffBtwn += rest.epf_diff_amount;
      pensionFnd += rest.pen_contr;
      amntAlreadyRemitd += rest.already_remitted;
      diffAmt += rest.difference_amount;
      if (index === yearData.length - 1) {
        SummationRow.push(...[amountOfWages, workerShare, epfDiffBtwn, pensionFnd, amntAlreadyRemitd, diffAmt, null]);
      }

    });

    pdfPrintableContent.push(
      {
        table: {
          body: [
            [{ rowSpan: 2, text: 'Month' }, { rowSpan: 2, text: 'Amount of Wages' }, { rowSpan: 2, text: 'Workers Share EPF' }, { colSpan: 2, text: 'Employers Share' }, '', { rowSpan: 2, text: 'Amount already remitted' }, { rowSpan: 2, text: 'Difference Amount' }, { rowSpan: 2, text: 'Remarks' }],
            ['', '', '', 'EPF Difference Between 12% and 8.33%', 'Pension Fund Contribution 8.33%', '', '', ''],
            ['1', '2', '3 \n2x10/12', '4 (a) \n3-4(b)', '4(b) \n 2 x 8.33%', '5', '6\n4 (b) - 5', '7'], 
            ...tableDataSource,
            SummationRow,
          ]
        }, margin: [10, 10, 10, 10], alignment: 'center',
      },
      {
        table: {
          body: [
            [{ text: 'DATE :        /        /   ', margin: [0, 20, 30, 10] }, { text: '(OFFICE SEAL)', margin: [50, 20, 30, 10] }, { text: 'AUTHORISED SIGNATORY', margin: [50, 20, 10, 10] },],
          ]
        }, margin: [10, 50, 0, 0], layout: 'noBorders', pageBreak: "after"
      });
  });

  // SummationRow.push(...[amountOfWages, workerShare, epfDiffBtwn, pensionFnd, diffAmt, amntAlreadyRemitd, null]);

  // const tableDef = {
  //   table: {
  //     body: [
  //       [{ rowSpan: 2, text: 'Month' }, { rowSpan: 2, text: 'Amount of Wages' }, { rowSpan: 2, text: 'Workers Share EPF' }, { colSpan: 2, text: 'Employers Share' }, '', { rowSpan: 2, text: 'Difference Amount' }, { rowSpan: 2, text: 'Amount already remitted' }, { rowSpan: 2, text: 'Remarks' }],
  //       ['', '', '', 'EPF Difference Between 12% and 8.33%', 'Pension Fund Contribution 8.33%', ''],
  //       ['1', '2', '3 \n2x10/12', '4 (a) \n3-4(b)', '4(b) \n 2 x 8.33%', '5', '6\n4 (b) - 5', '7'],
  //       ...tableDataSource,
  //       SummationRow,
  //     ]
  //   }, margin: [10, 10, 10, 10], alignment: 'center', pageBreak: "after",
  // };

  //!Create the pdf print object 
  // Collate the styles 
  const pdfToPrint = {
    header: (currentPage) => [{ text: `PAGE: ${currentPage}`, style: "tableheader"}],
    content: pdfPrintableContent,
    styles: EpfConstants.styles
  };

  const downloadPdf = () => {
    pdfMake.createPdf(pdfToPrint).download(`${uan}-FORM3A`);
  };

  return (
    <div className="pdf3a-container">
      <div>
        <button className="button-arounder" onClick={downloadPdf}>Download Form 3A</button>
      </div>
    </div>
  );
};

export default PDF3A;

PDF3A.propTypes = {
  tableData: PropTypes.array.isRequired
}

// month, wages, work_share, epf_diff_amount, pen_contr, difference_amount
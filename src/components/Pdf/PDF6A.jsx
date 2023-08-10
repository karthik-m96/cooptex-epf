import React from "react";
import "./PDF6A.scss";
import PropTypes from "prop-types"
import { EpfConstants } from "../../constants/EpfConstants";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { groupBy } from "lodash";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PDF6A = (props) => {

  const yearsColumn = [2018, 2019, 2020, 2021, 2022, 2023, 2024]

  const { tableData } = props;
  const { name, uan } = tableData[0];

  const pdfData = {
    accountNumber: `TN/2839/${uan}`,
    firstName: `${name}`,
    fileName: `${uan} Form 6A`,
  };
  const { firstName, accountNumber, fileName } = pdfData;
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

  //-------------------------------------------------------------------------------

  let pdfPrintableContent = [];

  const headerContent = [{ text: "(FORM 6-A)", style: "header" },
  {
    text: "THE TAMILNADU HANDLOOM WEAVERS' CO-OPERATIVE SOCIETY LTD.,(CO-OPTEX) Chennai-8.",
    style: "header",
  },
  {
    text: "THE EMPOLYEE PROVIDENT FUND SCHEME 1952 EMPLOYEE SCHEME 1995.",
    style: "header",
    margin: [10, 10, 10, 0],
  },
  {
    text: "ABSTRACT FOR PENSION FUND 8.33% ALREADY REMITTED & DIFFERENCE",
    style: "header",
  }];
  pdfPrintableContent.push(...headerContent);


  const tableHeader = [
    {
      style: "tableheader",
      table: {
        body: [
          [
            { text: `PF NO : ${accountNumber}`, style: "tableheader" },
            {
              text: `NAME: ${firstName}`,
              style: "tableheader",
              margin: [70, 5, 0, 0],
            },
          ],
        ],
      },
      layout: "noBorders",
    }
  ];
  pdfPrintableContent.push(tableHeader);

  let SummationRow = [];
  let TotalSummationRow = [];
  let amountOfWagesSummation = 0, workerShareSummation = 0, epfDiffBtwnSummation = 0, pensionFndSummation = 0, diffAmtSummation = 0, amntAlreadyRemitdSummation = 0;
  Object.values(yearlyData).forEach((yearData, yearIndex) => {

    // !Get the current year data and form the table definition object 
    // !This will create table definition for the current financial year
    let amountOfWages = 0, workerShare = 0, epfDiffBtwn = 0, pensionFnd = 0, diffAmt = 0, amntAlreadyRemitd = 0;
    yearData.forEach((monthData, index) => {
      const { name, uan, year, month, ...rest } = monthData;
      // Summation of all months data w.r.t current year
      amountOfWages += rest.wages;
      workerShare += rest.work_share;
      epfDiffBtwn += rest.epf_diff_amount;
      pensionFnd += rest.pen_contr;
      diffAmt += rest.difference_amount;
      amntAlreadyRemitd += rest.already_remitted;

      // ?Final summation of all the columns respective to each year
      // ?This is used for the final row which shows summation of all the years
      amountOfWagesSummation += amountOfWages;
      workerShareSummation += workerShare;
      epfDiffBtwnSummation += epfDiffBtwn;
      epfDiffBtwnSummation += epfDiffBtwn;
      pensionFndSummation += pensionFnd;
      diffAmtSummation += diffAmt;
      amntAlreadyRemitdSummation += amntAlreadyRemitd;

      if (index === yearData.length - 1) {
        SummationRow.push([(yearIndex + 1), yearsColumn[yearIndex], amountOfWages, workerShare, epfDiffBtwn, pensionFnd, diffAmt, amntAlreadyRemitd]);
      }


    });


    // *After loop exits for the yearly data 
    // *Check if this is the final index
    if (yearIndex === Object.values(yearlyData).length - 1) {
      TotalSummationRow.push(["", "Total", amountOfWagesSummation, workerShareSummation, epfDiffBtwnSummation, pensionFndSummation, diffAmtSummation, amntAlreadyRemitdSummation]);
    }
  });

  //--------------------------------------------------------------

  const tableDef = [
    {
      table: {
        body: [
          [
            { rowSpan: 2, text: "No of Years", bold: true },
            { rowSpan: 2, text: "Year", bold: true },
            { rowSpan: 2, text: "Amount of Wages", bold: true },
            { rowSpan: 2, text: "Workers Share EPF", bold: true },
            { colSpan: 2, text: "Employers Share", bold: true },
            "",
            { rowSpan: 2, text: "Amount already remitted", bold: true },
            { rowSpan: 2, text: "Difference Amount", bold: true },
          ],
          [
            null,
            null,
            null,
            null,
            { text: "EPF Difference Between 12% and 8.33%", bold: true },
            { text: "Pension Fund Contribution 8.33%", bold: true },
            "",
          ],
          ["", "1", "2", "3 \n2x10/12", "4 (a) \n3-4(b)", "4(b) \n 2 x 8.33%", "5", "6\n4 (b) - 5",],
          ...SummationRow,
          ...TotalSummationRow,
        ],
      },
      margin: [10, 10, 10, 10],
      alignment: "center",
    }
  ];
  pdfPrintableContent.push(tableDef);

  const footer = [
    {
      table: {
        body: [
          [
            { text: "DATE :        /        /   ", margin: [0, 10, 30, 10] },
            { text: "(OFFICE SEAL)", margin: [50, 10, 30, 10] },
            { text: "AUTHORISED SIGNATORY", margin: [50, 10, 10, 10] },
          ],
        ],
      }, margin: [10, 50, 0, 0], layout: "noBorders",
    },
  ];
  pdfPrintableContent.push(...footer);

  const pdfToPrint = { content: pdfPrintableContent, styles: EpfConstants.styles }


  const downloadPdf = () => {
    pdfMake.createPdf(pdfToPrint).download(`${fileName}`);
  };

  return (
    <div className="pdf6a-container">
      <div>
        <button className="button-arounder" onClick={downloadPdf}>Download Form 6A</button>
      </div>
    </div>
  );
};

export default PDF6A;


PDF6A.propTypes = {
  tableData: PropTypes.array.isRequired
}

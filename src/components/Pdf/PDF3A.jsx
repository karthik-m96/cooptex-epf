import React from "react";
import PropTypes from "prop-types"
import "./PDF3A.scss"
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { EpfConstants } from "../../constants/EpfConstants";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PDF3A = (props) => {

  const {tableData} = props;
  const {name, uan} = tableData[0]

  //TODO: Append the pdf data from props
  const pdfData = {
    periodFrom: "1st April 1995",
    periodTo: "31st March 1996",
    accountNumber: `TN/2839/${uan}`,
    firstName: `${name}`,
    fatherName: ``,
    husbandName: "",
    fileName: `${uan} Form 3A`,
  };
  const tableDataSource = tableData.map(({month, wages, work_share, epf_diff_amount, pen_contr, difference_amount}) => {
   return [month, wages, work_share, epf_diff_amount, pen_contr, difference_amount, pen_contr-difference_amount,null]
  });
  let pdfPrintableContent = [];
  const { periodFrom, periodTo, accountNumber, fatherName, firstName, husbandName, fileName } = pdfData;

  // !Header Content Definition
  const headerContent = [{ text: "(FORM 3-A Revised)", style: "header" },
  {
    text: "THE EMPLOYEES' PROVIDENT FUNDS SCHEME, 1952 AND THE EMPLOYEES' PENSION SCHEME, 1995",
    style: "header",
  },
  { text: "(Paras 35 and 42) and [Para 19]", style: "header" }];

  pdfPrintableContent.push(...headerContent);

  // !Define the table header
  const tableHeader =
  {
    style: "tableheader",
    table: {
      body: [
        [
          { text: "THE PERIOD FROM", style: "tableheader" },
          {
            text: `${periodFrom} to ${periodTo}`,
            style: "tableheader",
          },
          { text: "PAGE: 1", style: "tableheader" },
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
        ["1.ACCOUNT NO.", ":", `${accountNumber}`],
        ["2.NAME/SURNAME", ":", `${firstName}`],
        ["3.Father's or Husband's Name", ":", `${fatherName || husbandName}`],
        [
          "4.Name and Address of the Establishment",
          ":",
          "T.N.H.W.C.S.Ltd., (CO-OPTEX) Chennai-8.",
        ],
        ["5.Statutory Rate of PF Contribution", ":", "10%"],
        [
          "6.Voluntary higher rate of employees Contribution if any",
          ":",
          "Rs.",
        ],
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

  // !Define table columns and append table data

  const tableDef = {
    table: {
      body: [
        [{ rowSpan: 2, text: 'Month' }, { rowSpan: 2, text: 'Amount of Wages' }, { rowSpan: 2, text: 'Workers Share EPF' }, { colSpan: 2, text: 'Employers Share' }, '', { rowSpan: 2, text: 'Difference Amount' }, { rowSpan: 2, text: 'Amount already remitted' }, { rowSpan: 2, text: 'Remarks' }],
        ['', '', '', 'EPF Difference Between 12% and 8.33%', 'Pension Fund Contribution 8.33%', ''],
        ['1', '2', '3 \n2x10/12', '4 (a) \n3-4(b)', '4(b) \n 2 x 8.33%', '5', '6\n4 (b) - 5', '7'],
        ...tableDataSource
      ]
    }, margin: [10, 10, 10, 10], alignment: 'center',
  };

  pdfPrintableContent.push(tableDef);

  //!Define Pdf Footer
  const footer = {
    table: {
      body: [
        [{ text: 'DATE :        /        /   ', margin: [0, 10, 30, 10] }, { text: '(OFFICE SEAL)', margin: [50, 10, 30, 10] }, { text: 'AUTHORISED SIGNATORY', margin: [50, 10, 10, 10] },],

      ]
    }, margin: [10, 50, 0, 0], layout: 'noBorders'
  };

  pdfPrintableContent.push(footer);

  //!Create the pdf print object 
  // Collate the styles 
  const pdfToPrint = { content: pdfPrintableContent, styles: EpfConstants.FORM3A.styles };

  const downloadPdf = () => {
    pdfMake.createPdf(pdfToPrint).download(fileName);
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
  tableData : PropTypes.array.isRequired
}

// month, wages, work_share, epf_diff_amount, pen_contr, difference_amount
import React from "react";
import "./PDF6A.scss";
import PropTypes from "prop-types"
import { EpfConstants } from "../../constants/EpfConstants";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PDF6A = (props) => {

  const { tableData } = props;
  const { name, uan } = tableData[0]
  const SummationRow = ["1", "2018"];
  let amountOfWages = 0, workerShare = 0, epfDiffBtwn = 0, pensionFnd = 0, diffAmt = 0, amountAlreadyRemitted = 0;
  tableData.forEach(({ name, uan, ...rest }) => {
    const values = Object.values(rest);
    amountOfWages += rest.wages;
    workerShare += rest.work_share;
    epfDiffBtwn += rest.epf_diff_amount;
    pensionFnd += rest.pen_contr;
    diffAmt += rest.difference_amount;
    amountAlreadyRemitted += rest.already_remitted;
    return [...values, null];
  });
  SummationRow.push(...[amountOfWages, workerShare, epfDiffBtwn, pensionFnd, amountAlreadyRemitted, diffAmt]);
  console.log(SummationRow);

  const pdfData = {
    accountNumber: `TN/2839/${uan}`,
    firstName: `${name}`,
    fileName: `${uan} Form 3A`,
  };

  let pdfPrintableContent = [];

  const {uan, name} = pdfData

  const pdf = {
    content: [
      { text: "(FORM 6-A)", style: "header" },
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
      },

      {
        style: "tableheader",
        table: {
          body: [
            [
              { text: `PF NO : TN/MAS/2839/${uan}`, style: "tableheader" },
              {
                text: `NAME: ${name}`,
                style: "tableheader",
                margin: [70, 5, 0, 0],
              },
            ],
          ],
        },
        layout: "noBorders",
      },

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
            SummationRow,
          ],
        },
        margin: [10, 10, 10, 10],
        alignment: "center",
      },
      {
        table: {
          body: [
            [
              { text: "DATE :        /        /   ", margin: [0, 10, 30, 10] },
              { text: "(OFFICE SEAL)", margin: [50, 10, 30, 10] },
              { text: "AUTHORISED SIGNATORY", margin: [50, 10, 10, 10] },
            ],
          ],
        },
        margin: [10, 50, 0, 0],
        layout: "noBorders",
      },
    ],
    styles: {
      header: {
        fontSize: 11,
        bold: true,
        alignment: "center",
      },
      tableheader: {
        fontSize: 10,
        bold: true,
        alignment: "center",
        margin: [30, 5, 5, 5],
      },
      tablesubheader: {
        fontSize: 11,
        bold: true,
      },
      sentence: {
        fontSize: 11,
        bold: true,
        margin: [0, 10, 0, 0],
      },
    },
  };

  const downloadPdf = () => {
    pdfMake.createPdf(pdf).download(`${uan} Form 6A`);
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

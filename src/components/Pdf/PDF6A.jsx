import React from "react";
import "./PDF6A.scss";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PDF6A = (props) => {
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
              { text: `PF NO : TN/MAS/2839/${props.uan}`, style: "tableheader" },
              {
                text:`NAME: ${props.name}`,
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
              { rowSpan: 2, text: "No of Years" },
              { rowSpan: 2, text: "Year" },
              { rowSpan: 2, text: "Amount of Wages" },
              { rowSpan: 2, text: "Workers Share EPF" },
              { colSpan: 2, text: "Employers Share" },
              "",
              { rowSpan: 2, text: "Amount already remitted" },
              { rowSpan: 2, text: "Difference Amount" },
            ],
            [
              "",
              "",
              "",
              "",
              "EPF Difference Between 12% and 8.33%",
              "Pension Fund Contribution 8.33%",
              "",
            ],
            [
              "", "1", "2", "3 \n2x10/12", "4 (a) \n3-4(b)", "4(b) \n 2 x 8.33%", "5", "6\n4 (b) - 5",],
            ["", "", `${props.wages}`, "", "", "", "", " "],

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
    pdfMake.createPdf(pdf).download(`${props.uan} Form 6A`);
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

import ExcelJs from "exceljs";

export const createExcel = () => {
  // createWorkbook
  const workBook = new ExcelJs.Workbook();

  // Createsheet
  const sheet = workBook.addWorksheet("sheetName");

  sheet.columns = [
    {
      header: "Month",
      key: "totalYears",
    },
    {
      header: "Amount of wages",
      key: "wages",
    }
  ];

  sheet.addRow({totalYears: 10, wages: 52245});

  workBook.xlsx.writeBuffer().then((data)=>{
    const blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "download.xlsx";
    anchor.click();
    window.URL.revokeObjectURL(url);
  });
};

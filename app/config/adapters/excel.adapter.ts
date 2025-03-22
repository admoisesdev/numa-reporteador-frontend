import * as XLSX from "xlsx";

export class ExcelAdapter {
  static generate(
    data: Record<string, any>[],
    fileName: string,
    sheetName: string = "Hoja1"
  ) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }
}

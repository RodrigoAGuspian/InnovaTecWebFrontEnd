import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string, otherData1?: any[], otherData2?: any[], desdeCelda1?: string, desdeCelda2?: string): void {
    const wu = XLSX.utils;
    const worksheet: XLSX.WorkSheet = wu.json_to_sheet(json);
    try {
      XLSX.utils.sheet_add_json(worksheet, otherData1, {skipHeader: false, origin: desdeCelda1});
    } catch (error) {

    }
    try {
      XLSX.utils.sheet_add_json(worksheet, otherData2, {skipHeader: false, origin: desdeCelda2});
    } catch (error) {

    }
    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }
}

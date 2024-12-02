import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { getExcelDateFromJs, getJsDateFromExcel } from 'excel-date-to-js';
import { BlankWorksheetUsedRangeRegExp, ExcelDataChangeTypeEnum, IConditionCellValueRule, IWorksheetTableConfig, IWorksheetVisibility, RangeObjectRegExp } from '@common/schemas';
import { LogService } from '../log.service';

declare const Office;
declare const Excel;

@Injectable({
    providedIn: 'root'
})
/**
* excel limitation
* @see https://support.microsoft.com/en-us/office/excel-specifications-and-limits-1672b34d-7043-467e-8e27-269d656771c3?ui=en-us&rs=en-us&ad=us#ID0EBABAAA=Excel_2016-2013
*/
export class ExcelService {
    log = inject(LogService);

    /**
     * Checks if the specified requirement set is supported by the host Office application.
     * @param {string} version
     * @returns {boolean}
     * @see https://docs.microsoft.com/en-us/javascript/api/office?view=excel-js-1.14#office-office-issetsupported-function(1)
     * @see https://docs.microsoft.com/en-us/office/dev/add-ins/develop/specify-office-hosts-and-api-requirements#runtime-checks-for-method-and-requirement-set-support
     */
    isVersionSupport(version: string): boolean {
        return Office.context.requirements.isSetSupported('ExcelApi', version);
    }

    getAllWorksheets$() {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheets = context.workbook.worksheets;
                worksheets.load('items/id');
                worksheets.load('items/name');
                await context.sync();
                observer.next(worksheets.items);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'getAllWorksheets$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * Gets the currently active worksheet in the workbook.
     * @returns {Observable{*}}
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.worksheetcollection?view=excel-js-preview#excel-excel-worksheetcollection-getactiveworksheet-member(1)
     * #### [ API set: ExcelApi 1.1 ]
     * @example
     * await Excel.run(async (context) => {  
        const activeWorksheet = context.workbook.worksheets.getActiveWorksheet();
        activeWorksheet.load('name');
        await context.sync();
        console.log(activeWorksheet.name);
    });
     */
    getActiveWorksheet$() {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getActiveWorksheet();
                worksheet.load('items/id');
                worksheet.load('items/name');
                await context.sync();
                observer.next(worksheet);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'getActiveWorksheet$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @description Important:  Worksheet names cannot:
        - Be blank.
        - Contain more than 31 characters.
        - Contain any of the following characters: / \ ? * : [ ]. For example, 02/17/2016 would not be a valid worksheet name, but 02-17-2016 would work fine.
        - Begin or end with an apostrophe ('), but they can be used in between text or numbers in a name.
        - Be named 'History'. This is a reserved word Excel uses internally.
     * @param {string} name Worksheet name.
     * @returns {*}
     * @see https://support.microsoft.com/en-us/office/rename-a-worksheet-3f1f7148-ee83-404d-8ef0-9ff99fbad1f9
     */
    validateWorksheetName(name: string, target: string) {
        let error = false;
        let cause = '';
        if (!error && typeof name !== 'string') {
            error = true;
            cause = `${target} is invalid.`;
        }
        if (!error && name === '') {
            error = true;
            cause = `${target} cannot be blank.`;
        }
        if (!error && typeof name === 'string' && name.length > 31) {
            error = true;
            cause = `${target} names cannot contain more than 31 characters.`;
        }
        if (!error && typeof name === 'string' && /[\/\\\?\*\:\[\]]/g.test(name)) {
            error = true;
            cause = `${target} is currently containing these characters: / \ ? * : [ ]. Please change to a different name.`;
        }
        if (!error && typeof name === 'string' && /^'|'$/g.test(name)) {
            error = true;
            cause = `${target} names cannot begin or end with an apostrophe (')`;
        }
        if (!error && typeof name === 'string' && name === 'History') {
            error = true;
            cause = `${target} names cannot be named 'History'`;
        }
        return ({ error, cause });
    }

    /**
     * Gets a worksheet object using its name or ID.
     * @param {string} key The name or ID of the worksheet.
     * @return {Observable<*>}
     * @see https://docs.microsoft.com/en-us/javascript/api/excel/excel.worksheetcollection?view=excel-js-preview#getItem_key_
     * #### [ API set: ExcelApi 1.1 ]
     */
    ensureWorksheet$(key: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(key);
                worksheet.load('items/id');
                worksheet.load('items/name');
                await context.sync();
                observer.next(worksheet);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', `ensureWorksheet$ (${key})`, err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * Activate the worksheet in the Excel UI.
     * @param {string} key The name or ID of the worksheet.
     * @return {Observable<*>}
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.worksheet?view=excel-js-preview#excel-excel-worksheet-activate-member(1)
     * #### [ API set: ExcelApi 1.1 ]
     * @example
     * await Excel.run(async (context) => { 
            const wSheetName = 'Sheet1';
            const worksheet = context.workbook.worksheets.getItem(wSheetName);
            worksheet.activate();
            await context.sync(); 
        });
     */
    activeWorksheet$(worksheetKey: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                worksheet.activate();
                worksheet.load('items/id');
                worksheet.load('items/name');
                await context.sync();
                observer.next(worksheet);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', `activeWorksheet$ ${worksheetKey}`, err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * Autofit Worksheet Columns and Rows
     * @param {string} key The name or ID of the worksheet.
     * @return {Observable<*>}
     * #### [ API set: ExcelApi 1.1 ]
     */
    autoFitWorksheetColumnsAndRows$(worksheetKey: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                if (this.isVersionSupport('1.2')) {
                    worksheet.getUsedRange().format.autofitColumns();
                    worksheet.getUsedRange().format.autofitRows();
                    await context.sync();
                    worksheet.load('items/id');
                    worksheet.load('items/name');
                }
                await context.sync();
                observer.next(worksheet);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'autoFitWorksheetColumnsAndRows$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * Autofit Worksheet Columns and Rows
     * @param {string} key The name or ID of the worksheet.
     * @return {Observable<*>}
     * #### [ API set: ExcelApi 1.1 ]
     */
    autoFitWorksheetColumns$(worksheetKey: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                if (this.isVersionSupport('1.2')) {
                    worksheet.getUsedRange().format.autofitColumns();
                    await context.sync();
                    worksheet.load('items/id');
                    worksheet.load('items/name');
                }
                await context.sync();
                observer.next(worksheet);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'autoFitWorksheetColumnsAndRows$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * Set width column
     * @param {string} key The name or ID of the worksheet.
     * @param {string} range The column range.
     * @return {Observable<*>}
     * #### [ API set: ExcelApi 1.2 ]
     */
    setWidthWorksheetColumn$(worksheetKey: string, range: string, witdh: number = 300) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                const foundRange = worksheet.getRange(range);
                foundRange.format.columnWidth = witdh;
                await context.sync();
                worksheet.load('items/id');
                worksheet.load('items/name');
                await context.sync();
                observer.next(worksheet);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'setWidthWorksheetColumn$$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * wrap text
     * @param {string} key The name or ID of the worksheet.
     * @param {string} range The column range.
     * @return {Observable<*>}
     * #### [ API set: ExcelApi 1.2 ]
     */
    wrapTextWorksheetColumn$(worksheetKey: string, range: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                const foundRange = worksheet.getRange(range);
                foundRange.format.columnWidth = 300;
                foundRange.format.wrapText = true;
                await context.sync();
                worksheet.load('items/id');
                worksheet.load('items/name');
                await context.sync();
                observer.next(worksheet);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'wrapTextWorksheetColumn$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * Set width column and wrap text
     * @param {string} key The name or ID of the worksheet.
     * @return {Observable<*>}
     * #### [ API set: ExcelApi 1.2 ]
     */
    unwrapTextWorksheetColumn$(worksheetKey: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                if (this.isVersionSupport('1.2')) {
                    worksheet.getUsedRange().format.wrapText = false;
                    await context.sync();
                    worksheet.load('items/id');
                    worksheet.load('items/name');
                }
                observer.next(worksheet);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'unwrapTextWorksheetColumn$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @description Adds a new worksheet to the workbook. The worksheet will be added at the end of existing worksheets. If you wish to activate the newly added worksheet, call .activate() on it.
     * @param {string} name Optional. The name of the worksheet to be added. If specified, the name should be unique. If not specified, Excel determines the name of the new worksheet.
     * @param {boolean} activate Optional. If you wish to activate the newly added worksheet.
     * @return {Observable<*>}
     * @see https://docs.microsoft.com/en-us/javascript/api/excel/excel.worksheetcollection?view=excel-js-preview#add_name_
     * #### [ API set: ExcelApi 1.1 ]
    */
    addWorksheet$(name?: string, activate = false, protection: boolean = false, hidden: boolean = false) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.add(name);
                if (activate) {
                    worksheet.activate();
                }
                if (protection) {
                    worksheet.protection.protect(null, 'appvity$2012z');
                }
                if (hidden) {
                    worksheet.visibility = IWorksheetVisibility.hidden;
                }
                worksheet.load('items/id');
                worksheet.load('items/name');
                await context.sync();
                observer.next(worksheet);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', `addWorksheet$ ${name}`, err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * 
     * @param key Worksheet name or ID.
     * @returns {*}
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.worksheet?view=excel-js-preview#excel-excel-worksheet-delete-member(1)
     * #### [ API set: ExcelApi 1.1 ]
     * @example
     * await Excel.run(async (context) => { 
            const wSheetName = 'Sheet1';
            const worksheet = context.workbook.worksheets.getItem(wSheetName);
            worksheet.delete();
            await context.sync(); 
        });
     */
    deleteWorksheet$(key: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(key);
                worksheet.delete();
                await context.sync();
                observer.next(null);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', `deleteWorksheet$ ${key}`, err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @param {string} key The name or ID of the worksheet.
     * @return {Observable<*>}
     * @see https://docs.microsoft.com/en-us/javascript/api/excel/excel.worksheet?view=excel-js-preview#excel-excel-worksheet-visibility-member
     * @see https://docs.microsoft.com/en-us/javascript/api/excel/excel.sheetvisibility?view=excel-js-preview
     */
    showWorksheet$(key: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(key);
                worksheet.visibility = IWorksheetVisibility.visible;
                worksheet.load('items/id');
                worksheet.load('items/name');
                await context.sync();
                observer.next(worksheet);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'showWorksheet$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @param {string} key The name or ID of the worksheet.
     * @return {Observable<*>}
     * @see https://docs.microsoft.com/en-us/javascript/api/excel/excel.worksheet?view=excel-js-preview#excel-excel-worksheet-visibility-member
     * @see https://docs.microsoft.com/en-us/javascript/api/excel/excel.sheetvisibility?view=excel-js-preview
     */
    hideWorksheet$(key: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(key);
                worksheet.visibility = IWorksheetVisibility.hidden;
                worksheet.load('items/id');
                worksheet.load('items/name');
                await context.sync();
                observer.next(worksheet);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'hideWorksheet$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @description Protects a worksheet. Fails if the worksheet has already been protected.
     * @param {string} key Worksheet name or ID. 
     * @return {Observable<*>}
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.worksheetprotection?view=excel-js-preview#excel-excel-worksheetprotection-protect-member(1)
     * #### [ API set: ExcelApi 1.2 for options; 1.7 for password ]
     * @example
     * // Link to full sample: https://raw.githubusercontent.com/OfficeDev/office-js-snippets/prod/samples/excel/50-workbook/data-protection.yaml
        let password = await passwordHandler();
        passwordHelper(password);
        await Excel.run(async (context) => {
            let activeSheet = context.workbook.worksheets.getActiveWorksheet();
            activeSheet.load('protection/protected');
            await context.sync();
            if (!activeSheet.protection.protected) {
                activeSheet.protection.protect(null, password);
            }
        });
     */
    protectWorksheet$(key: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(key);
                worksheet.protection.protect(null, 'appvity$2012z');
                worksheet.load('items/id');
                worksheet.load('items/name');
                await context.sync();
                observer.next(worksheet);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'protectWorksheet$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @description Pauses worksheet protection for the given worksheet object for the user in the current session. This method does nothing if worksheet protection isn't enabled or is already paused. If the password is incorrect, then this method throws an InvalidArgument error and fails to pause protection. This method does not change the protection state if worksheet protection is not enabled or already paused.
     * @param {string} key Worksheet name or ID. 
     * @return {Observable<*>}
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.worksheetprotection?view=excel-js-preview#excel-excel-worksheetprotection-pauseprotection-member(1)
     * #### [ API set: ExcelApi 1.2 for options; 1.7 for password ] [ DO NOT SUPPORT ON DESKTOP APPLICATION ]
    */
    pauseWorksheetProtection$(key: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(key);
                worksheet.protection.pauseProtection('appvity$2012z');
                worksheet.load('items/id');
                worksheet.load('items/name');
                await context.sync();
                observer.next(worksheet);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'pauseWorksheetProtection$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @description Resumes worksheet protection for the given worksheet object for the user in a given session. Worksheet protection must be paused for this method to work. If worksheet protection is not paused, then this method will not change the protection state of the worksheet.
     * @param {string} key Worksheet name or ID. 
     * @return {Observable<*>}
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.worksheetprotection?view=excel-js-preview#excel-excel-worksheetprotection-resumeprotection-member(1)
     * #### [ API set: ExcelApiOnline 1.1 ] [ DO NOT SUPPORT ON DESKTOP APPLICATION ]
    */
    resumeWorksheetProtection$(key: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(key);
                worksheet.protection.resumeProtection();
                worksheet.load('items/id');
                worksheet.load('items/name');
                await context.sync();
                observer.next(worksheet);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'resumeWorksheetProtection$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @description Unprotects a worksheet.
     * @param {string} key Worksheet name or ID. 
     * @return {Observable<*>}
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.worksheetprotection?view=excel-js-preview#excel-excel-worksheetprotection-unprotect-member(1)
     * #### [ API set: ExcelApi 1.7 for password ]
     * @example
        // Link to full sample: https://raw.githubusercontent.com/OfficeDev/office-js-snippets/prod/samples/excel/50-workbook/data-protection.yaml
        let password = await passwordHandler();
        passwordHelper(password);
        await Excel.run(async (context) => {
            let activeSheet = context.workbook.worksheets.getActiveWorksheet();
            activeSheet.protection.unprotect(password);
        });
     */
    unprotectWorksheet$(key: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(key);
                worksheet.protection.unprotect('appvity$2012z');
                worksheet.load('items/id');
                worksheet.load('items/name');
                await context.sync();
                observer.next(worksheet);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'unprotectWorksheet$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @description The following code sample gets the used range from the worksheet named Sample, loads its address property, and writes a message to the console. The used range is the smallest range that encompasses any cells in the worksheet that have a value or formatting assigned to them. If the entire worksheet is blank, the getUsedRange() method returns a range that consists of only the top-left cell.
     * @param {string} key Worksheet name or ID. 
     * @return {Observable<*>}
     * @see https://learn.microsoft.com/en-us/office/dev/add-ins/excel/excel-add-ins-ranges-get#get-used-range
     * #### [ API set: ExcelApi 1.1 ]
     * @example
     * await Excel.run(async (context) => {
            let sheet = context.workbook.worksheets.getItem('Sample');
            const range = sheet.getRange();
            range.load('address');
            await context.sync();
            console.log(`The address of the entire worksheet range is '${range.address}'`);
        });
     */
    getWorksheetUsedRange$(key: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(key);
                const usedRange = worksheet.getUsedRange();
                usedRange.load('address');
                await context.sync();
                observer.next(usedRange.address);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'getWorksheetUsedRange$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @description The following code sample gets the range object associated with the data body of the table.
     * @param {string} key Worksheet name or ID.
     * @param {string} tableName The name of the table.
     * @return {Observable<*>}
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.table?view=excel-js-preview#excel-excel-table-getdatabodyrange-member(1)
     * #### [ API set: ExcelApi 1.1 ]
     * @example
     * await Excel.run(async (context) => { 
            const tableName = 'Table1';
            const table = context.workbook.tables.getItem(tableName);
            const tableDataRange = table.getDataBodyRange();
            tableDataRange.load('address')
            await context.sync();
            
            console.log(tableDataRange.address);
        });
     */
    getTableDataBodyRange$(key: string, tableName: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(key);
                const table = worksheet.tables.getItem(tableName);
                table.load('items/id');
                table.load('items/name');
                table.load('items/rows');
                const bodyRange = table.getDataBodyRange();
                bodyRange.load('worksheet');
                bodyRange.load('rowIndex');
                bodyRange.load('rowCount');
                await context.sync();
                const tableUsedRange = bodyRange.rowIndex + bodyRange.rowCount;
                await context.sync();
                observer.next({ id: table.id, name: table.name, tableUsedRange: tableUsedRange });
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'getTableDataBodyRange$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @description Represents the raw values of the specified range. The data returned could be a string, number, or boolean. Cells that contain an error will return the error string. If the returned value starts with a plus ("+"), minus ("-"), or equal sign ("="), Excel interprets this value as a formula.
     * @param {string} key Worksheet name or ID. 
     * @param {string} range range address.
     * @return {Observable<*>}
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.range?view=excel-js-preview#excel-excel-range-values-member
     * #### [ API set: ExcelApi 1.1 ]
     */
    getRangeValue$(key: string, range: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(key);
                const foundRange = worksheet.getRange(range).load('values');
                await context.sync();
                observer.next(foundRange.values);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'getRangeValue$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * Sets the frozen cells in the active worksheet view. The range provided corresponds to cells that will be frozen in the top- and left-most pane.
     * @param {string} key Worksheet name or ID.
     * @param {Excel.Range | string} range A range that represents the cells to be frozen, or null to remove all frozen panes.
     * @returns {Observable{*}}
     * #### [ API set: ExcelApi 1.7 ]
     * @example
     * // Link to full sample: https://raw.githubusercontent.com/OfficeDev/office-js-snippets/prod/samples/excel/54-worksheet/worksheet-freeze-panes.yaml
        await Excel.run(async (context) => {
            const sheet = context.workbook.worksheets.getItem('Sample');
            // Freeze the specified range in top-and-left-most pane of the worksheet.
            sheet.freezePanes.freezeAt(sheet.getRange('H2:K5'));
            await context.sync();
        });
     */
    freezeWorksheetRange$(key: string, range: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(key);
                worksheet.freezePanes.freezeAt(worksheet.getRange(range));
                worksheet.load('items/id');
                worksheet.load('items/name');
                await context.sync();
                observer.next(worksheet);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'freezeWorksheetRange$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * Freeze the first column or columns of the worksheet in place.
     * @param {string} key Worksheet name or ID.
     * @param {number} count Number of columns to freeze, or zero to unfreeze all columns
     * @returns {Observable{*}}
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.worksheetfreezepanes?view=excel-js-preview#excel-excel-worksheetfreezepanes-freezecolumns-member(1)
     * #### [ API set: ExcelApi 1.7 ]
     * @example
        // Link to full sample: https://raw.githubusercontent.com/OfficeDev/office-js-snippets/prod/samples/excel/54-worksheet/worksheet-freeze-panes.yaml
        await Excel.run(async (context) => {
            const sheet = context.workbook.worksheets.getItem('Sample');
            // Freeze the first two columns in the worksheet.
            sheet.freezePanes.freezeColumns(2);
            await context.sync();
        });
     */
    freezeWorksheetColumns$(key: string, count: number) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(key);
                worksheet.freezePanes.freezeColumns(count);
                await context.sync();
                worksheet.load('items/id');
                worksheet.load('items/name');
                await context.sync();
                observer.next(worksheet);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'freezeWorksheetColumns$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * Freeze the top row or rows of the worksheet in place.
     * @param {string} key Worksheet name or ID.
     * @param {number} count Number of rows to freeze, or zero to unfreeze all rows
     * @returns {Observable{*}}
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.worksheetfreezepanes?view=excel-js-preview#excel-excel-worksheetfreezepanes-freezerows-member(1)
     * #### [ API set: ExcelApi 1.7 ]
     * @example
     * // Link to full sample: https://raw.githubusercontent.com/OfficeDev/office-js-snippets/prod/samples/excel/54-worksheet/worksheet-freeze-panes.yaml
        await Excel.run(async (context) => {
            const sheet = context.workbook.worksheets.getItem('Sample');
            // Freeze the top two rows in the worksheet.
            sheet.freezePanes.freezeRows(2);
            await context.sync();
        });
     */
    freezeWorksheetRows$(key: string, count: number) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(key);
                worksheet.freezePanes.freezeRows(count);
                await context.sync();
                worksheet.load('items/id');
                worksheet.load('items/name');
                await context.sync();
                observer.next(worksheet);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'freezeWorksheetRows$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * Freeze the first column or columns of the worksheet in place.
     * Freeze the top row or rows of the worksheet in place.
     * @param {string} key Worksheet name or ID.
     * @param {number} columnsCount Number of columns to freeze, or zero to unfreeze all columns
     * @param {number} rowsCount Number of rows to freeze, or zero to unfreeze all rows
     * @returns @returns {Observable{*}}
     * #### [ API set: ExcelApi 1.7 ]
     */
    freezeWorksheetColumnsAndRows$(key: string, columnsCount: number, rowsCount: number) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(key);
                worksheet.freezePanes.freezeColumns(columnsCount);
                await context.sync();
                worksheet.freezePanes.freezeRows(rowsCount);
                await context.sync();
                worksheet.load('items/id');
                worksheet.load('items/name');
                await context.sync();
                observer.next(worksheet);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'freezeWorksheetColumnsAndRows$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * Occurs when data changes in a specific worksheet.
     * @param {string} worksheetKey Worksehet name or ID.
     * @param {*} callbackFns
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.worksheet?view=excel-js-preview#excel-excel-worksheet-onchanged-member
     * #### [ API set: ExcelApi 1.7 ]
     */
    registerWorksheetOnChangedEvent$(worksheetKey: string, callbackFns) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                worksheet.load('items/id');
                worksheet.load('items/name');
                await context.sync();
                worksheet.onChanged.add(async (event: any) => {
                    if (event.changeType === ExcelDataChangeTypeEnum.rowDeleted && callbackFns.onRowDeleted) {
                        await Excel.run(async (_) => {
                            callbackFns.onRowDeleted(event);
                            this.log.log('Excel Service', 'registerWorksheetOnChangedEvent$', event);
                        });
                    }
                    if (event.changeType === ExcelDataChangeTypeEnum.rowInserted && callbackFns.onRowInserted) {
                        await Excel.run(async (_) => {
                            callbackFns.onRowInserted(event);
                            this.log.log('Excel Service', 'registerWorksheetOnChangedEvent$', event);
                        });
                    }
                    if (event.changeType === ExcelDataChangeTypeEnum.rangeEdited && callbackFns.onRangeEdited) {
                        await Excel.run(async (_) => {
                            callbackFns.onRangeEdited(event);
                            this.log.log('Excel Service', 'registerWorksheetOnChangedEvent$', event);
                        });
                    }
                });
                await context.sync();
                observer.next(worksheet);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'registerWorksheetRowDeletedEvent$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * Occurs when the workbook is activated. Note: This event will not fire when the workbook is opened.
     * @param {*} callbackFns
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.worksheetcollection?view=excel-js-preview#excel-excel-worksheetcollection-onactivated-member
     * #### [ API set: ExcelApi 1.7 ]
     */
    registerAllWorksheetsActivedEvent$(callbackFns) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheets = context.workbook.worksheets;
                worksheets.onActivated.add(async (event: any) => {
                    await Excel.run(async (_) => {
                        callbackFns();
                        this.log.log('Excel Service', 'registerAllWorksheetsActivedEvent$', event);
                    });
                });
                await context.sync();
                observer.next(worksheets);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'registerAllWorksheetsActivedEvent$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * Occurs when the workbook is activated. Note: This event will not fire when the workbook is opened.
     * @param {string} worksheetKey
     * @param {*} callbackFns
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.worksheet?view=excel-js-preview#excel-excel-worksheet-onactivated-member
     * #### [ API set: ExcelApi 1.1 ]
     */
    registerWorksheetActivedEvent$(worksheetKey: string, callbackFns) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                const eventResult = worksheet.onActivated.add(async (event: any) => {
                    await Excel.run(async (_context) => {
                        const _worksheet = _context.workbook.worksheets.getItem(event.worksheetId);
                        _worksheet.load('items/id');
                        _worksheet.load('items/name');
                        await _context.sync();
                        callbackFns(_worksheet.name);
                        this.log.log('Excel Service', 'registerWorksheetActivedEvent$', event);
                    });
                });
                await context.sync();
                observer.next(eventResult);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'registerWorksheetActivedEvent$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * Occurs when the workbook is activated. Note: This event will not fire when the workbook is opened.
     * @param {string} worksheetKey
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.worksheet?view=excel-js-preview#excel-excel-worksheet-onactivated-member
     * @see https://learn.microsoft.com/en-us/office/dev/add-ins/excel/excel-add-ins-events#remove-an-event-handler
     * #### [ API set: ExcelApi 1.1 ]
     */
    removeWorksheetActivedEvent$(eventResult: any) {
        return new Observable<any>(observer => {
            Excel.run(eventResult.context, async (context) => {
                eventResult.remove();
                await context.sync();
                observer.next(context);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'removeWorksheetActivedEvent$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * 
     * @param {string} range 
     * @returns {*}
     * @example
     * getRangeObject('Sheet1:A1:B1');
     */
    getRangeObject(range: string) {
        const found = range.match(RangeObjectRegExp);
        return { sheetName: found[1], start: found[3], end: [found[5]] }
    }

    /**
     * 
     * @param {string} range 
     * @returns {*}
     * @example
     * getRangeObject('Sheet1:A1:B1');
     */
    getRangeObjectWorksheetName(range: string) {
        const found = range.match(RangeObjectRegExp);
        return found[1];
    }

    /**
     * 
     * @param {string} range 
     * @returns {*}
     * @example
     * getRangeObject('Sheet1:A1:B1');
     */
    getRangeObjectStart(range: string) {
        const found = range.match(RangeObjectRegExp);
        return found[3];
    }

    /**
     * 
     * @param {string} range 
     * @returns {*}
     * @example
     * getRangeObject('Sheet1:A1:B1');
     */
    getRangeObjectEnd(range: string) {
        const found = range.match(RangeObjectRegExp);
        return found[5];
    }

    /**
     * 
     * @param {string} usedRange 
     * @returns {*}
     * @example
     * getUsedRangeObjectNextRowIndex('A1');
     * getUsedRangeObjectNextRowIndex('Sheet1:A1:B1');
     */
    getUsedRangeObjectNextRowIndex(usedRange: string) {
        let nextRowIndex = 1;
        if (!BlankWorksheetUsedRangeRegExp.test(usedRange)) {
            nextRowIndex = Number(this.getRangeObjectEnd(usedRange).replace(/\D/g, '')) + 2;
        }
        return nextRowIndex;
    }

    /**
     * @description Important notes for names
        - Use valid characters — Always begin a name with a letter, an underscore character (_), or a backslash (\). Use letters, numbers, periods, and underscore characters for the rest of the name.
        - Exceptions: You can’t use 'C', 'c', 'R', or 'r' for the name, because they’re already designated as a shortcut for selecting the column or row for the active cell when you enter them in the Name or Go To box.
        - Don’t use cell references — Names can’t be the same as a cell reference, such as Z$100 or R1C1.
        - Don’t use a space to separate words — Spaces cannot be used in the name. Consider how you can write the name using no spaces. Or, use an underscore character (_) or a period (.) as word separators. Examples: DeptSales, Sales_Tax or First.Quarter.
        - Maximum 255 characters — A table name can have up to 255 characters.
        - Use unique table names — Duplicate names aren’t allowed. Excel doesn’t distinguish between upper and lowercase characters in names, so if you enter “Sales” but already have another name called “SALES' in the same workbook, you’ll be prompted to choose a unique name.
     * @param {string} key 
     * @returns {string}
     * @see https://support.microsoft.com/en-us/office/rename-an-excel-table-fbf49a4f-82a3-43eb-8ba2-44d21233b114
     */
    generateTableName(key: string, isHiddenTable = false): string {
        let result = `${isHiddenTable ? 'h' : ''}exTABLE_${key.replace(/[^\w]|[\-]/gm, '')}`;
        if (result.length > 255) {
            result = result.slice(0, 255);
        }
        return result;
    }

    /**
     * @description Important notes for message
        - Maximum 255 characters — prompt message can have up to 255 characters.
     * @param {string} message 
     * @returns {string}
     */
    generatePromptMessage(message: string): string {
        if (message.length > 255) {
            let result = message.slice(0, 255);
            return result;
        } else {
            return message
        }
    }

    /**
     * @description Important:  Worksheet names cannot:
        - Be blank.
        - Contain more than 31 characters.
        - Contain any of the following characters: / \ ? * : [ ]
        - For example, 02/17/2016 would not be a valid worksheet name, but 02-17-2016 would work fine.
        - Begin or end with an apostrophe ('), but they can be used in between text or numbers in a name.
        - Be named "History". This is a reserved word Excel uses internally.
     * @param {string} key 
     * @returns {string}
     * @see https://support.microsoft.com/en-us/office/rename-a-worksheet-3f1f7148-ee83-404d-8ef0-9ff99fbad1f9
     */
    generateWorksheetName(key: string, suffix = ''): string {
        let result = `${key.replace(/[\/\\?*:[\]\s]/gm, '')}`;
        if (result.length + suffix.length > 30) {
            result = result.slice(0, 30 - suffix.length);
        }
        return result + suffix;
    }

    /**
     * @description Ensure table is existed
     * @param {string} worksheetKey Worksheet name or ID.
     * @param {string} tableKey Table name or ID. 
     * @return {Observable<*>}
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.worksheet?view=excel-js-preview#excel-excel-worksheet-tables-member
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.tablecollection?view=excel-js-preview#excel-excel-tablecollection-getitem-member(1)
     * #### [ API set: ExcelApi 1.1 ]
     */
    ensureTable$(worksheetKey: string, tableKey: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                const table = worksheet.tables.getItem(tableKey);
                table.load('items/id');
                table.load('items/name');
                table.load('items/columns');
                table.load('items/rows');
                const headerRange = table.getHeaderRowRange().load('values');
                const bodyRange = table.getDataBodyRange().load('values');
                await context.sync();
                const headerValues = headerRange.values;
                const bodyValues = bodyRange.values;
                await context.sync();
                observer.next({ id: table.id, name: table.name, columns: headerValues, rows: bodyValues });
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', `ensureTable$ (${tableKey})`, err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @description get table body range address format for a specific column
     * @param {string} worksheetKey Worksheet name or ID.
     * @param {string} tableKey Table name or ID. 
     * @param {string} column Column name such as 'A', 'B', 'C', etc.
     * @return {Observable<*>}
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.worksheet?view=excel-js-preview#excel-excel-worksheet-tables-member
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.table?view=excel-js-preview#excel-excel-table-getdatabodyrange-member(1)
     * #### [ API set: ExcelApi 1.1 ]
     */
    getTableBodyRangeAddress$(worksheetKey: string, tableKey: string, column: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                const table = worksheet.tables.getItem(tableKey);
                table.load('items/id');
                table.load('items/name');
                table.load('items/rows');
                const bodyRange = table.getDataBodyRange();
                bodyRange.load('worksheet');
                bodyRange.load('rowIndex');
                bodyRange.load('rowCount');
                await context.sync();
                const worksheetName = bodyRange.worksheet.name;
                const address = `'${worksheetName}'!$${column}$${bodyRange.rowIndex + 1}:$${column}$${bodyRange.rowIndex + bodyRange.rowCount}`;
                await context.sync();
                observer.next({ id: table.id, name: table.name, address: address });
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', `getTableBodyRangeAddress$ (${tableKey})`, err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @description Ensure table is existed
     * @param {string} worksheetKey Worksheet name or ID.
     * @param {string} tableKey Table name or ID. 
     * @return {Observable<*>}
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.tablecollection?view=excel-js-preview#excel-excel-tablecollection-items-member
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.tablecollection?view=excel-js-preview#excel-excel-tablecollection-load-member(1)
     * #### [ API set: ExcelApi 1.1 ]
     */
    retrieveWorksheetTables$(worksheetKey: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                const tables = worksheet.tables;
                tables.load({
                    id: true,
                    name: true,
                    rows: {
                        values: true,
                        valuesAsJson: true,
                    },
                    columns: {
                        values: true,
                        valuesAsJson: true
                    }
                })
                await context.sync();
                observer.next(tables);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'retrieveWorksheetTables$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @description Represents a collection of worksheets associated with the workbook.
     * @return {Observable<*>}
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.workbook?view=excel-js-preview#excel-excel-workbook-worksheets-member
     * #### [ API set: ExcelApi 1.1 ]
     */
    retrieveWorksheetsCollection$() {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheets = context.workbook.worksheets;
                worksheets.load('items/id');
                worksheets.load('items/name');
                await context.sync();
                observer.next(worksheets);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'retrieveWorksheetsCollection$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @description Creates a new table. The range object or source address determines the worksheet under which the table will be added. If the table cannot be added (e.g., because the address is invalid, or the table would overlap with another table), an error will be thrown.
     * @param {string} worksheetKey Worksheet name or ID.
     * @param {IWorksheetTableConfig} tableConfig 
     * @return {Observable<*>}
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.tablecollection?view=excel-js-preview#excel-excel-tablecollection-add-member(1)
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.range?view=excel-js-preview
     * #### [ API set: ExcelApi 1.1 ]
     * @example
        await Excel.run(async (context) => { 
            const table = context.workbook.tables.add('Sheet1!A1:E7', true);
            table.load('items/id');
            table.load('items/name');
            await context.sync();
            console.log(table);
        });
     */
    insertTable$(worksheetKey: string, tableConfig: IWorksheetTableConfig) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                const table = worksheet.tables.add(tableConfig.range, true);
                table.name = tableConfig.name;
                table.getHeaderRowRange().values = tableConfig.values;
                await context.sync();
                if (tableConfig.numberFormat) {
                    // @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.range?view=excel-js-preview#excel-excel-range-numberformat-member
                    // @see https://help.syncfusion.com/file-formats/xlsio/working-with-cell-or-range-formatting#apply-number-formats
                    table.getRange().numberFormat = tableConfig.numberFormat;
                }
                table.rows.add(null, tableConfig.rows);
                await context.sync();
                table.load('items/id');
                table.load('items/name');
                await context.sync();
                observer.next(table);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', `insertTable$ (${tableConfig.name})`, err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * 
     * @param worksheetKey 
     * @param {string} worksheetKey Worksheet name or ID.
     * @param {string} tableKey Table name or ID.
     * @param {*} rows
     * @return {Observable<*>}
     */
    updateTable$(worksheetKey: string, tableKey: string, rows: any) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                const table = worksheet.tables.getItem(tableKey);
                table.rows.load('count');
                await context.sync();
                let deletedRows = [];
                for (let index = 0; index < table.rows.count; index++) {
                    deletedRows.push(index);
                }
                table.rows.deleteRows(deletedRows);
                await context.sync();
                table.rows.add(null, rows);
                await context.sync();
                if (this.isVersionSupport('1.2')) {
                    worksheet.getUsedRange().format.autofitColumns();
                    worksheet.getUsedRange().format.autofitRows();
                    await context.sync();
                }
                table.load('items/id');
                table.load('items/name');
                await context.sync();
                observer.next(table);
                observer.complete();
            }).catch(err => {
                console.log('Excel Service', 'updateTable$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * 
     * @param {string} worksheetKey Worksheet name or ID.
     * @param {string} tableKey Table name or ID.
     * @return {Observable<*>}
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.table?view=excel-js-preview#excel-excel-table-delete-member(1)
     * #### [ API set: ExcelApi 1.1 ]
     */
    deleteTable$(worksheetKey: string, tableKey: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                const table = worksheet.tables.getItem(tableKey);
                table.delete();
                await context.sync();
                observer.next(null);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', `deleteTable$ (${tableKey})`, err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * 
     * @param {string} worksheetKey Worksheet name or ID.
     * @param {string} tableKey Table name or ID.
     * @param {string} sortKey
     * @param {boolean} ascending
     * @return {Observable<*>}
     * @see https://docs.microsoft.com/en-us/office/dev/add-ins/excel/excel-add-ins-tables#sort-data-in-a-table
     * @see https://docs.microsoft.com/en-us/javascript/api/excel/excel.tablesort?view=excel-js-preview#excel-excel-tablesort-apply-member(1)
     * @see https://docs.microsoft.com/en-us/javascript/api/excel/excel.sortfield?view=excel-js-preview#excel-excel-sortfield-key-member
     */
    sortTable$(worksheetKey: string, tableKey: string, sortKey: number, ascending: boolean) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                const table = worksheet.tables.getItem(tableKey);
                table.sort.apply([
                    {
                        key: sortKey,
                        ascending: ascending
                    }
                ]);
                table.load('items/id');
                table.load('items/name');
                await context.sync();
                observer.next(table);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'sortTable$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * 
     * @param {string} worksheetKey Worksheet name or ID.
     * @param {string} tableKey Table name or ID.
     * @return {Observable<*>}
     * @see https://learn.microsoft.com/en-us/office/dev/add-ins/excel/excel-add-ins-tables#clear-table-filters
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.table?view=excel-js-preview#excel-excel-table-clearfilters-member(1)
     * #### [ API set: ExcelApi 1.2 ]
     */
    clearFilterTable$(worksheetKey: string, tableKey: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                const table = worksheet.tables.getItem(tableKey);
                table.clearFilters();
                table.load('items/id');
                table.load('items/name');
                await context.sync();
                observer.next(table);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'clearFilterTable$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * 
     * @param {string} worksheetKey Worksheet name or ID.
     * @param {string} tableKey Table name or ID.
     * @param {number} rowAt 
     * @return {Observable<*>}
     */
    deleteTableRowAt$(worksheetKey: string, tableKey: string, rowAt: number) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                const table = worksheet.tables.getItem(tableKey);
                const row = table.rows.getItemAt(rowAt);
                row.delete();
                table.load('items/id');
                table.load('items/name');
                await context.sync();
                observer.next(table);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'deleteTableRowAt$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * 
     * @param {string} worksheetKey Worksheet name or ID.
     * @param {string} tableKey Table name or ID.
     * @param {string} columnName 
     * @returns {Observable<*>}
     */
    getTableColumnData$(worksheetKey: string, tableKey: string, columnName: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                const table = worksheet.tables.getItem(tableKey);
                const colRange = table.columns.getItem(columnName).getDataBodyRange().load('values');
                await context.sync();
                const data: Array<string> = [];
                for (let i = 0; i < colRange.values.length; i++) {
                    data.push(colRange.values[i].toString());
                }
                observer.next(data);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'getTableColumnData$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @param {string} worksheetKey Worksheet name or ID.
     * @param {string} range Range address
     * @param {string} color Hex color
     * @returns {Observable<*>}
     * @see https://docs.microsoft.com/en-us/office/dev/add-ins/reference/requirement-sets/excel-api-requirement-sets
     * #### [ API set: ExcelApi 1.1 ]
     */
    colorCell$(worksheetKey: string, range: string, color: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                const foundRange = worksheet.getRange(range);
                foundRange.format.fill.color = color;
                await context.sync();
                observer.next(true);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'colorCell$', err);
                observer.next(false);
                observer.complete();
            });
        })
    }

    /**
     * @param {string} worksheetKey Worksheet name or ID.
     * @param {*[]} items Range address
     * @returns {Observable<*>}
     * @see https://docs.microsoft.com/en-us/office/dev/add-ins/reference/requirement-sets/excel-api-requirement-sets
     * #### [ API set: ExcelApi 1.1 ]
     */
    colorCells$(worksheetKey: string, items: any[]) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                items.forEach(item => {
                    const range = worksheet.getRange(item.range);
                    if (item.background) {
                        range.format.fill.color = item.background;
                    }
                    if (item.text) {
                        range.format.font.color = item.text;
                    }
                });
                await context.sync();
                observer.next(true);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'colorCells$', err);
                observer.next(false);
                observer.complete();
            });
        })

    }

    /**
     * @param {string} worksheetKey Worksheet name or ID.
     * @param {string} range
     * @returns {Observable<*>}
     * @see https://docs.microsoft.com/en-us/javascript/api/excel/excel.rangefill?view=excel-js-preview#clear_ 
     * #### [ API set: ExcelApi 1.1 ]
     */
    clearCellsBackground$(worksheetKey: string, ranges: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                const range = worksheet.getRange(ranges);
                range.format.fill.clear();
                await context.sync();
                observer.next(true);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'clearCellsBackground', err);
                observer.next(false);
                observer.complete();
            });
        })

    }

    /**
     * @param {string} worksheetKey Worksheet name or ID.
     * @param {string[]} ranges
     * @return {*}
     * @see https://docs.microsoft.com/en-us/javascript/api/excel/excel.rangefill?view=excel-js-preview#clear_ 
     * #### [ API set: ExcelApi 1.1 ]
     */
    clearRowsBackground$(worksheetKey: string, ranges: Array<string>) {
        Excel.run(async (context) => {
            const worksheet = context.workbook.worksheets.getItem(worksheetKey);
            const formatRanges: Array<any> = [];
            ranges.forEach(range => {
                formatRanges.push(worksheet.getRange(range));
            });
            if (formatRanges.length > 0) {
                formatRanges.forEach(formatRange => {
                    formatRange.format.fill.clear();
                });
            }
            await context.sync();
        }).catch(err => {
            this.log.log('Excel Service', 'clearRowsBackground', err);
            throw err;
        });
    }

    /**
     * @param {string} worksheetKey Worksheet name or ID.
     * @param {string} range
     * @return {Observable<*>}
     * #### [ API set: ExcelApi 1.1 ]
     */
    getCellValue$(worksheetKey: string, range: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                const foundRange = worksheet.getRange(range);
                foundRange.load('values');
                await context.sync();
                const value = String(foundRange.values[0][0]);
                observer.next(value);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'getCellValue$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @param {string} worksheetKey Worksheet name or ID.
     * @param {string} ranges
     * @return {Observable<*>}
     * @see https://docs.microsoft.com/en-us/office/dev/add-ins/excel/excel-add-ins-ranges#get-values-from-a-range-of-cells
     * #### [ API set: ExcelApi 1.1 ]
     */
    getCellsValue$(worksheetKey: string, ranges: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                const foundRange = worksheet.getRange(ranges);
                foundRange.load('values');
                await context.sync();
                const value = String(foundRange.values);
                observer.next(value);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'getCellsValue$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @param {string} worksheetKey Worksheet name or ID.
     * @param {string} range
     * @param {*} value
     * @return {Observable<*>}
     * @see https://docs.microsoft.com/en-us/office/dev/add-ins/excel/excel-add-ins-ranges#set-value-for-a-single-cell
     * #### [ API set: ExcelApi 1.1 ]
     */
    setCellValue$(worksheetKey: string, range: string, value: any) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                const foundRange = worksheet.getRange(range);
                foundRange.values = [[value]];
                await context.sync();
                observer.next(value);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'setCellValue$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @param {string} worksheetKey Worksheet name or ID.
     * @param {string} range
     * @param {*} value
     * @return {Observable<*>}
     * @see https://learn.microsoft.com/en-us/office/dev/add-ins/excel/excel-add-ins-ranges-set-get-values#set-values-for-a-range-of-cells
     * #### [ API set: ExcelApi 1.1 ]
     */
    setRangeOfCellsValue$(worksheetKey: string, range: string, value: any) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                const foundRange = worksheet.getRange(range);
                foundRange.values = value;
                await context.sync();
                observer.next(value);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'setCellValue$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * 
     * @param {number} number
     * @returns {string}
     */
    intToExcelCol(number: number): string {
        let colName = '';
        let dividend = Math.floor(Math.abs(number));
        let rest = 0;
        while (dividend > 0) {
            rest = (dividend - 1) % 26;
            colName = String.fromCharCode(65 + rest) + colName;
            dividend = parseInt(`${(dividend - rest) / 26}`);
        }
        return colName;
    }

    /**
     * 
     * @param {string} colName
     * @returns {number}
     */
    excelColToInt(colName: string): number {
        const digits = colName.toUpperCase().split('');
        let number = 0;
        for (let i = 0; i < digits.length; i++) {
            number += (digits[i].charCodeAt(0) - 64) * Math.pow(26, digits.length - i - 1);
        }
        return number;
    }

    /**
     * 
     * @param {number} excelDate
     * @returns {Date}
     */
    getJSDateFromExcel(excelDate: number) {
        return getJsDateFromExcel(excelDate);
    }

    getJSDateFromExcelDate(excelDate: number) {
        excelDate = excelDate + 0.0000000001;
        const offsetTimezone = new Date().getTimezoneOffset() / 60;
        const hours = Math.floor((excelDate % 1) * 24);
        const minutes = Math.floor((((excelDate % 1) * 24) - hours) * 60);
        // const minutes = Number(((((excelDate % 1) * 24) - hours) * 60).toFixed());
        const second = Math.floor((((((excelDate % 1) * 24) - hours) * 60) - minutes) * 60);
        return new Date(Date.UTC(0, 0, excelDate - 1, hours + offsetTimezone, minutes, second));
    }

    /**
     * 
     * @param {number} excelDate
     * @returns {number}
     */
    getExcelDateFromJs(jsDate: Date) {
        return getExcelDateFromJs(jsDate);
    }

    /**
     * 
     * @param {string} worksheetKey Worksheet name or ID.
     * @param {string} range 
     * @param {[*[]]} values 
     * @returns 
     */
    setRangeValues$(worksheetKey: string, range: string, values: [any[]]) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                const foundRange = worksheet.getRange(range);
                foundRange.values = values;
                foundRange.format.fill.clear();
                foundRange.format.horizontalAlignment = 'Left';
                await context.sync();
                observer.next(values);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'setRangeValues$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @description Use the list property in the DataValidationRule object to specify that the only valid values are those from a finite list. The following is an example. Note the following about this code.
    - It assumes that there is a worksheet named 'Names' and that the values in the range 'A1:A3' are names.
    - The source property specifies the list of valid values. The string argument refers to a range containing the names. You can also assign a comma-delimited list; for example: 'Sue, Ricky, Liz'.
    - The inCellDropDown property specifies whether a drop-down control will appear in the cell when the user selects it. If set to true, then the drop-down appears with the list of values from the source.
     * @param {string} worksheetKey Worksehet name or ID.
     * @param {string} range
     * @param {string} source
     * @returns {Observable<*>}
     * @see https://learn.microsoft.com/en-us/office/dev/add-ins/excel/excel-add-ins-data-validation#list-validation-rule-type
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.datavalidationrule?view=excel-js-preview
     * @see https://support.microsoft.com/en-us/office/add-or-remove-items-from-a-drop-down-list-0b26d3d1-3c4d-41f5-adb4-0addb82e8d2c
     * #### [ API set: ExcelApi 1.8 ]
     * @example
     * await Excel.run(async (context) => {
            let sheet = context.workbook.worksheets.getActiveWorksheet();
            const range = sheet.getRange('B2:C5');   
            let nameSourceRange = context.workbook.worksheets.getItem('Names').getRange('A1:A3');
            range.dataValidation.rule = {
                list: {
                    inCellDropDown: true,
                    source: '=Names!$A$1:$A$3'
                }
            }
            await context.sync();
        })
     */
    setCellListValidation$(worksheetKey: string, range: string, source: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                const foundRange = worksheet.getRange(range);
                foundRange.dataValidation.rule = {
                    list: {
                        inCellDropDown: true,
                        source: source
                    }
                }
                await context.sync();
                observer.next(source);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'setCellListValidation$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @param {string} worksheetKey Worksehet name or ID.
     * @param {*[]} item Range address
     * @returns {Observable<*>}
     * @see https://learn.microsoft.com/en-us/office/dev/add-ins/excel/excel-add-ins-data-validation#list-validation-rule-type
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.datavalidationrule?view=excel-js-preview
     * #### [ API set: ExcelApi 1.8 ]
     */
    setTableCellListValidation$(worksheetKey: string, items: any[]) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                items.forEach(item => {
                    const foundRange = worksheet.getRange(item.range);
                    if (item.source) {
                        foundRange.dataValidation.rule = {
                            list: {
                                inCellDropDown: true,
                                source: item.source
                            }
                        }
                    }
                });
                await context.sync();
                observer.next(worksheet);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'setTableCellListValidation$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @param {string} worksheetKey Worksehet name or ID.
     * @param {{ range: string, message: string, title: string }[]} item items validation
     * @returns {Observable<*>}
     * @see https://learn.microsoft.com/en-us/office/dev/add-ins/excel/excel-add-ins-data-validation#create-validation-prompts
     * #### [ API set: ExcelApi 1.8 ]
     */
    setCellsValidationPrompts$(worksheetKey: string, items: { range: string, message: string, title: string }[]) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                items.forEach(item => {
                    const foundRange = worksheet.getRange(item.range);
                    if (item.message) {
                        foundRange.dataValidation.prompt = {
                            showPrompt: true,
                            title: item.title,
                            message: item.message
                        }
                    }
                });
                await context.sync();
                observer.next(worksheet);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'setCellsValidationPrompts$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @param {string} worksheetKey Worksehet name or ID.
     * @param {string} range
     * @param {string} numberFormat see https://support.microsoft.com/en-us/office/number-format-codes-5026bbd6-04bc-48cd-bf33-80f18b4eae68
     * @returns {Observable<*>}
     * @see https://learn.microsoft.com/en-us/office/dev/add-ins/excel/excel-add-ins-ranges-set-format
     * #### [ API set: ExcelApi 1.1 ]
     * @example
     *  await Excel.run(async (context) => {
            let sheet = context.workbook.worksheets.getItem('Sample');
            let formats = [
                ['0.00', '0.00'],
                ['0.00', '0.00'],
                ['0.00', '0.00']
            ];
            let range = sheet.getRange('D3:E5');
            range.numberFormat = formats;
            await context.sync();
        });
     */
    setRangeNumberFormat$(worksheetKey: string, range: string, numberFormat: any[][]) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                const foundRange = worksheet.getRange(range);
                foundRange.numberFormat = numberFormat;
                await context.sync();
                observer.next(numberFormat);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'setCellNumberFormat$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @param {string} worksheetKey Worksehet name or ID.
     * @param {*[]} item Range address
     * @returns {Observable<*>}
     * @see https://learn.microsoft.com/en-us/office/dev/add-ins/excel/excel-add-ins-ranges-set-format
     * #### [ API set: ExcelApi 1.1 ]
     */
    setTableNumberFormat$(worksheetKey: string, items: any[]) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                items.forEach(item => {
                    const foundRange = worksheet.getRange(item.range);
                    foundRange.numberFormat = item.numberFormat;
                });
                await context.sync();
                observer.next(worksheet);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'setTableNumberFormat$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @description Cell value conditional formatting applies a user-defined format based on the results of one or two formulas in the ConditionalCellValueRule. The operator property is a ConditionalCellValueOperator defining how the resulting expressions relate to the formatting.
     * @param {string} worksheetKey Worksehet name or ID.
     * @param {string} range
     * @param {string} numberFormat see https://support.microsoft.com/en-us/office/number-format-codes-5026bbd6-04bc-48cd-bf33-80f18b4eae68
     * @returns {Observable<*>}
     * @see https://learn.microsoft.com/en-us/office/dev/add-ins/excel/excel-add-ins-conditional-formatting
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.conditionalcellvaluerule?view=excel-js-preview
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.conditionalformat?view=excel-js-preview
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.conditionalcellvalueoperator?view=excel-js-preview
     * #### [ API set: ExcelApi 1.6 ]
     * @example
     *  await Excel.run(async (context) => {
            const sheet = context.workbook.worksheets.getItem('Sample');
            const range = sheet.getRange('B21:E23');
            const conditionalFormat = range.conditionalFormats.add(
                Excel.ConditionalFormatType.cellValue
            );
            // Set the font of negative numbers to red.
            conditionalFormat.cellValue.format.font.color = 'red';
            conditionalFormat.cellValue.rule = { formula1: '=0', operator: 'LessThan' }
            await context.sync();
        });
     */
    setRangeConditionFormating$(worksheetKey: string, range: string, conditionalCellValueRule: IConditionCellValueRule, color?: string, text?: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                const foundRange = worksheet.getRange(range);
                const conditionalFormat = foundRange.conditionalFormats.add(
                    Excel.ConditionalFormatType.cellValue
                );
                if (color) {
                    conditionalFormat.cellValue.format.fill.color = color;
                }
                if (text) {
                    conditionalFormat.cellValue.format.font.color = text;
                }
                conditionalFormat.cellValue.rule = {
                    formula1: conditionalCellValueRule.formula1,
                    operator: conditionalCellValueRule.operator,
                    formular2: conditionalCellValueRule.formula2
                }
                await context.sync();
                observer.next(conditionalCellValueRule);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'setRangeConditionFormating$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }


    /**
     * Data bar conditional formatting displays a data bar in a cell, each bar's length represents the value in the cell. The length of the bar is determined by the value of the cell relative to other cells in the range. The shortest bar represents the smallest value in the range, and the longest bar represents the largest value in the range.
     * @param worksheetKey 
     * @param range 
     * @param min 
     * @param max 
     * @param color 
     * @see https://learn.microsoft.com/en-us/office/dev/add-ins/excel/excel-add-ins-conditional-formatting#data-bar
     */
    setCellDataBarConditionalFormatting$(worksheetKey: string, range: string, min: number, max: number, color: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                const foundRange = worksheet.getRange(range);
                const conditionalFormat = foundRange.conditionalFormats.add(
                    Excel.ConditionalFormatType.dataBar
                );
                conditionalFormat.dataBar.barDirection = Excel.ConditionalDataBarDirection.leftToRight;
                conditionalFormat.dataBar.lowerBoundRule = {
                    type: 'Number',
                    formula: `${min}`
                }
                conditionalFormat.dataBar.upperBoundRule = {
                    type: 'Number',
                    formula: `${max}`
                }
                conditionalFormat.dataBar.positiveFormat.fillColor = color;
                conditionalFormat.dataBar.positiveFormat.gradientFill = false;
                await context.sync();
                observer.next(worksheet);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'setCellDataBarConditionalFormatting$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @description Cell value conditional formatting applies a user-defined format based on the results of one or two formulas in the ConditionalCellValueRule. The operator property is a ConditionalCellValueOperator defining how the resulting expressions relate to the formatting.
     * @param {string} worksheetKey Worksehet name or ID.
     * @param {*[]} item Range address
     * @returns {Observable<*>}
     * @see https://learn.microsoft.com/en-us/office/dev/add-ins/excel/excel-add-ins-conditional-formatting
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.conditionalcellvaluerule?view=excel-js-preview
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.conditionalformat?view=excel-js-preview
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.conditionalcellvalueoperator?view=excel-js-preview
     * #### [ API set: ExcelApi 1.6 ]
     */
    setTableConditionFormating$(worksheetKey: string, items: any[]) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                items.forEach(item => {
                    const foundRange = worksheet.getRange(item.range);
                    const conditionalFormat = foundRange.conditionalFormats.add(
                        Excel.ConditionalFormatType.cellValue
                    );
                    if (item.color) {
                        conditionalFormat.cellValue.format.fill.color = item.color;
                    }
                    if (item.text) {
                        conditionalFormat.cellValue.format.font.color = item.text;
                    }
                    if (item.italic) {
                        conditionalFormat.cellValue.format.font.italic = item.italic;
                    }
                    if (item.underline) {
                        conditionalFormat.cellValue.format.font.underline = item.undefined;
                    }
                    conditionalFormat.cellValue.rule = {
                        formula1: item.conditionalCellValueRule.formula1,
                        operator: item.conditionalCellValueRule.operator,
                        formular2: item.conditionalCellValueRule.formula2
                    }
                });

                await context.sync();
                observer.next(worksheet);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'setTableConditionFormating$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @param {string} worksheetKey Worksehet name or ID.
     * @param {string} range
     * @returns {Observable<*>}
     * @see https://learn.microsoft.com/en-us/office/dev/add-ins/excel/excel-add-ins-data-validation#remove-data-validation-from-a-range
     * #### [ API set: ExcelApi 1.8 ]
     * @example
     * await Excel.run(async (context) => {
            let sheet = context.workbook.worksheets.getActiveWorksheet();
            const range = sheet.getRange('B2:C5');   
            let nameSourceRange = context.workbook.worksheets.getItem('Names').getRange('A1:A3');
            range.dataValidation.clear();
            await context.sync();
        })
     */
    clearCellListValidation$(worksheetKey: string, range: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                const foundRange = worksheet.getRange(range);
                foundRange.dataValidation.clear();
                await context.sync();
                observer.next(range);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'clearCellListValidation$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * Clear conditional formatting rules from the specified range.
     * @param worksheetKey 
     * @param range 
     * @see https://learn.microsoft.com/en-us/office/dev/add-ins/excel/excel-add-ins-conditional-formatting#clear-conditional-formatting-rules
     * #### [ API set: ExcelApi 1.6 ]
     * @example
     * await Excel.run(async (context) => {
            const sheet = context.workbook.worksheets.getItem("Sample");
            const range = sheet.getRange();
            range.conditionalFormats.clearFormat();

            await context.sync();
        });
     */
    clearCellListConditionalFormatting$(worksheetKey: string, range: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                const foundRange = worksheet.getRange(range);
                foundRange.conditionalFormats.clearFormat();
                await context.sync();
                observer.next(range);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'clearCellListConditionalFormatting$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @description Removes the hyperlink from the specified range.
     * @param worksheetKey 
     * @param range 
     * @returns {Observable<*>}
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.range?view=excel-js-preview#excel-excel-range-clear-member(1)
     * #### [ API set: ExcelApi 1.1 ]
     * 
     */
    clearRangeHyperLink$(worksheetKey: string, range: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                const foundRange = worksheet.getRange(range);
                foundRange.clear(Excel.ClearApplyTo.hyperlinks);
                await context.sync();
                observer.next(range);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'clearRangeHyperLink$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @param {string} worksheetKey Worksehet name or ID.
     * @param {*[]} items
     * @returns {Observable<*>}
     * @see https://learn.microsoft.com/en-us/office/dev/add-ins/excel/excel-add-ins-data-validation#remove-data-validation-from-a-range
     * #### [ API set: ExcelApi 1.8 ]
     * @example
     * await Excel.run(async (context) => {
            let sheet = context.workbook.worksheets.getActiveWorksheet();
            const range = sheet.getRange('B2:C5');   
            let nameSourceRange = context.workbook.worksheets.getItem('Names').getRange('A1:A3');
            range.dataValidation.clear();
            await context.sync();
        })
     */
    clearMultiCellsListValidation$(worksheetKey: string, items: any[]) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                items.forEach(item => {
                    const foundRange = worksheet.getRange(item.range);
                    foundRange.dataValidation.clear();
                });
                await context.sync();
                observer.next(worksheet);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'clearMultiCellsListValidation$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @param {string} worksheetKey Worksehet name or ID.
     * @param {*[]} items Range address
     * @returns {Observable<*>}
     * @see https://learn.microsoft.com/en-us/office/dev/add-ins/excel/excel-add-ins-ranges-clear-delete#clear-a-range-of-cells
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.clearapplyto?view=excel-js-preview
     * @example
     * await Excel.run(async (context) => {
            let sheet = context.workbook.worksheets.getItem("Sample");
            let range = sheet.getRange("E2:E5");
            range.clear();
            await context.sync();
        });
     */
    clearRangeOfCellsValue$(worksheetKey: string, items: any[]) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                items.forEach(item => {
                    const range = worksheet.getRange(item.range);
                    range.clear(Excel.ClearApplyTo.contents);
                });
                await context.sync();
                observer.next(worksheet);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'clearCellListValidation$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @param {string} worksheetKey Worksehet name or ID.
     * @param {string} range Range address
     * @returns {Observable<*>}
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.commentcollection?view=excel-js-preview#excel-excel-commentcollection-add-member(2)
     * @see https://learn.microsoft.com/en-us/office/dev/add-ins/excel/excel-add-ins-comments#add-comments
     * ### [ API set: ExcelApi 1.10 ]
     * @example
     * await Excel.run(async (context) => {
            let comments = context.workbook.comments;
            comments.add("MyWorksheet!A2", "TODO: add data.");
            await context.sync();
        });
     */
    addComment$(worksheetKey: string, range: string, content: string, contentType: 'Mention' | 'Plain') {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                worksheet.comments.add(`${range}`, content, contentType);
                await context.sync();
                observer.next(worksheet);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'addComment$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    getTableCollections$() {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const tableCollection = context.workbook.tables;
                tableCollection.load({
                    id: true,
                    name: true,
                    rows: {
                        values: true,
                        valuesAsJson: true,
                    },
                    columns: {
                        values: true,
                        valuesAsJson: true
                    }
                })
                await context.sync();
                observer.next(tableCollection);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'getTableCollections$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * Gets the number of worksheets in the collection.
     * @param {boolean} visibleOnly Optional. If true, considers only visible worksheets, skipping over any hidden ones.
     * @return {Observable<*>}
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.worksheetcollection?view=excel-js-preview#excel-excel-worksheetcollection-getcount-member(1)
     * #### [ API set: ExcelApi 1.4 ]
     */
    getNumberOfWorksheet$(visibleOnly?: boolean) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheetCount = context.workbook.worksheets.getCount(visibleOnly);
                await context.sync();
                observer.next(worksheetCount.value);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'getCountVisibleWorksheet$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    renameTable$(tableName: string, newName: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const table = context.workbook.tables.getItem(tableName);
                table.set({
                    name: newName
                })
                await context.sync();
                observer.next(table);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'renameTable$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    renameWorksheet$(worksheetKey: string, newName: string) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const table = context.workbook.worksheets.getItem(worksheetKey);
                table.set({
                    name: newName
                })
                await context.sync();
                observer.next(table);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'renameWorksheet$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @description Represents if all columns in the current range are hidden. Value is true when all columns in a range are hidden. Value is false when no columns in the range are hidden. Value is null when some columns in a range are hidden and other columns in the same range are not hidden.
     * @param {string} worksheetKey Worksehet name or ID.
     * @param {string} columnRange Range address
     * @param {string} isHidden Is Hidden
     * @returns {Observable<*>}
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.range?view=excel-js-preview#excel-excel-range-columnhidden-member
     * ### [ API set: ExcelApi 1.2 ]
     * @example
     * async function hideUnhideColumnAsync(hidden) {
            return Excel.run(async (context) => {

            let targetSheet = context
                            .workbook
                            .worksheets
                            .getItem('MyWorkSheet');

            targetSheet.getRange('A:A').columnHidden = hidden;

            return await context.sync();
        });
     */
    showHideColumns$(worksheetKey: string, columnRange: string, isHidden: boolean = true) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                const foundRange = worksheet.getRange(columnRange);
                foundRange.columnHidden = isHidden;
                await context.sync();
                observer.next(foundRange);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'showHideColumns$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @description Occurs when a left-clicked/tapped action happens in the worksheet. This event will not be fired when clicking in the following cases:
       - The user drags the mouse for multi-selection.
       - The user selects a cell in the mode when cell arguments are selected for formula references.
     * @param {string} worksheetKey Worksehet name or ID.
     * @param {*} callbackFns
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.worksheet?view=excel-js-preview#excel-excel-worksheet-onsingleclicked-member
     * #### [ API set: ExcelApi 1.10 ]
     */
    registerEventWorksheetClick$(worksheetKey: string, callbackFns) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                worksheet.load('items/id');
                worksheet.load('items/name');
                await context.sync();
                worksheet.onSingleClicked.add(async (event: any) => {
                    await Excel.run(async (_context) => {
                        const _worksheet = _context.workbook.worksheets.getItem(event.worksheetId);
                        _worksheet.load('items/id');
                        _worksheet.load('items/name');
                        await _context.sync();
                        callbackFns({
                            worksheetName: _worksheet.name,
                            event: event
                        });
                        this.log.log('Excel Service', 'registerEventWorksheetClick$', event);
                    });
                });
                await context.sync();
                observer.next(worksheet);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'registerEventWorksheetClick$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }

    /**
     * @description Represents the hyperlink for the current range.
     * @param {string} worksheetKey Worksehet name or ID.
     * @param {Object} values Array of objects with the following properties: { range, address, textToDisplay }
     * @returns {Observable<*>}
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.range?view=excel-js-preview#excel-excel-range-hyperlink-member
     * ### [ API set: ExcelApi 1.7 ]
     * @example
     * // Link to full sample: https://raw.githubusercontent.com/OfficeDev/office-js-snippets/prod/samples/excel/42-range/range-hyperlink.yaml
        await Excel.run(async (context) => {
            const sheet = context.workbook.worksheets.getItem("Orders");
            let productsRange = sheet.getRange("A3:A5");
            productsRange.load("values");
            await context.sync();
            // Create a hyperlink to a URL 
            // for each product name in the first table.
            for (let i = 0; i < productsRange.values.length; i++) {
                let cellRange = productsRange.getCell(i, 0);
                let cellText = productsRange.values[i][0];
                let hyperlink = {
                    textToDisplay: cellText,
                    screenTip: "Search Bing for '" + cellText + "'",
                    address: "https://www.bing.com?q=" + cellText
                }
                cellRange.hyperlink = hyperlink;
            }
            await context.sync();
        });
     */
    setCellsHyperLink$(worksheetKey: string, values: { range: string, address: string, textToDisplay?: string, screenTip?: string }[]) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                values.forEach(value => {
                    const foundRange = worksheet.getRange(value.range);
                    let hyperlink = {
                        address: value.address
                    }
                    if (value.textToDisplay) {
                        hyperlink['textToDisplay'] = value.textToDisplay;
                    }
                    if (value.screenTip) {
                        hyperlink['screenTip'] = value.screenTip;
                    }
                    foundRange.hyperlink = hyperlink;
                });
                await context.sync();
                observer.next(true);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'setCellsHyperLink$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }


    /**
     * @description Represents the formula in A1-style notation. If a cell has no formula, its value is returned instead.
     * @param worksheetKey 
     * @param values 
     * @returns {Observable<*>}
     * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.range?view=excel-js-preview#excel-excel-range-formulas-member
     * @see https://support.microsoft.com/en-us/office/hyperlink-function-333c7ce6-c5ae-4164-9c47-7de9b76f577f?ns=excel&version=90&syslcid=1033&uilcid=1033&appver=zxl900&helpid=xlmain11.chm60407&ui=en-us&rs=en-us&ad=us
     * ### [ API set: ExcelApi 1.1 ]
     */
    setCellFomulas$(worksheetKey: string, values: { range: string, formula: string }[]) {
        return new Observable<any>(observer => {
            Excel.run(async (context) => {
                const worksheet = context.workbook.worksheets.getItem(worksheetKey);
                values.forEach(value => {
                    const foundRange = worksheet.getRange(value.range);
                    foundRange.formulas = [[value.formula]];
                });
                await context.sync();
                observer.next(true);
                observer.complete();
            }).catch(err => {
                this.log.log('Excel Service', 'setCellFomulas$', err);
                observer.next(null);
                observer.complete();
            });
        });
    }
}

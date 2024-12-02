import { environment } from '@environment';

/**
 * Excel.SheetVisibility enum
 * @see https://docs.microsoft.com/en-us/javascript/api/excel/excel.sheetvisibility?view=excel-js-preview
 */
export enum IWorksheetVisibility {
    visible = 'Visible',
    hidden = 'Hidden',
    veryHidden = 'VeryHidden'
}

/**
 * Excel.WorksheetProtectionOptions interface
 * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.worksheetprotectionoptions?view=excel-js-preview
 * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.worksheetprotection?view=excel-js-preview
 */
export interface IWorksheetProtectionOptions {
    [k: string]: any;
    allowAutoFilter?: boolean; // Represents the worksheet protection option allowing use of the AutoFilter feature.
    allowDeleteColumns?: boolean; // Represents the worksheet protection option allowing deleting of columns.
    allowDeleteRows?: boolean; // Represents the worksheet protection option allowing deleting of columns.
    allowEditObjects?: boolean; // Represents the worksheet protection option allowing editing of objects.
    allowEditScenarios?: boolean; // Represents the worksheet protection option allowing editing of scenarios.
    allowFormatCells?: boolean; // Represents the worksheet protection option allowing formatting of cells.
    allowFormatColumns: boolean; // Represents the worksheet protection option allowing formatting of columns.
    allowFormatRows?: boolean; // Represents the worksheet protection option allowing formatting of rows.
    allowInsertColumns?: boolean; // Represents the worksheet protection option allowing inserting of columns.
    allowInsertHyperlinks?: boolean; // Represents the worksheet protection option allowing inserting of hyperlinks.
    allowInsertRows?: boolean; // Represents the worksheet protection option allowing inserting of rows.
    allowPivotTables?: boolean; // Represents the worksheet protection option allowing use of the PivotTable feature.
    allowSort?: boolean; // Represents the worksheet protection option allowing use of the sort feature.
    selectionMode?: boolean; // Represents the worksheet protection option of selection mode.
}

/**
 * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.worksheet?view=excel-js-preview
 */
export interface IWorksheet {
    [k: string]: any;
    _key: string;
    _added: boolean;
    _hidden: boolean;
    id: string;
    name: string;
    visibility: IWorksheetVisibility
}

/**
 * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.tablerowcollection?view=excel-js-preview#excel-excel-tablerowcollection-items-member
 */
export interface IWorksheetTableConfig {
    [k: string]: any;
    _key?: string;
    _added?: boolean;
    worksheetId?: string;
    worksheetName?: string;
    id?: string;
    name: string;
    range: string;
    values: Array<any>[];
    rows: Array<any>[];
    numberFormat?: any;
}

/**
 * Represents a cell value conditional format rule.
 * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.conditionalcellvaluerule?view=excel-js-preview
 * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.conditionalcellvaluerule?view=excel-js-preview#excel-excel-conditionalcellvaluerule-formula1-member
 * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.conditionalcellvaluerule?view=excel-js-preview#excel-excel-conditionalcellvaluerule-formula2-member
 * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.conditionalcellvaluerule?view=excel-js-preview#excel-excel-conditionalcellvaluerule-operator-member
 */
export interface IConditionCellValueRule {
    [k: string]: any;
    formula1?: string; // The formula, if required, on which to evaluate the conditional format rule.
    formula2?: string; // The formula, if required, on which to evaluate the conditional format rule.
    operator?: 'Invalid' | 'Between' | 'NotBetween' | 'EqualTo' | 'NotEqualTo' | 'GreaterThan' | 'LessThan' | 'GreaterThanOrEqual' | 'LessThanOrEqual'; // The operator of the cell value conditional format.
}

export const DefaultSettingsWorksheet: IWorksheet = {
    _key: 'settingsWorksheet',
    _added: false,
    _hidden: environment.production ? true : false,
    id: '',
    name: 'Settings',
    visibility: environment.production ? IWorksheetVisibility.hidden : IWorksheetVisibility.visible
}

export const DefaultMappingWorksheet: IWorksheet = {
    _key: 'mappingWorksheet',
    _added: false,
    _hidden: environment.production ? true : false,
    id: '',
    name: 'Mapping',
    visibility: environment.production ? IWorksheetVisibility.hidden : IWorksheetVisibility.visible
}

export const DefaultConfigurationWorksheet: IWorksheet = {
    _key: 'configurationWorksheet',
    _added: false,
    _hidden: environment.production ? true : false,
    id: '',
    name: 'Configuration',
    visibility: environment.production ? IWorksheetVisibility.hidden : IWorksheetVisibility.visible
}

export const DefaultConnectionWorksheet: IWorksheet = {
    _key: 'connectionWorksheet',
    _added: false,
    _hidden: environment.production ? true : false,
    id: '',
    name: 'eXsync_Connection',
    visibility: environment.production ? IWorksheetVisibility.hidden : IWorksheetVisibility.visible
}


export const DefaultMappingWorksheetTable: IWorksheetTableConfig = {
    _key: 'mappingWorksheetTable',
    _added: false,
    worksheetId: '',
    worksheetName: 'Mapping',
    id: '',
    name: 'hexTABLE_Mapping',
    range: 'A1:B1',
    values: [['Sheet ID', 'Sheet Name']],
    rows: [['', '']]
}

export const DefaultConfigurationWorksheetTable = {
    _key: 'configurationWorksheetTable',
    _added: false,
    worksheetId: '',
    worksheetName: 'Configuration',
    id: '',
    name: 'hexTABLE_Configuration',
    range: 'A1:G1',
    values: {
        'SharePoint.List': [['Domain', 'List ID', 'List Name','Team ID', 'Data Source', 'View ID', 'Current State']],
        'Appvity.Task': [['Domain', 'Channel ID', 'Channel Name','Team ID', 'Data Source', 'View ID', 'Current State']],
        'Appvity.Bug': [['Domain', 'Channel ID', 'Channel Name','Team ID', 'Data Source', 'View ID', 'Current State']],
    },
    rows: [['', '', '', '', '', '']]
}

export const DefaultConnectionWorksheetTable = {
    _key: 'configurationWorksheetTable',
    _added: false,
    worksheetId: '',
    worksheetName: 'eXsync Connection',
    id: '',
    name: 'hexTABLE_Connection',
    range: '',
    values: [['Data Source', 'Data Source Info', 'Data Source Settings', 'List Worksheets Name', 'List Tables Name', 'Last Action', 'List Views', 'View Selected', 'Review State', 'Sync State', 'Sync Data Items', 'Review Local Status', 'Review Server Status', 'Sync Status', 'Reference Variable', 'Domain']],
    rows: [['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']]
}

export enum ExcelSyncStateAction {
    'ListConnected',
    'ListItemRendered',
    'LocalReviewed',
    'ServerReviewed',
    'Synced'
}

export enum ExcelSyncStatus {
    'conflict' = 'Conflict',
    'new' = 'New',
    'edited' = 'Update',
    'deleted' = 'Deleted',
    'invalid' = 'Invalid',
    'pending' = 'Pending',
    'saveLocalChanged' = 'Overwrite',
    'keepServerChanged' = 'Discard Change',
    'compareConflict' = 'Compare Conflict',
    'syncSuccess' = 'Sync Success',
    'syncFailed' = 'Sync Failed',
    'ignore' = 'Ignore'
}

/**
 * @example
 * Sheet1!A11:D11
 * Sheet1!A11
 * Sheet1
 */
export const WorksheetRangeRegExp = /('[^']*'|^\w+)(!)?([A-Z]+\d+)?(:)?([A-Z]+\d+)?/;

export const BlankWorksheetUsedRangeRegExp = /('[^']*'|^\w+)(!)(A1)$/;

export const RangeObjectRegExp = /('[^']*'|\w+)?(!)?([A-Z]+\d+)?(:)?([A-Z]+\d+)?/;

export const DateFormatRegExp = /^([1-9]|0[1-9]|1[0-2])\/([1-9]|0[1-9]|[12][0-9]|3[01])\/(19|[2-9]\d)\d{2}$/;

export const DateTimeFormatRegExp = /^([1-9]|0[1-9]|1[0-2])\/([1-9]|0[1-9]|[12][0-9]|3[01])\/(19|[2-9]\d)\d{2} (0\d|1[0-9]|2[0-3]):([0-5]\d):([0-5]\d)$/;

export const LinkUrlFormatRegExp = /^(http|https):\/\/[a-zA-Z0-9-.]+\.[a-zA-Z]{2,3}(\S*)?$/;

export const EmailFormatRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * @see https://learn.microsoft.com/en-us/javascript/api/excel/excel.range?view=excel-js-preview#excel-excel-range-numberformat-member
 * @see https://help.syncfusion.com/file-formats/xlsio/working-with-cell-or-range-formatting#apply-number-formats
 */
export const RangeObjectNumberFormatText = [['@']];

export enum ExcelDataChangeTypeEnum {
    'cellDeleted' = 'CellDeleted',
    'cellInserted' = 'CellInserted',
    'columnDeleted' = 'ColumnDeleted',
    'columnInserted' = 'ColumnInserted',
    'rangeEdited' = 'RangeEdited',
    'rowDeleted' = 'RowDeleted',
    'rowInserted' = 'RowInserted',
    'unknown' = 'Unknown'
}

/**
 * @see https://support.microsoft.com/en-us/office/excel-specifications-and-limits-1672b34d-7043-467e-8e27-269d656771c3?ui=en-us&rs=en-us&ad=us
 */
export const ExcelLimit = {
    'maxColumns': 16384,
    'maxRows': 1048576,
    'maxCell': 17179869184,
    'maxSheet': 255,
    'maxSheetName': 31,
    'maxSheetTab': 31,
    'maxCellContent': 32767,
    'maxItemOnDropdown': 32,
    'maxItemOnFilter': 10000,
}
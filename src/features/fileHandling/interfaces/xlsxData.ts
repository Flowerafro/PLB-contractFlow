// Struktur for en Excel-ark: navn på arket pluss selve rad dataene
export interface XLSXData {
    sheetName: string;
    data: any[];
}
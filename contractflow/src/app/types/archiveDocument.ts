// Archive typen - Benyttes på sikt i tilknytning av dokumenter i arkivet:

export interface ArchiveDocument {
    uploaded: Date | string;
    fileName: string;
    size: number;
    fullFileName: string;
//    containerNumber: string;
//    customer: string;
}
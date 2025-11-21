// Archive typen - Benyttes på sikt i tilknytning av dokumenter i arkivet:

export interface ArchiveDocument {
    fileName: string;
    size: number;
    uploadDate: Date | string;
//    containerNumber: string;
//    customer: string;
}
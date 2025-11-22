// Archive typen - Benyttes på sikt i tilknytning av dokumenter i arkivet:

export interface ArchiveDocument {
    fileName: string;
    size: number;
    uploaded: Date | string;
//    containerNumber: string;
//    customer: string;
}
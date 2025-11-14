// Archive typen - Benyttes på sikt i tilknytning av dokumenter i arkivet:

export interface ArchiveDocument {
    date: Date | string;
    containerNumber: string;
    customer: string;
    documentName: string;
}
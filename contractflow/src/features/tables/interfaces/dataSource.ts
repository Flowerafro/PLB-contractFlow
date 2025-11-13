export interface DataSource<T>{
    path: string;
    transform: (incomingData: any) => T[];
    errorMessage: string;
    dataPath?: string;
} 
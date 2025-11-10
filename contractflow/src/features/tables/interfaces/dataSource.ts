export interface dataSource<T>{
    path: string;
    transform: (incomingData: any) => T[];
    errorMessage: string;
    dataPath?: string;
} 
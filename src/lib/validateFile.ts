export const validateFileSize = (
    file: File, 
    maxSize: number) => {
    if (file.size > maxSize) {
        return {
            isValid: false,
            error: `File size exceeds the maximum limit of ${(maxSize / 1024 / 1024).toFixed(1)} MB.`
        };
    }
    return { 
        isValid: true,
        error: null
    };
};

export const validateFileType = (
    file: File,
    acceptedFileTypes: string[],
    fileTypeLabels: string
) => {
    const fileName = file.name.toLowerCase();
    const isAcceptedType = acceptedFileTypes.some(type => fileName.endsWith(type.toLowerCase()));

    if (!isAcceptedType) {
        return {
            isValid: false,
            error: `Invalid file type. Please upload one of the following types: ${fileTypeLabels}.`
        };
    }
    return { 
        isValid: true,
        error: null
    };
};
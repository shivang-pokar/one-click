export class FileManager {
    id?: string;
    fileList?: Array<FileItem> = [];
    company_id?: string;
}

export class FileItem {
    id?: string;
    fileName?: string;
    fileType?: string;
    size?: string;
    lastModifiedDateTime?: string;
    url?: string;
    parentFolder?: string;
    selected?: boolean;
    width?: any;
    height?: any;
    type?: string;
}
export interface GetFilesResponseSchema {
    files: FileResponseItemSchema[];
    event_id: number;
    event_type: string;
}

export interface GetFileResponseSchema {
    file: FileResponseItemSchema;
}

export interface FileResponseItemSchema {
    id: number;
    filename: string;
    event_id: number;
    content_type: string;
    dt_created: string;
}

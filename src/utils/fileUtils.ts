import { MEDIA_STATIC_SERVER } from "../api/config";
import { FileResponseItemSchema } from "../api/schemas/responses/files";
import { EventTypesStrings } from "../enums/filesEnums";

export function makeFileLink(file: FileResponseItemSchema, parentId: number, parentType: EventTypesStrings): string {
    return [MEDIA_STATIC_SERVER, parentType, parentId, file.filename].join("/");
}

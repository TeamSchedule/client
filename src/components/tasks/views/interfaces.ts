import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import { FileResponseItemSchema } from "../../../api/schemas/responses/files";
import React from "react";

export interface TaskViewProps {
    task: TaskResponseItemSchema;
    files: FileResponseItemSchema[];
}

export interface TaskActionsProps {
    navigateToEdit: () => void;
    toggleTaskStatus: (open: boolean) => (e: React.MouseEvent) => void;
}

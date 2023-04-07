import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import React from "react";

export interface TaskViewProps {
    task: TaskResponseItemSchema;
}

export interface TaskActionsProps {
    navigateToEdit: (e: React.MouseEvent) => void;
    toggleTaskStatus: (open: boolean) => (e: React.MouseEvent) => void;
}

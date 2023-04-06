import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import React from "react";

export interface TaskViewProps {
    task: TaskResponseItemSchema;
}

export interface TaskActionsProps {
    navigateToEdit: () => void;
    toggleTaskStatus: (open: boolean) => (e: React.MouseEvent) => void;
}

import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import React from "react";

export interface EventViewProps {
    event: EventResponseItemSchema;
    fullMode?: boolean;
}

export interface EventActionsProps {
    navigateToEdit: () => void;
    toggleEventStatus: (open: boolean) => (e: React.MouseEvent) => void;
}

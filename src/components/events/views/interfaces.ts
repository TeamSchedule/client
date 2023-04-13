import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import React from "react";
import { EventViewModeStrings } from "../../../enums/eventsEnums";

export interface EventViewProps {
    event: EventResponseItemSchema;
    viewMode?: EventViewModeStrings;
}

export interface EventActionsProps {
    navigateToEdit: (e: React.MouseEvent) => void;
    navigateToFull: (e: React.MouseEvent | undefined) => void;
    navigateToCreateTaskForm: (e: React.MouseEvent | undefined) => void;
    toggleEventStatus: (open: boolean) => (e: React.MouseEvent) => void;
}

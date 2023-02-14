import UnitLink from "../../links/UnitLink/UnitLink";
import { UnitResponseItemSchema } from "../../../api/schemas/responses/units";
import { Typography } from "@mui/material";

interface TaskUnitProps {
    unit: UnitResponseItemSchema | undefined;
}

export default function TaskUnit(props: TaskUnitProps) {
    return (
        <>
            <div className="d-flex align-items-center align-content-stretch justify-content-stretch">
                <Typography>Отдел:&nbsp;</Typography>
                <UnitLink id={props.unit?.id} name={props.unit?.name} />
            </div>
        </>
    );
}

import UnitLink from "../../links/UnitLink/UnitLink";
import { UnitResponseItemSchema } from "../../../api/schemas/responses/units";

interface TaskUnitProps {
    unit: UnitResponseItemSchema | undefined;
}

export default function TaskUnit(props: TaskUnitProps) {
    return (
        <>
            <div className="d-flex align-items-center align-content-stretch justify-content-stretch">
                <span>Отдел:&nbsp;</span>
                <UnitLink id={props.unit?.id} name={props.unit?.name} />
            </div>
        </>
    );
}

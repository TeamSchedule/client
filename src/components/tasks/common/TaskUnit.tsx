import UnitLink from "../../links/UnitLink/UnitLink";
import { UnitResponseItemSchema } from "../../../api/schemas/responses/units";

interface TaskUnitProps {
    unit: UnitResponseItemSchema;
}

export default function TaskUnit(props: TaskUnitProps) {
    return (
        <>
            <div>
                <span>Отдел:&nbsp;</span>
                <UnitLink id={props.unit.id} name={props.unit.name} />
            </div>
        </>
    );
}

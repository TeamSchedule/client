import UnitLink from "../../links/UnitLink/UnitLink";
import { UnitsResponseItemSchema } from "../../../schemas/responses/units";

interface TaskUnitProps {
    unit: UnitsResponseItemSchema;
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

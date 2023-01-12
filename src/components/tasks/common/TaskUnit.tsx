import UnitLink from "../../links/UnitLink/UnitLink";
import { Unit } from "../../../schemas/instances/units";

interface TaskUnitProps {
    unit: Unit;
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

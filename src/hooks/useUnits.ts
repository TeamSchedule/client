import { useEffect, useState } from "react";
import { API } from "../api/api";
import { UnitResponseItemSchema } from "../api/schemas/responses/units";

interface UseUnitsInterface {
    units: UnitResponseItemSchema[];
    isUnitsLoadingError: boolean;
    isUnitsLoadingSuccess: boolean;
    isUnitsLoading: boolean;
}

export default function useUnits(): UseUnitsInterface {
    const [isUnitsLoading, setIsUnitsLoading] = useState<boolean>(true);
    const [isUnitsLoadingError, setIsUnitsLoadingError] = useState<boolean>(false);
    const [isUnitsLoadingSuccess, setIsUnitsLoadingSuccess] = useState<boolean>(false);
    const [units, setUnits] = useState<UnitResponseItemSchema[]>([]);

    useEffect(() => {
        API.units
            .all()
            .then((units: UnitResponseItemSchema[]) => {
                setUnits(units);
                setIsUnitsLoadingSuccess(true);
            })
            .catch(() => {
                setIsUnitsLoadingError(true);
            })
            .finally(() => {
                setIsUnitsLoading(false);
            });
    }, []);

    return { isUnitsLoading, units, isUnitsLoadingError, isUnitsLoadingSuccess };
}

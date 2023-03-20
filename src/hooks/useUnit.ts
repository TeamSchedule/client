import { useEffect, useState } from "react";
import { API } from "../api/api";
import { LoadingStatusEnum, LoadingStatusStrings } from "../enums/loadingStatusEnum";
import { UnitResponseItemSchema } from "../api/schemas/responses/units";

export interface UseUnitInterface {
    unit: UnitResponseItemSchema | undefined;
    setUnit: (value: UnitResponseItemSchema) => void;
    unitLoadingStatus: LoadingStatusStrings;
    closeSnackbar: () => void;
}

export default function useUnit(id: number): UseUnitInterface {
    const [unitLoadingStatus, setUnitLoadingStatus] = useState<LoadingStatusStrings>(LoadingStatusEnum.LOADING);
    const [unit, setUnit] = useState<UnitResponseItemSchema | undefined>(undefined);

    function closeSnackbar() {
        setUnitLoadingStatus(LoadingStatusEnum._DEFAULT);
    }

    useEffect(() => {
        if (!id) {
            return;
        }

        API.units
            .getById(id)
            .then((unit: UnitResponseItemSchema) => {
                setUnit(unit);
                setUnitLoadingStatus(LoadingStatusEnum.FINISH_SUCCESS);
            })
            .catch(() => {
                setUnitLoadingStatus(LoadingStatusEnum.FINISH_ERROR);
            })
            .finally(() => {});
    }, [id]);

    return { unitLoadingStatus, unit, setUnit, closeSnackbar };
}

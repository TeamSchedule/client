import { useEffect, useState } from "react";
import { API } from "../api/api";
import { UnitResponseItemSchema } from "../api/schemas/responses/units";
import { LoadingStatusEnum, LoadingStatusStrings } from "../enums/loadingStatusEnum";

interface UseUnitsInterface {
    units: UnitResponseItemSchema[];
    unitsLoadingStatus: LoadingStatusStrings;
    closeSnackbar: () => void;
}

export default function useUnits(): UseUnitsInterface {
    const [units, setUnits] = useState<UnitResponseItemSchema[]>([]);
    const [unitsLoadingStatus, setUnitsLoadingStatus] = useState<LoadingStatusStrings>(LoadingStatusEnum.LOADING);

    function closeSnackbar() {
        setUnitsLoadingStatus(LoadingStatusEnum._DEFAULT);
    }

    useEffect(() => {
        API.units
            .all()
            .then((units: UnitResponseItemSchema[]) => {
                setUnits(units);
                setUnitsLoadingStatus(LoadingStatusEnum.FINISH_SUCCESS);
            })
            .catch(() => {
                setUnitsLoadingStatus(LoadingStatusEnum.FINISH_ERROR);
            })
            .finally(() => {});
    }, []);

    return { units, unitsLoadingStatus, closeSnackbar };
}

import { useEffect, useState } from "react";
import { LoadingStatusEnum, LoadingStatusStrings } from "../enums/loadingStatusEnum";

export interface UseApiCallInterface<ResultDataType> {
    loading: boolean;
    error: boolean;
    success: boolean;
    default: boolean;
    data: ResultDataType;
    setData: (value: ResultDataType) => void;
    resetApiCallStatus: () => void;
}

export default function useApiCall<ResultDataType>(
    apiCall: () => Promise<ResultDataType>,
    defaultValue: ResultDataType,
    recallDeps: any[] = []
): UseApiCallInterface<ResultDataType> {
    const [loadingStatus, setLoadingStatus] = useState<LoadingStatusStrings>(LoadingStatusEnum.LOADING);
    const [data, setData] = useState<ResultDataType>(defaultValue);

    function resetApiCallStatus() {
        setLoadingStatus(LoadingStatusEnum._DEFAULT);
    }

    useEffect(() => {
        apiCall()
            .then((data: ResultDataType) => {
                setData(data);
                setLoadingStatus(LoadingStatusEnum.FINISH_SUCCESS);
            })
            .catch(() => {
                setLoadingStatus(LoadingStatusEnum.FINISH_ERROR);
            })
            .finally(() => {});
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [...recallDeps]);

    return {
        error: loadingStatus === LoadingStatusEnum.FINISH_ERROR,
        success: loadingStatus === LoadingStatusEnum.FINISH_SUCCESS,
        loading: loadingStatus === LoadingStatusEnum.LOADING,
        default: loadingStatus === LoadingStatusEnum._DEFAULT,
        data,
        setData,
        resetApiCallStatus,
    };
}

export enum LoadingStatusEnum {
    FINISH_ERROR,
    FINISH_SUCCESS,
    LOADING,
    _DEFAULT,
}

export type LoadingStatusStrings = (typeof LoadingStatusEnum)[keyof typeof LoadingStatusEnum];

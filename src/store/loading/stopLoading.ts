export const STOP_LOADING = 'STOP_LOADING';

export interface StopLoadingAction {
    readonly type: typeof STOP_LOADING;
}

export const stopLoading = (): StopLoadingAction => ({ type: STOP_LOADING });

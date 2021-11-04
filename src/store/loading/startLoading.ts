export const START_LOADING = 'START_LOADING';

export interface StartLoadingAction {
    readonly type: typeof START_LOADING;
}

export const startLoading = (): StartLoadingAction => ({ type: START_LOADING });

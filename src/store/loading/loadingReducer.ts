import { StartLoadingAction, START_LOADING } from './startLoading';
import { StopLoadingAction, STOP_LOADING } from './stopLoading';

type LoadingActions = StartLoadingAction | StopLoadingAction | { type: 'OTHER_TYPE' };

const defaultState = 0;

export const loadingReducer = (previousState = defaultState, action: LoadingActions) => {
    switch (action.type) {
        case START_LOADING:
            return previousState + 1;
        case STOP_LOADING:
            return previousState - 1;
        default:
            return previousState;
    }
};

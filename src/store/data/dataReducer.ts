import { Entity } from '../../types';
import { GET_LIST_SUCCESS, GetListSuccessAction } from './getListSuccess';
import { GET_ONE_SUCCESS, GetOneSuccessAction } from './getOneSuccess';

interface PagesToEntityState {
    [page: number]: string[];
}

interface EntitysState<T extends Entity> {
    [id: string]: T;
}

export interface EntityDataState<T extends Entity> {
    pages: PagesToEntityState;
    data: EntitysState<T>;
    total: number;
}

type DataAction<T extends Entity> =
    | GetOneSuccessAction<T>
    | GetListSuccessAction<T>
    | { type: 'OTHER_TYPE' };

export const dataReducer = <T extends Entity>(storeKey: string) => {
    const initialState = {
        pages: {},
        data: {},
        total: 0,
    };
    return (previousState: EntityDataState<T> = initialState, action: DataAction<T>) => {
        switch (action.type) {
            case GET_LIST_SUCCESS: {
                const { page, entityName } = action.meta;
                // this reducer can be mounted on different store pathg with different keys
                // we need to discriminate them here
                if (entityName !== storeKey) {
                    return previousState;
                }
                const { data, total } = action.payload;
                return {
                    pages: {
                        ...previousState.pages,
                        [page]: data.map((item) => item.id),
                    },
                    data: data.reduce((acc, item) => {
                        acc[item.id] = item;
                        return acc;
                    }, previousState.data),
                    total,
                };
            }
            case GET_ONE_SUCCESS: {
                const { data } = action.payload;
                const { entityName } = action.meta;
                // this reducer can be mounted on different store pathg with different keys
                // we need to discriminate them here
                if (entityName !== storeKey) {
                    return previousState;
                }
                return {
                    ...previousState,
                    data: {
                        ...previousState.data,
                        [data.id]: data,
                    },
                };
            }
            default:
                return previousState;
        }
    };
};

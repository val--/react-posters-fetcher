import { Entity } from '../../types';

export const GET_LIST_SUCCESS = 'GET_LIST_SUCCESS';

export interface GetListSuccessAction<T extends Entity> {
    readonly type: typeof GET_LIST_SUCCESS;
    payload: {
        data: T[];
        total: number;
    };
    meta: {
        entityName: string;
        page: number;
    };
}

export const getListSuccess = <T extends Entity>(
    data: T[],
    total: number,
    entityName: string,
    page: number,
): GetListSuccessAction<T> => ({
    type: GET_LIST_SUCCESS,
    payload: { data, total },
    meta: { entityName, page },
});

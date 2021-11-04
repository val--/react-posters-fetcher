import { Entity } from '../../types';

export const GET_ONE_SUCCESS = 'GET_ONE_SUCCESS';

export interface GetOneSuccessAction<T extends Entity> {
    readonly type: typeof GET_ONE_SUCCESS;
    payload: {
        data: T;
    };
    meta: {
        entityName: string;
    };
}

export const getOneSuccess = <T extends Entity>(
    data: T,
    entityName: string,
): GetOneSuccessAction<T> => ({
    type: GET_ONE_SUCCESS,
    payload: { data },
    meta: { entityName },
});

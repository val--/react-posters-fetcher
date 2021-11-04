import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';

import { useDataPageSelector } from './store';
import { startLoading } from './store/loading/startLoading';
import { stopLoading } from './store/loading/stopLoading';
import { getListSuccess } from './store/data/getListSuccess';
import { API_BASE_URL } from './config';
import { Entity } from './types';

interface useFetchListProps {
    entityName: string;
    page: number;
    pageSize: number;
    filter?: string;
    minPrice?: number;
    maxPrice?: number;
}

interface useFetchListReturnType<T> {
    data: T[];
    total: number;
    error: Error | null;
    loading: boolean;
}

const useFetchList = <T extends Entity>({
    entityName,
    page,
    pageSize,
    filter,
    minPrice,
    maxPrice,
}: useFetchListProps): useFetchListReturnType<T> => {
    const { data, total } = useDataPageSelector<T>(entityName, page);
    let [error, setError] = useState<Error | null>(null);
    let [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            dispatch(startLoading());
            setLoading(true);
            const url = `${API_BASE_URL}/${entityName}`;
            const parameters = {
                _page: page,
                _limit: pageSize,
                price_gte: minPrice !== null ? minPrice : undefined,
                price_lte: maxPrice !== null ? maxPrice : undefined,
                first_name_like: filter ? filter : undefined,
            };
            const urlWithParameters = `${url}?${queryString.stringify(parameters)}`;
            try {
                const response = await fetch(urlWithParameters);
                if (response.status >= 400 && response.status < 600) {
                    throw new Error('Bad response from server');
                }
                const json = await response.json();
                const total = parseInt(response.headers.get('x-total-count') || '0', 10);
                dispatch(getListSuccess(json, total, entityName, page));
            } catch (e) {
                setError(e);
            }
            dispatch(stopLoading());
            setLoading(false);
        };

        fetchData();
    }, [entityName, page, pageSize, minPrice, maxPrice, filter, dispatch]);

    return { data, total, error, loading };
};

export default useFetchList;

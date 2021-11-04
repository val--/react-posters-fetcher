import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useDataItemSelector } from './store';
import { startLoading } from './store/loading/startLoading';
import { stopLoading } from './store/loading/stopLoading';
import { getOneSuccess } from './store/data/getOneSuccess';
import { API_BASE_URL } from './config';
import { Entity } from './types';

interface useFetchItemProps {
    entityName: string;
    id: string;
}

interface useFetchItemReturnType<T> {
    item: T | null;
    error: Error | null;
    loading: boolean;
}

const useFetchItem = <T extends Entity>({
    entityName,
    id,
}: useFetchItemProps): useFetchItemReturnType<T> => {
    const dispatch = useDispatch();
    const item = useDataItemSelector<T>(entityName, id);
    let [error, setError] = useState<Error | null>(null);
    let [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchItem = async () => {
            dispatch(startLoading());
            setLoading(true);
            const url = `${API_BASE_URL}/${entityName}/${id}`;
            try {
                const response = await fetch(url);
                if (response.status >= 400 && response.status < 600) {
                    throw new Error('Bad response from server');
                }
                const item = await response.json();
                dispatch(getOneSuccess(item, entityName));
            } catch (e) {
                setError(e);
            }
            setLoading(false);
            dispatch(stopLoading());
        };
        fetchItem();
    }, [entityName, id, dispatch]);

    return { item, error, loading };
};

export default useFetchItem;

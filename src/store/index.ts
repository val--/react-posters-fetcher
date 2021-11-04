import { createStore, combineReducers } from 'redux';
import { useSelector } from 'react-redux';

import { dataReducer } from './data/dataReducer';
import { loadingReducer } from './loading/loadingReducer';
import { Poster, Customer, Entity } from '../types';

const dataReducers = combineReducers({
    products: dataReducer<Poster>('products'),
    customers: dataReducer<Customer>('customers'),
});

const rootReducer = combineReducers({
    loading: loadingReducer,
    data: dataReducers,
});

const store = createStore(
    rootReducer,
    //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export type RootState = ReturnType<typeof rootReducer>;

export const useLoading = () => {
    const numberOfLoadingQueries = useSelector((state: RootState) => state.loading);
    return numberOfLoadingQueries > 0;
};

/**
 * Dictionary is here to be able to access to merged data stores like store[entityName]
 */
interface Dictionary {
    [id: string]: any;
}

interface useDataPageSelectorReturnType<T> {
    total: number;
    data: T[];
}

export const useDataPageSelector = <T extends Entity>(
    entityName: string,
    page: number,
): useDataPageSelectorReturnType<T> => {
    const { pages, data, total } = useSelector(
        (state: RootState) => (state.data as Dictionary)[entityName],
    );

    return {
        data: pages[page] ? pages[page].map((id: string) => data[id]) : [],
        total,
    };
};

export const useDataItemSelector = <T extends Entity>(entityName: string, id: string): T | null =>
    useSelector((state: RootState) => (state.data as Dictionary)[entityName].data[id]);

export default store;

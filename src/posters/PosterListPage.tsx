import { useState } from 'react';
import { makeStyles } from '@material-ui/core';

import useFetchList from '../useFetchList';
import PostersFilters from './PostersFilters';
import PosterList from './PosterList';

import { Poster } from '../types';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 100;

const PosterListPage = () => {
    const classes = useStyles();
    const [page, setPage] = useState(DEFAULT_PAGE);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [minPrice, setMinPrice] = useState(DEFAULT_MIN_PRICE);
    const [maxPrice, setMaxPrice] = useState(DEFAULT_MAX_PRICE);

    const { data: posters, total, loading, error } = useFetchList<Poster>({
        entityName: 'products',
        page,
        pageSize,
        minPrice,
        maxPrice,
    });

    if (error) {
        return <div>Error : {error.message}</div>;
    }

    const handlePageChange = (page: number) => {
        setPage(page);
    };
    const handlePageSizeChange = (pageSize: number) => {
        setPageSize(pageSize);
    };
    const handleMinPriceChange = (minPrice: number) => {
        setMinPrice(minPrice);
        setPage(DEFAULT_PAGE);
    };
    const handleMaxPriceChange = (maxPrice: number) => {
        setMaxPrice(maxPrice);
        setPage(DEFAULT_PAGE);
    };

    return (
        <div>
            <PostersFilters
                handlePageChange={handlePageChange}
                handlePageSizeChange={handlePageSizeChange}
                handleMinPriceChange={handleMinPriceChange}
                handleMaxPriceChange={handleMaxPriceChange}
                minPrice={minPrice}
                maxPrice={maxPrice}
                total={total}
                page={page}
                pageSize={pageSize}
            />
            <div className={classes.loader}>{loading && <div>Loading...</div>}</div>
            {!posters.length && !loading && <div>No poster found</div>}
            <PosterList posters={posters} />
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    loader: {
        height: theme.spacing(3),
    },
}));

export default PosterListPage;

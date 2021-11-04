import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';

import Select from '../Select';

const perPageOptions = [10, 20, 30, 40, 50, 100];
//const perPageOptionsTest = [10, { value: 20, text: 'Vingt' }, 30];

const PostersFilters = ({
    total,
    minPrice,
    maxPrice,
    page,
    pageSize,
    handleMinPriceChange,
    handleMaxPriceChange,
    handlePageChange,
    handlePageSizeChange,
}: PostersFiltersProps) => {
    const classes = useStyles();
    const numberOfPages = Math.ceil(total / pageSize);
    const pages = numberOfPages
        ? [...Array(numberOfPages)].map((_, i) => ({
              value: i + 1,
              text: `Page ${i + 1}`,
          }))
        : [];

    const onMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        handleMinPriceChange(value);
    };
    const onMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        handleMaxPriceChange(value);
    };

    return (
        <div className={classes.filters}>
            <TextField
                type="number"
                onChange={onMinPriceChange}
                InputProps={{ inputProps: { min: 0, max: 1000 } }}
                value={minPrice}
                label="Min price"
                variant="filled"
                className={classes.textField}
            />
            <TextField
                type="number"
                onChange={onMaxPriceChange}
                InputProps={{ inputProps: { min: 0, max: 1000 } }}
                value={maxPrice}
                label="Max price"
                variant="filled"
                className={classes.textField}
            />
            <Select label="page" onChange={handlePageChange} value={page} options={pages} />
            <Select
                label="perPage"
                onChange={handlePageSizeChange}
                value={pageSize}
                options={perPageOptions}
            />
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    filters: {
        marginBottom: theme.spacing(),
        '& > *': {
            marginRight: theme.spacing(),
        },
    },
    textField: {
        width: '6em',
    },
}));

interface PostersFiltersProps {
    total: number;
    minPrice: number;
    maxPrice: number;
    page: number;
    pageSize: number;
    handleMinPriceChange: (price: number) => void;
    handleMaxPriceChange: (price: number) => void;
    handlePageChange: (page: number) => void;
    handlePageSizeChange: (pageSize: number) => void;
}

export default PostersFilters;

import { useReducer, Fragment } from 'react';
import {
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    makeStyles,
} from '@material-ui/core';

import Select from '../Select';
import useFetchList from '../useFetchList';
import { Customer } from '../types';

const perPageOptions = [10, 25, 50];

const CustomersList = () => {
    const classes = useStyles();
    const [listPageState, dispatch] = useReducer(listStateReducer, initialState);
    const { page, pageSize, filter }: ListPageViewState = listPageState;
    // TODO : use something like https://randomuser.me/ instead ?
    const { data: customers, total } = useFetchList<Customer>({
        entityName: 'customers',
        page,
        pageSize,
        filter,
    });

    if (!customers) {
        return null;
    }

    const numberOfPages = Math.ceil(total / pageSize);
    const pages = numberOfPages
        ? [...Array(numberOfPages)].map((_, i) => ({
              value: i + 1,
              text: `Page ${i + 1}`,
          }))
        : [];

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        dispatch({
            type: 'set_filter',
            payload: isNaN(value) ? event.target.value : value,
        });
    };

    const handlePageChange = (value: number) => {
        dispatch({
            type: 'set_page',
            payload: value,
        });
    };

    const handlePageSizeChange = (value: number) => {
        dispatch({
            type: 'set_page_size',
            payload: value,
        });
    };

    return (
        <>
            <div className={classes.filters}>
                <TextField
                    variant="filled"
                    label="Name"
                    type="text"
                    onChange={handleFilterChange}
                    value={filter}
                />
                <Select label="Page" onChange={handlePageChange} value={page} options={pages} />
                <Select
                    label="PerPage"
                    onChange={handlePageSizeChange}
                    value={pageSize}
                    options={perPageOptions}
                />
            </div>
            <List>
                {customers.map((customer) => (
                    <ListItem key={customer.id}>
                        <ListItemAvatar>
                            <Avatar src={customer.avatar} />
                        </ListItemAvatar>
                        <ListItemText>
                            {customer.first_name} {customer.last_name}
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

const useStyles = makeStyles((theme) => ({
    filters: {
        marginBottom: theme.spacing(),
        '& > *': {
            marginRight: theme.spacing(),
        },
    },
}));

export default CustomersList;

interface ListPageViewState {
    page: number;
    pageSize: number;
    filter: string;
}

const initialState = {
    page: 1,
    pageSize: 10,
    filter: '',
} as ListPageViewState;

interface ListPageAction {
    type: string;
    payload: any;
}

const listStateReducer = (state: ListPageViewState, action: ListPageAction) => {
    switch (action.type) {
        case 'set_page':
            return {
                ...state,
                page: action.payload,
            };
        case 'set_page_size':
            return {
                ...state,
                pageSize: action.payload,
            };
        default:
            return {
                ...state,
                filter: action.payload,
                page: 1,
            };
    }
};

import { Button, CircularProgress, makeStyles } from '@material-ui/core';

import { NavLink } from 'react-router-dom';

import { useLoading } from './store';

const Header = () => {
    const classes = useStyles();
    const loading = useLoading();
    return (
        <header>
            <NavLink
                style={{ textDecoration: 'none' }}
                activeStyle={{ textDecoration: 'underline' }}
                to="/posters"
            >
                <Button>Posters</Button>
            </NavLink>{' '}
            <NavLink
                style={{ textDecoration: 'none' }}
                activeStyle={{ textDecoration: 'underline' }}
                to="/customers"
            >
                <Button>Customers</Button>
            </NavLink>
            <div className={classes.loader}>
                <div style={{ display: loading ? 'block' : 'none' }}>
                    <CircularProgress size={16} />
                </div>
            </div>
        </header>
    );
};

const useStyles = makeStyles((theme) => ({
    loader: {
        display: 'inline-block',
        height: 16,
        width: 16,
    },
}));

export default Header;

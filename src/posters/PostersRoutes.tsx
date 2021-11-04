import { Switch, Route, useRouteMatch } from 'react-router';
import PosterListPage from './PosterListPage';
import PosterPage from './PosterPage';
import { Typography } from '@material-ui/core';

const PosterPages = () => {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.path}/:id`}>
                <PosterPage />
            </Route>
            <Route path={match.path}>
                <>
                    <Typography variant="h2" gutterBottom>
                        Posters
                    </Typography>
                    <PosterListPage />
                </>
            </Route>
        </Switch>
    );
};

export default PosterPages;

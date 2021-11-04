import PosterPreview from './PosterPreview';

import { Poster } from '../types';

import { makeStyles } from '@material-ui/core';

const PosterList = ({ posters }: PosterListProps) => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.container}>
                {posters.length > 0 &&
                    posters.map((poster) => <PosterPreview key={poster.id} poster={poster} />)}
            </div>
        </>
    );
};
const useStyles = makeStyles({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridGap: 10,
        gridAutoRows: 'minmax(100px, auto)',
    },
});
interface PosterListProps {
    posters: Poster[];
}

export default PosterList;

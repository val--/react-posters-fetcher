import { CircularProgress, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import PosterPreview from './PosterPreview';
import useFetchItem from '../useFetchItem';

import { Poster } from '../types';

const PosterPage = () => {
    const { id } = useParams<{ id: string }>();
    const { item: poster, loading, error } = useFetchItem<Poster>({
        entityName: 'products',
        id,
    });

    if (error) {
        return <div>Error : {error.message}</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!poster) {
        return (
            <>
                <Typography variant="h2" gutterBottom>
                    Poster {id}
                </Typography>
                <CircularProgress />
            </>
        );
    }

    return (
        <>
            <Typography variant="h2" gutterBottom>
                Poster {poster.reference}
            </Typography>
            <PosterPreview poster={poster} />
        </>
    );
};

export default PosterPage;

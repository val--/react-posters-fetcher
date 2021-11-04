import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    Collapse,
    IconButton,
    makeStyles,
    Typography,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

import { Poster } from '../types';

interface PosterFullDescriptionProps {
    poster: Poster;
}
const PosterFullDescription = ({ poster }: PosterFullDescriptionProps) => {
    const { width, height, price, stock, description } = poster;
    return (
        <Fragment>
            <Typography>
                Dimensions: {width}cm x {height}cm
            </Typography>
            <Typography>Price : ${price}</Typography>
            <Typography gutterBottom>Stock : {stock}</Typography>
            <Typography variant="body2" color="textSecondary">
                {description}
            </Typography>
        </Fragment>
    );
};

interface PosterSummaryProps {
    poster: Poster;
    className: string;
}

const PosterSummary = ({ poster, className }: PosterSummaryProps) => {
    const { width, height, price } = poster;
    return (
        <div className={className}>
            <Typography>
                {width}cm x {height}cm
            </Typography>
            <Typography>${price}</Typography>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    card: {
        marginBottom: theme.spacing(),
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    summary: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));

interface PosterPreviewProps {
    poster: Poster;
}

const PosterPreview = ({ poster }: PosterPreviewProps) => {
    const [expanded, setExpanded] = useState(false);
    const { image, reference } = poster;
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <Link to={`/posters/${poster.id}`}>
                <CardMedia className={classes.media} image={image} title={reference} />
            </Link>
            <CardHeader
                action={
                    <IconButton
                        onClick={() => setExpanded(!expanded)}
                        aria-label={expanded ? 'Close' : 'Expand'}
                    >
                        {expanded ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                }
                title={reference}
            />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <PosterFullDescription poster={poster} />
                </CardContent>
            </Collapse>
            <Collapse in={!expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <PosterSummary className={classes.summary} poster={poster} />
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default PosterPreview;

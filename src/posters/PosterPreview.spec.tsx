import { FunctionComponent } from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import PosterPreview from './PosterPreview';
import { Poster } from '../types';

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

const AppMock: FunctionComponent = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;

test('PosterPreview expands correctly', () => {
    const poster: Poster = {
        id: 'KLK233',
        width: 17,
        height: 34,
        price: 34,
        stock: 123,
        description: 'Description',
        image: 'None',
        reference: '39KKSNJ',
    };
    const { getByLabelText, getByText, queryByText } = render(
        <AppMock>
            <PosterPreview poster={poster} />
        </AppMock>,
    );

    expect(getByText('39KKSNJ')).toBeTruthy();
    expect(queryByText('Description')).toBeFalsy();

    fireEvent.click(getByLabelText('Expand'));

    expect(queryByText('Description')).toBeTruthy();
});

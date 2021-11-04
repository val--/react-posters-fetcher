import { FunctionComponent } from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import Header from './Header';

jest.mock('./store', () => ({
    useLoading: () => false,
}));
const AppMock: FunctionComponent = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;

test('Header should show loading when loading', () => {
    const component = renderer.create(
        <AppMock>
            <Header />
        </AppMock>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

jest.mock('./store', () => ({
    useLoading: () => false,
}));

test('Header should not show loading when not loading', () => {
    const component = renderer.create(
        <AppMock>
            <Header />
        </AppMock>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

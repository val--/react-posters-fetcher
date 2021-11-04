import { loadingReducer } from './loadingReducer';
import { startLoading } from './startLoading';
import { stopLoading } from './stopLoading';

describe('Application Store', () => {
    describe('Loading store', () => {
        describe('Actions', () => {
            it('should return start loading action with startLoading method', () => {
                expect(startLoading()).toEqual({ type: 'START_LOADING' });
            });

            it('should return stop loading action with stopLoading method', () => {
                expect(stopLoading()).toEqual({ type: 'STOP_LOADING' });
            });
        });

        describe('Reducer', () => {
            it('should return > 0 on start loading action', () => {
                const numberOfQueriesLoading = 0;
                expect(loadingReducer(numberOfQueriesLoading, startLoading())).toBeGreaterThan(0);
            });

            it('should return 0 on stop loading action', () => {
                const numberOfQueriesLoading = 1;
                expect(loadingReducer(numberOfQueriesLoading, stopLoading())).toEqual(0);
            });

            it('should return initial state on unknow type action', () => {
                const numberOfQueriesLoading = 0;
                expect(loadingReducer(numberOfQueriesLoading, { type: 'OTHER_TYPE' })).toEqual(
                    numberOfQueriesLoading,
                );
            });
        });
    });
});

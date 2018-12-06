import { fromJS } from 'immutable';
import demoFormReducer from '../reducer';

describe('demoFormReducer', () => {
  it('returns the initial state', () => {
    expect(demoFormReducer(undefined, {})).toEqual(fromJS({}));
  });
});

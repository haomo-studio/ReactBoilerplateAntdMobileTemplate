import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the demoForm state domain
 */

const selectDemoFormDomain = state => state.get('demoForm', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by DemoForm
 */

const makeSelectDemoForm = () =>
  createSelector(selectDemoFormDomain, substate => substate.toJS());

export default makeSelectDemoForm;
export { selectDemoFormDomain };

/**
 *
 * Asynchronously loads the component for DemoForm
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));

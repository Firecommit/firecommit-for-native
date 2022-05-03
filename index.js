/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import {App} from '&/App';
import {name as appName} from './app.json';

/**
 * Ignore the "setState on unmounted component" Warning in React ^18
 * https://github.com/reactwg/react-18/discussions/82
 */
LogBox.ignoreLogs([
  "Warning: Can't perform a React state update on an unmounted component.",
]);

AppRegistry.registerComponent(appName, () => App);

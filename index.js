/**
 * @format
 */

import { AppRegistry } from 'react-native';
import Root from './src';
import { name as appName } from './app.json';

import StorybookUIRoot from './storybook';

const STORYBOOK = true;

const CurrentApp = STORYBOOK ? StorybookUIRoot : Root;

AppRegistry.registerComponent(appName, () => CurrentApp);

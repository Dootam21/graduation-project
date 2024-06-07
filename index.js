/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { requestNotifications } from 'react-native-permissions';

getPermission = async () => {
    await requestNotifications(['alert', 'badge', 'sound']);
}
getPermission()

AppRegistry.registerComponent(appName, () => App);

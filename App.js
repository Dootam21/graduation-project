import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
// import { Platform,View, Text } from 'react-native';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import appReducer from './src/reducers';
import Screens from './src/Screens';
import AsyncStorage from '@react-native-async-storage/async-storage';

const store = createStore(appReducer, applyMiddleware(thunk));
import { LogBox, PermissionsAndroid } from 'react-native';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

// import messaging from '@react-native-firebase/messaging';

// // Register background handler
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
// });

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
// import firebase from '@react-native-firebase/app';

// import { connect } from 'react-redux';

// import accountAction from './src/actions/accountAction';

class App extends Component {
  // async componentDidMount() {
  //   this.checkPermission();
  //   this.listenNotify();
  //   await messaging().registerDeviceForRemoteMessages();
  //   this.getToken();

  //   // console.log('home group_id ', this.props.admin);
  // };

  // async checkPermission() {
  //   const enabled = await messaging().hasPermission();
  //   if (enabled) {
  //     this.getToken();
  //   }
  //   else {
  //     this.requestPermission();
  //   }
  // }

  //Step 2: if not has permission -> process request
  // async requestPermission() {
  //   try {
  //     await messaging().requestPermission();
  //     this.getToken();
  //   } catch (error) {
  //     console.log('fcmToken suspended');
  //   }
  // }

  // async getToken() {

  //   let fcmToken = await AsyncStorage.getItem('fcmToken');
  //   if (!fcmToken) {
  //     fcmToken = await messaging().getToken();
  //     console.log('fcmToken 1: ', fcmToken);
  //     if (fcmToken) {
  //       console.log('fcmToken 2: ', fcmToken);
  //       await AsyncStorage.setItem('fcmToken', fcmToken);
  //     }
  //   }
  // }

  // async listenNotify() {
  //   // messaging()
  //   // .subscribeToTopic('test1')
  //   // .then(() => console.log('Subscribed to topic!'));

  //   const unsubscribe = messaging().subscribeToTopic('admin').onMessage(async remoteMessage => {
  //     console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }


  // getPermissionAndroid = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //       {
  //         title: 'Image Download Permission',
  //         message: 'Your permission is required to save images to your device',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       return true;
  //     }
  //     Alert.alert('Permission required', 'Permission is required to save images to your device',
  //       [{ text: 'OK', onPress: () => { } }],
  //       { cancelable: false },
  //     );
  //   } catch (err) {
  //     // handle error as you please
  //     //console.log('err', err);
  //     Alert.alert('Save remote image', 'Failed to save Image: ' + err.message,
  //       [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
  //       { cancelable: false },
  //     );
  //   }
  // };

  render() {
    return (
      <Provider store={store}>
        <Screens />
      </Provider>
    );
  }
}

// const mapStateToProps = state => ({
//   admin: state.admin,
// });


// export default connect(mapStateToProps)(App);


export default App

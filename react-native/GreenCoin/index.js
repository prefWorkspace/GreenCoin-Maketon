
import { AppRegistry, Alert } from 'react-native';
// import messaging from '@react-native-firebase/messaging';
import App from './App';

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Message handled in the background!', remoteMessage);
//   });

AppRegistry.registerComponent('bedragon', () => App);
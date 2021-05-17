
import {BackHandler } from "react-native";
import { useIsFocused ,useNavigation,useFocusEffect  } from '@react-navigation/native';
const navigationBackHandler = (name) => {
/*
  const navigation = useNavigation();
  useIsFocused() ?  BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick) :  BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);

  function handleBackButtonClick() {
    if(name != undefined){
      if(name != 'block')
      {
        if(name != "main")
          navigation.goBack();
          navigation.navigate(name);
      }
    }else{
       if(navigation.canGoBack())
          navigation.goBack();
       else
          navigation.navigate("main");

    }
    return true;
  }*/
}


export {navigationBackHandler ,useIsFocused ,useFocusEffect ,useNavigation};

import React,{useState,useEffect} from 'react';
import { Text, View, ScrollView,BackHandler} from 'react-native';
import CommonTitleBar from '../../components/comm/CommonTitleBar'
import ShopSelectAllTextBar from '../../components/shops/shop/ShopSelectAllTextBar'
import ShopSelectorListView from '../../components/shops/shop/ShopSelectorListView';
import EStyleSheet from 'react-native-extended-stylesheet';
import {TabActions} from '@react-navigation/native';
import {navigationBackHandler,useIsFocused,useNavigation} from '../../navigation/NavigationBackHandler';
import OrderFindBar from '../../components/comm/OrderFindBar';


export default function ShopScreen() {
    const navigation = useNavigation();
    const tabAction = TabActions.jumpTo("홈")
    const handleBackButtonClick = () => {
      if(navigation.canGoBack()){
        navigation.goBack();
      }
      else{
        navigation.dispatch(tabAction);
        BackHandler.removeEventListener('hardwareBackPress',handleBackButtonClick);
      }
      return true;
    };

    useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress',handleBackButtonClick);
      };
    }, []); 
  

    return (
      <View>
        <ScrollView style={styles.container}>
        <View>
          <CommonTitleBar title={"카테고리"}></CommonTitleBar>
          <ShopSelectAllTextBar></ShopSelectAllTextBar>
          <ShopSelectorListView ></ShopSelectorListView>
          <OrderFindBar></OrderFindBar>
        </View>
      </ScrollView>
     </View>
    );
}


const styles = EStyleSheet.create({
  container:{
    height:"100%",
    backgroundColor:"white",
  },
  marginBox:{
    height :"59rem",
  },


});

import React,{useState,useEffect} from 'react';
import { Text, View, ScrollView,BackHandler, Linking} from 'react-native';
import CommonTitleBar from '../../components/comm/CommonTitleBar'
import GoodTopTitleSelectList from '../../components/good/GoodTopTitleSelectList'
import EStyleSheet from 'react-native-extended-stylesheet';
import {navigationBackHandler, useNavigation ,useIsFocused} from '../../navigation/NavigationBackHandler';
import serverController from '../../server/serverController';
import roundUpServerController from '../../server/roundUpServerController';
import appStaticInfomation from '../../db/appStaticInfomation';
import userInfoSingleton from '../../db/userInfoSingleton';
import GoodItemBox from '../../components/good/GoodItemBox';
import OrderFindBar from '../../components/comm/OrderFindBar';


export default function GoodsScreen() {

    navigationBackHandler();
    const [category,setCategory] = useState([null,null]);
    const [categoriesList,setCategorieslist] = useState([]);
    const [roundUpList,setRoundUpList] = useState([]);

    const appInfo = appStaticInfomation.getInstance();
    const navigation = useNavigation();

    
    useEffect(() => {
      setCategorieslist([{cat_name:"전체보기",cat_id :0,cat_parent: 0}].concat(appInfo._categorieslist));
    }, [])

    
    if(useIsFocused() == true && categoriesList.length != appInfo._categorieslist.length&& appInfo._categorieslist.length > 0){
        setCategorieslist(appInfo._categorieslist);
        setCategory({cat_name:"전체보기",cat_id :0,cat_parent: 0});
    }
    
    useEffect(() => {
      var formData = new FormData();
      formData.append('cat_id',category.name == "전체보기" ? 0 : category.id);
      formData.append('offset',0);
      roundUpServerController.getRoundUpListByCatId(formData,roundUpCallBack);
    }, [category])



    const roundUpCallBack = (data) => { setRoundUpList(data); }

 

    const clickEvent = async (value) => {   

      if(value.ru_link && value.ru_link.length > 2){

        if(value.ru_link == "https://yongdeanda.com/mypage/attendance" || value.ru_link == "mypage/attendance"){
          if(userInfoSingleton.getInstance()._isLogin != true){
            navigation.navigate("selectLoginOrRegister",{root:routeInfo.name});
          }
          else
            navigation.navigate("attendance");
          return;
        }

        if(await Linking.canOpenURL(value.ru_link)){
          Linking.openURL(value.ru_link);
        }
        else if(await Linking.canOpenURL("https://yongdeanda.com/" + value.ru_link)){
          Linking.openURL("https://yongdeanda.com/" + value.ru_link);
        }
      } 
      else
        navigation.navigate("GoodDetail", {ru_id : value.ru_id , img : value.ru_image_mobile }); 
   };



    return (
      <View style={styles.container}>
        <CommonTitleBar title={"모아보기"}></CommonTitleBar>
        <GoodTopTitleSelectList categoriesList={categoriesList} setCategory={setCategory}></GoodTopTitleSelectList>
        <ScrollView>
          <View>
            {
              roundUpList.map((value)=>{
                return  <GoodItemBox value={value} clickEvent={clickEvent}/>;
              })
            }
          </View>
      </ScrollView>
      <OrderFindBar></OrderFindBar>
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

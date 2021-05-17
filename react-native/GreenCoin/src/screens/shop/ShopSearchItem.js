import  React ,{useState ,useEffect} from 'react';
import { Text,Image, View, Dimensions,ScrollView, Alert ,BackHandler} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar';
import SearchBar from '../../components/mains/search/SearchBar';
import SearchItemList from '../../components/mains/search/SearchItemList';
import {navigationBackHandler} from '../../navigation/NavigationBackHandler';
import { useNavigation,CommonActions } from '@react-navigation/native';
import productServerController from '../../server/productServerController';
import userInfoSingleton from '../../db/userInfoSingleton';

export default function SearchScreen({route}) {
  
  const [itemList,setItemList] = useState([]);
  const [itemListCount,setItemListCount] = useState(0);
  const [load,setLoad] = useState(false);
  const [blur,setBlur] = useState(false);
  const [input,setInput] = useState("");
  
  const navigation = useNavigation();

  const createFormdata = (length) =>{
    var formData = new FormData();
    formData.append('benefit',userInfoSingleton.getInstance()._benefit ==  false ? 0 : 1);
    formData.append('sortType',userInfoSingleton.getInstance()._sortType);
    formData.append('price_min',userInfoSingleton.getInstance()._price_min);
    formData.append('price_max',userInfoSingleton.getInstance()._price_max);
    formData.append('sale_min',userInfoSingleton.getInstance()._sale_min);
    formData.append('sale_max',userInfoSingleton.getInstance()._sale_max);
    formData.append('mem_id',userInfoSingleton.getInstance()._userId);
    formData.append('count',length);
    formData.append('search',"%"+route.params.input+"%");
    
    return formData;
  }

  
  const initFormData = (length) =>{
    var formData = new FormData();
    formData.append('benefit',0);
    formData.append('sortType',userInfoSingleton.getInstance()._sortType);
    formData.append('price_min',0);
    formData.append('price_max',1000000);
    formData.append('sale_min',0);
    formData.append('sale_max',100);
    formData.append('mem_id',userInfoSingleton.getInstance()._userId);
    formData.append('count',length);
    formData.append('search',"%"+route.params.input+"%");
    
    return formData;
  }


  useEffect(() => {
  }, [itemList])


  const updateShopList = (data) =>{ 
    setItemList(itemList.concat(data.itemlist));  
  }

  const callBack = (data) =>{ 
      setItemListCount(data.itemListCount);  
      setItemList(data.itemlist);   
      setLoad(true);
  }

  useEffect(() => { 
    productServerController.getProductSearchList(initFormData(0),callBack);}, 
   [route])

  useEffect(() => {
    if(blur == true && input.length > 1){

      navigation.navigate("shopSearch",{root:route.name,input:input.replace(/ /gi, "")});
    }
    setBlur(false);
  }, [blur])

    

  
  const scrollEvent = (e) =>{

    let paddingToBottom = 20;
    paddingToBottom += e.nativeEvent.layoutMeasurement.height;
    
    if (e.nativeEvent.contentOffset.y + paddingToBottom >= e.nativeEvent.contentSize.height && itemListCount > itemList.length) {
          productServerController.getProductSearchList(createFormdata(itemList.length),updateShopList);
    }
  }


  navigationBackHandler();

  const applyFilter = () =>{
    productServerController.getProductSearchList(createFormdata(0),callBack);
  }


  const backEvent = () =>{
    
    navigation.goBack();

    navigation.dispatch(
      CommonActions.navigate({
        name: 'main',
        params: {},
      })
    );
    BackHandler.removeEventListener('hardwareBackPress', backEvent);
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backEvent)
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backEvent)
  }, [])

  const leftCick = () => { navigation.navigate("홈"); };
    return (
        <ScrollView style={styles.container} onScroll={scrollEvent}>
        <CommonTitleBar title={"검색하기"} leftOption={"back"} leftClick={leftCick}/>        
        <SearchBar 
          setBlur={setBlur} 
          setInput={setInput}>
        </SearchBar>
        {
          
          load == true ?
            itemList.length == 0 ?
            <View style={styles.titleContainer}>
              <Text style={styles.title}>상품이 없습니다.</Text>
            </View>
            : 
            <SearchItemList title={route.params.input} applyFilter={applyFilter} itemListCount={itemListCount} itemList={itemList}></SearchItemList>
          :
          null
        }
        </ScrollView>
    );
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width :"100%",
    height:"100%",
    backgroundColor:"white",
  },
  titleContainer:{
    width:"100%",
    height:"200rem",
    alignItems: "center",
    justifyContent: "center",
  },
  title:{
    fontSize:"19rem",
    fontFamily:"NotoSansKR-Bold",
  }
  
});
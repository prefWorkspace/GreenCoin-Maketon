import React,{useState,useEffect} from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar'
import ReviewFilterTitle from '../../components/shops/reviewFilter/ReviewFilterTitle';
import ReviewFilterOption from '../../components/shops/reviewFilter/ReviewFilterOption';
import ReviewSearchBar from '../../components/shops/reviewFilter/ReviewSearchBar';
import ReviewClickBar from '../../components/shops/reviewFilter/ReviewClickBar';
import ReviewFilterItemList from '../../components/shops/reviewFilter/ReviewFilterItemList';
import MarginBox from '../../components/comm/MarginBox';

import {navigationBackHandler,useNavigation} from '../../navigation/NavigationBackHandler';
import reviewServerController from '../../server/reviewServerController';
import OrderFindBar from '../../components/comm/OrderFindBar';

/*

        <ReviewClickBar isBoxOpen={isBoxOpen} clickEvent={clickSearch} title={"확인"} style={{backgroundColor:"#0D2141"}} color={"#F4F6F9"}/>
        <ReviewClickBar isBoxOpen={isBoxOpen} clickEvent={clickDefault} title={"검색초기화"} style={{backgroundColor:"#F4F6F9"}} color={"#0D2141"}/>
*/
export default function ReviewFilterScreen({route}) {
    const [checkBox,setCheckBox] = useState(false);
    const [hideMore,setHideMore] = useState(false);
    const [sortType,setSortType] = useState(0);
    const [filter ,setFilter] = useState({});
    const [search ,setSearch] = useState("");
    const [itemList ,setItemList] = useState([]);
    const [maplist ,setMaplist] = useState([1,2,3,4]);

    useEffect(() => {
      if(maplist.length == 0)
          setMaplist([1,2,3,4]);
  }, [maplist])

    useEffect(() => {
       clickSearch();
    }, [checkBox])


    

    const getFormData = (count)=>{
      var formData = new FormData();
      formData.append("sortType",sortType);

      if(checkBox){
        formData.append("photo",checkBox);
      }
      
      if(filter["몸무게"]){
        formData.append("min_weight", filter["몸무게"].value.split('~')[0]);
        formData.append("max_weight", filter["몸무게"].value.split('~')[1] );
      }
  

      if(filter["키"]){
        formData.append("min_height", filter["키"].value.split('~')[0]);
        formData.append("max_height", filter["키"].value.split('~')[1] );
      }

      if(filter["평소 사이즈"]){
        var sizeNum = {"XS":0,"S":1,"M":2,"L":3,"XL":4};

        formData.append("currentSize", sizeNum[filter["평소 사이즈"].value]);
      }
  
      if(filter["카테고리"]){
        formData.append("categories", filter["카테고리"].value);
      }

      formData.append("count",count);
      formData.append("search","%"+search+"%");

      return formData;
    }

    const clickDefault = ()=>{
      setFilter({});
      setMaplist([]);
      setItemList([]);
    }

    const updateList = (data) =>{
        setHideMore(data.length < 6);
        setItemList(itemList.concat(data));
    }

    const callBack = (data)=>{
      setItemList(data);
      setHideMore(data.length < 6);
    }

    const clickSearch = () =>{
      setHideMore(false);
      reviewServerController.getReviewListByCustomFilter(getFormData(0),callBack);
    }

    const clickMoreView = ()=>{
      reviewServerController.getReviewListByCustomFilter(getFormData(itemList.length),updateList);
    }

    navigationBackHandler();
    //navigationBackHandler(route.params.root);
    return (
      <View>
        <ScrollView ScrollView style={styles.container} nestedScrollEnabled={true}>
            <CommonTitleBar title={"생생리뷰"} leftOption={"back"}/>
            <ReviewFilterTitle checkbox={checkBox} setCheckBox={setCheckBox} sortType={sortType} setSortType={setSortType}/>
            <ReviewSearchBar placeholder={"사이즈"} title={true} setSearch={setSearch}/>
            <ReviewFilterOption maplist={maplist} filter={filter} setFilter={setFilter} clickDefault={clickDefault} clickSearch={clickSearch}/>
            <ReviewFilterItemList itemList={itemList}/>
            {
              !hideMore ? 
              <ReviewClickBar  title={"더보기"} style={{backgroundColor:"#F4F6F9"}} color={"#0D2141"} clickEvent={clickMoreView}/>
              :
              null
            }
            <MarginBox height={50}/>
          </ScrollView>
          <OrderFindBar></OrderFindBar>
      </View>
    );
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

const c = StyleSheet.create({
  
})
const styles = EStyleSheet.create({
  container: {
    width :"100%",
    height:"100%",
    backgroundColor:"white",
  },
  form:{ 
    width:"100%",  
    justifyContent: "flex-start",
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor:"white",
    marginBottom:"40rem",
    marginTop:"20rem",    
    justifyContent: "center",
    alignItems: "center",
  },
  label:{
    left:"8rem",
  },
  clear:{
    margin:"3.5rem",
    width :"155.877rem",
    height:"56.316rem",
    fontSize:"14.864rem",
    textAlign: "center",
    backgroundColor:"#DFE1E8",
    borderRadius:100,
    paddingVertical: "6.5rem",
    fontFamily:"NotoSansKR-Medium",
    color:"#FFFFFF"
  }, 
  submit:{
    margin:"3.5rem",
    width :"155.877rem",
    height:"56.316rem",
    fontSize:"14.864rem",
    textAlign: "center",
    backgroundColor:"#0D2141",
    borderRadius:100,
    paddingVertical: "6.5rem",
    fontFamily:"NotoSansKR-Medium",
    color:"#FFFFFF"
  },
  hr:{
    padding:"15rem",
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
  }
});
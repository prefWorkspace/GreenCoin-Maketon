import React,{useState,useEffect} from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar'
import Benefit from '../../components/shops/filter/Benefit';
import Sort from '../../components/shops/filter/Sort';
import Price from '../../components/shops/filter/Price';
import Sale from '../../components/shops/filter/Sale';
import {navigationBackHandler,useNavigation} from '../../navigation/NavigationBackHandler';
import filterContoller from '../../db/realm/filterContoller';
import userInfoSingleton from '../../db/userInfoSingleton';

export default function FilterScreen({route}) {

  const instance = userInfoSingleton.getInstance();

  const [benefit,setBenefit] = useState(instance._benefit == "" ? false : instance._benefit);
  const [sortType,setSortType] = useState(instance._sortType == "" ? 0 : instance._sortType );
  const [price,setPrice] = useState([parseInt(instance._price_min ? instance._price_min : 0 ),parseInt(instance._price_max ? instance._price_max : 300000)]);
  const [sale,setSale] = useState([parseInt(instance._sale_min ? instance._sale_min : 0),parseInt(instance._sale_max ? instance._sale_max : 100)]);
  const navigation = useNavigation();

  navigationBackHandler();
  const moveToNext = ()=>{
    navigation.goBack();
    route.params.applyFilter(true);
  }

  const clickApply = ()=>{
    var state = {
      benefit : benefit,
      sortType : sortType,
      price_min : price[0],
      price_max : price[1],
      sale_min : sale[0],
      sale_max : sale[1],
    }

    filterContoller.setFilterRealm(state,moveToNext);
    
  }

  const clearApply = () =>{  
    route.params.applyFilter(false);
    navigation.goBack();
  }

    return (
      <ScrollView style={styles.container}>
        <CommonTitleBar title={"FILTER"} rightOption={"dropDown"}></CommonTitleBar>
          <Benefit benefit={benefit} setBenefit={setBenefit}></Benefit>
          <Sort sortType={sortType} setSortType={setSortType}></Sort>
          <Price price={price} setPrice={setPrice}></Price>
          <Sale sale={sale} setSale={setSale}></Sale>
          <TouchableOpacity style={styles.form} >
              <Text style={styles.clear} onPress={clearApply}>초기화</Text>
              <Text style={styles.submit} onPress={clickApply}>적용하기</Text>
          </TouchableOpacity>
      </ScrollView>
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
    paddingVertical: Platform.OS != "ios" ? "6.5rem" : "18rem",
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
    paddingVertical: Platform.OS != "ios" ? "6.5rem" : "18rem",
    fontFamily:"NotoSansKR-Medium",
    color:"#FFFFFF"
  },
  hr:{
    padding:"15rem",
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
  }
});
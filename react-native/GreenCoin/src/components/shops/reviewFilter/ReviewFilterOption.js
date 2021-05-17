import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,TextInput,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ReviewClickBar from './ReviewClickBar';
import ReviewFilterDropDown from './ReviewFilterDropDown';
import appStaticInfomation from '../../../db/appStaticInfomation';

const dropDownTitle=[
  "카테고리",
  "키",
  "몸무게",
  "평소 사이즈"
]


const Data =[
  [
    {
      label: "전체보기", value :"전체보기"
    },
    {
      label: "청바지", value :"청바지"
    },
    {
      label: "바지", value :"바지"
    },
    {
      label: "티셔츠", value :"티셔츠"
    },
    {
      label: "계절신상", value :"계절신상"
    },
  ],
  [
    {
      label: "160cm 이하", value :"0~160"
    },
    {
      label: "161~169 cm", value :"161~169"
    },
    {
      label: "170~176 cm", value :"170~176"
    },
    {
      label: "177~183 cm", value :"177~183"
    },
    {
      label: "184~190 cm", value :"184~190"
    },
    {
      label: "190cm 이상", value :"190~1000"
    },
  ],
  [
    {
      label: "50kg 이하", value :"0~50"
    },
    {
      label: "51~59 kg", value :"51~59"
    },
    {
      label: "60~68 kg", value :"60~68"
    },
    {
      label: "69~77 kg", value :"69~77"
    },
    {
      label: "78~86 kg", value :"78~86"
    },
    {
      label: "87~95 kg", value :"87~95"
    },
    {
      label: "96kg 이상", value :"96~1000"
    },
  ],
  [
    {
      label: "XS", value :"XS"
    },
    {
      label: "S", value :"S"
    },
    {
      label: "M", value :"M"
    },
    {
      label: "L", value :"L"
    },
    {
      label: "XL", value :"XL"
    },
  ]
]


export default function ReviewFilterOption({clickSearch,clickDefault,filter,setFilter,maplist}) {
  const categorieslist = appStaticInfomation.getInstance()._categorieslist;

  Data[0] = categorieslist.map((value) =>{
    return {label : value.cat_name , value : value.cat_id};
  })



    return (
      <View style={styles.container}>
          <View style={styles.tagContainer}>
            {
              maplist.map((value,index)=>{
                const selectBox = index % 2 == 0 ? styles.selectBoxRight : styles.selectBoxLeft;

                const filterClick = (value,index) =>{
                  var temp = filter;
                  temp[dropDownTitle[index]] = value;
                  setFilter(temp);
                }

                return ( 
                  <ReviewFilterDropDown style={selectBox} filterClick={filterClick} zIndex={10000 / value} list={Data[index]} title={dropDownTitle[index]}></ReviewFilterDropDown>
                );
              })
            }    
            <ReviewClickBar clickEvent={clickSearch} title={"확인"} style={{backgroundColor:"#0D2141"}} color={"#F4F6F9"}/>
            <ReviewClickBar clickEvent={clickDefault} title={"검색초기화"} style={{backgroundColor:"#F4F6F9"}} color={"#0D2141"}/>
          </View>
      </View>
    );
  }


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft :"20rem",
    paddingRight:"20rem",
  },
  tagContainer:{   
    justifyContent: "flex-start",
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor:"white",
    alignItems: "center",
    justifyContent: "center",
    paddingTop:"12rem",
    paddingBottom:"12rem",
    zIndex:100,
    height:"280rem",
  },
  selectBox:{
    width:"164.5rem",
    height:"55rem",
    margin:"5rem",
    borderWidth:1,
    borderColor:"#E1E6ED",
    padding:"10rem",
    fontSize:"12.882rem",
    alignItems: "center",
    justifyContent: "center",
  },
  selectBoxLeft:{
    marginLeft:"6rem",
    marginBottom:"5rem",
  },
  selectBoxRight:{
    marginRight:"6rem",
    marginBottom:"5rem",
  },

  label:{
    color:"black",
  },
  labelActive:{
    color:"white",
  }


});

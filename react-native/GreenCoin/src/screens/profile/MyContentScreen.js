import React,{useState,useEffect} from 'react';
import { View, ScrollView, Dimensions, Alert, Text, CheckBox} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import MyInfo from '../../components/profiles/profile/MyInfo';
import ProfileContent from '../../components/profiles/profile/ProfileContent';
import {navigationBackHandler} from '../../navigation/NavigationBackHandler';
import { useNavigation} from '@react-navigation/native';
import userInfoSingleton from '../../db/userInfoSingleton';
import MainTitle from '../../components/mains/main/MainTitle';
import CommunityDetailTitle from "../../components/community/communityDetail/CommunityDetailTitle";
import CommonDetailTitle from '../../components/comm/CommonDetailTitle';
import MyContentDecide from '../../components/profiles/myContent/MyContentDecide';

export default function MyContentScreen({route}) {

    const [list, setList] = useState([
      {
        content:"testestsetset",
        date:"2020-22-22",
      },
      {
        content:"testestsetset",
        date:"2020-22-22",
      },
      {
        content:"testestsetset",
        date:"2020-22-22",
      },
      {
        content:"testestsetset",
        date:"2020-22-22",
      },
      {
        content:"testestsetset",
        date:"2020-22-22",
      }
    ]);

    const Item = ({value}) =>{
      return (
        <View style={styles.contentContainer}>
            <CheckBox style={styles.checkbox}/>
            <Text style={styles.left}>{value.content}</Text>
            <Text  style={styles.right}>{value.date}</Text>
        </View>
      )
    }

    return (
      <View  style={styles.container}>
        <MainTitle></MainTitle>
        <CommonDetailTitle title={"내 글보기"}/>
        <ScrollView>
          {
            list.map((value)=>{
              return  <Item value={value}/> 
            })
          }
          <MyContentDecide/>
        </ScrollView>
      </View>
    );
  }


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    backgroundColor:"white",
    height:"100%",
  },
  contentContainer:{
    flexDirection:"row",
    alignItems: "center",
    justifyContent: "center",
  },
  left:{
    marginRight:"auto",
  },
  right:{
    marginLeft:"auto",
  },
  checkbox:{
    width:"25rem",
    height:"25rem",
    marginRight:"10rem",
  },
  currentTop:{
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-between",
  },
  currentTitle:{
    fontSize :"15rem",
  },
  changeText:{
    fontSize :"13rem",
    color:"#D68C01",
    width:"111rem",
    height:"28rem",
    backgroundColor:"#FFF7E8",
    lineHeight:"28rem",
    borderWidth:"1rem",
    borderColor:"#CD8E31",
    borderRadius:"14rem",
    textAlign:"center",
  },
  crtCoin:{
    fontSize :"29rem",
    color:"#66D8B9",
  },
  tableTitle:{
    display: "flex",
    flexDirection:"row",
    marginVertical:"20rem",
    marginHorizontal:"20rem",
  },
  pigIcon:{
    width: "22rem",
    height: "22rem",
    marginRight:"10rem",
  },
});
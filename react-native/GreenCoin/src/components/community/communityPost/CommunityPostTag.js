import * as React from 'react';
import { TouchableOpacity, Text,Image, View, Dimensions,TextInput,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation ,useRoute } from '@react-navigation/native';
import userInfoSingleton from '../../../db/userInfoSingleton';

export default function CommunityPostTag() {
  const navigation = useNavigation();

    return (
      <View style={styles.searchContainer}>
          <View style={styles.searchBarContainer}>
            <TextInput style={styles.searchInput} placeholder="연관 주제태그를 입력후 선택하여주세요."></TextInput>
            <Image style={styles.searchIcon} source={require('../../../assets/img/icon/searchIcon.png')} resizeMode="stretch"></Image>
          </View>
          <View style={styles.tagContainer}>
          {
            [1,2,3,4,5].map((value)=>{
              return (
                <View style={styles.tagBody}>
                  <Text style={styles.tag}>탄소줄이기</Text>
                </View>
              )
            })
          }
          </View>
        </View>
    );
  }
  

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  searchContainer:{
    paddingLeft:"10rem",
    paddingRight:"10rem",
    marginBottom:"5rem",
  },
  searchBarContainer:{
    borderWidth:1,
    borderRadius:50,
    borderColor:"#BFBFBF",
    height:"20rem",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    height:"35rem",
  },  
  searchInput:{
    paddingLeft:"20rem",
    width:"100%",
    height:"38rem",
    fontSize:14,
    alignItems: "center",
    justifyContent: "center",
    
  },
  searchIcon:{
    width:"26rem",
    height:"26rem",
    marginLeft:"auto",
    marginRight:"4rem",
  },
  image:{
    width:"28.42rem",
    height:"28.42rem",
    marginRight:"10rem",
  },
  likeInfoMore:{
    marginLeft:"auto",
  },
  searchImage:{
    width :"31.46rem",
    height :"31.46rem",
    top:"23.28rem",
    left:"15rem",
  },
  tagContainer:{
    flexDirection: 'row',
    paddingTop:"10rem",
  },
  tagBody:{
    backgroundColor:"#66D8B9",
    height :"31.46rem",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft:"20rem",
    paddingRight:"20rem",
    marginRight:"4rem",
    borderRadius:50,
  },
  tag:{
    color:"white",
    fontSize:16,
  }
});

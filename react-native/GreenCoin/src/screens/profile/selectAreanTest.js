import React,{useState,useEffect} from 'react';
import { View, ScrollView, Dimensions, Alert, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import MyInfo from '../../components/profiles/profile/MyInfo';
import ProfileContent from '../../components/profiles/profile/ProfileContent';
import {navigationBackHandler} from '../../navigation/NavigationBackHandler';
import { useNavigation} from '@react-navigation/native';
import userInfoSingleton from '../../db/userInfoSingleton';
import MainTitle from '../../components/mains/main/MainTitle';
import CommunityDetailTitle from "../../components/community/communityDetail/CommunityDetailTitle";
import serverController from '../../server/serverController';
import WhiteGra from '../../img/intro/whiteGra.png';
import CommonDetailTitle from '../../components/comm/CommonDetailTitle';


export default function SelectAreaTest({route}) {
    const navigation = useNavigation();
    const userName = userInfoSingleton.getInstance()._userName;
    navigationBackHandler("main");

    const [isPress, setIsPress] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [listData, setListData] = useState([]);


    useEffect(() => {
      serverController.connectFetchController('/locations',"GET",null,function(res){
        setListData(res.data.locations);
      });
    }, [])

    // 시작 버튼 클릭
    const onClickStart = (item) =>{
        // reactNativeSelectArea("tab");
    }
    
    // 로그인 버튼 클릭
    const onClickLogin = (item) =>{
        // reactNativeSelectArea("tab");
    }

    // 리스트 클릭 
    const onClickList = (index) =>{
        setCurrentIndex(index);
        if(currentIndex == index){
            setIsPress(false);
            setCurrentIndex(null);
        }else{
            setIsPress(true);
        }
    }

        

    return (
      <View  style={styles.container}>
        <MainTitle></MainTitle>
        <CommonDetailTitle title={"지역선택"} />
        <ScrollView>
            {
                listData.map((item, index) => {
                    return(
                        <TouchableOpacity
                        onPress={() => onClickList(index)}
                        style={[styles.listWrap, currentIndex==index&&styles.selectEl]}
                        key={index}
                        >
                            <Text style={[styles.listText, currentIndex==index&&styles.selectElText]}>
                                {item.fullname}
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }
        </ScrollView>
        

         <ImageBackground source={require("../../img/intro/whiteGra.png")} style={styles.btnWrap}>
             <TouchableOpacity style={[styles.startBtnWrap, styles.btn, isPress&&styles.selectStartBtn]}>
                <Text style={styles.startBtn} onClick={() => onClickStart()}>지역 설정하기!</Text>
             </TouchableOpacity>
        </ImageBackground>

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
  listWrap : {
    width: "100%",
    paddingVertical:"22rem",
    display: "flex",
    alignItems:"center",
    justifyContent:"center",
    fontSize: "15rem",
  },
  selectEl : {
    backgroundColor:"#66D8B9",
    
  },
  listText : {
    fontSize: "15rem",
    color:"#000"
  },
  selectElText : {
    color:"#fff",
  },
  btnWrap: {
      marginHorizontal:"13rem",
      // 하단 버튼 마진!!! 탭 메뉴 없어지면 생겨야 합니다.
      marginBottom:"10rem",
},
  btn:{
    width:"95%",
    borderWidth:"3rem",
    borderRadius: "10rem",
    height:"46rem",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    borderColor:"#BFBFBF",
},
startBtnWrap: {
    backgroundColor: "#BFBFBF",
    marginBottom: "5rem",
},
startBtn: {
    fontSize:"20rem",
    color:"#FFFFFF",
  },
  loginBtnWrap: {
      backgroundColor: "#FFFFFF",
  },
  loginBtn: {
    fontSize:"20rem",
    color:"#BFBFBF",
  },
  selectStartBtn: {
    backgroundColor: "#66D8B9",
  },
  selectLoginBtn: {
    borderColor:"#66D8B9",
    color:"#66D8B9",
  },
  
});
import  React ,{useState} from 'react';
import { Platform ,Text,Image, View, Dimensions,ScrollView, TouchableOpacity ,ImageBackground} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar';
import {navigationBackHandler , useNavigation ,useIsFocused} from '../../navigation/NavigationBackHandler';
import appStaticInfomation from '../../db/appStaticInfomation';
import localStringData from '../../const/localStringData';


export default function LoginMainScreen() {
  const appInfo = appStaticInfomation.getInstance();
  const [imagePath , setImagePath] = useState(appInfo._loginBanner[0] ? appInfo._loginBanner[0] : null);

  navigationBackHandler();
  const navigation = useNavigation();
  if(useIsFocused()){
    if(imagePath && imagePath.ban_image_mobile != appInfo._loginBanner[0].ban_image_mobile)
      setImagePath(appInfo._loginBanner[0]);
  }
  
    return (
      <ImageBackground blurRadius={1} source={{uri:localStringData.imagePath + (imagePath ? imagePath.ban_image_mobile  : "")}} style={styles.image} resizeMode={"cover"}>
        <ScrollView style={styles.container}>
        <CommonTitleBar leftOption={"back"} bottom={false}></CommonTitleBar>
        <View style={styles.itemContainer}>
          <View>
            <Image source={require("../../assets/img/login/LoginLogo.png")}></Image>
          </View>
          <View style={styles.labelContainer}>
              <Text style={styles.title}>매일매일 신상 업로드 되는 용된다.</Text>
              <Text style={[styles.title,styles.fontPosition]}>소비자가 원했던 편리함을 한 곳에 담았습니다.</Text>
              <Text style={[styles.label,styles.font1]}>1. 회원가입시 <Text style={styles.point}>2,000원</Text> 적립금 지급</Text>
              <Text style={[styles.label,styles.font2]}>2. {appInfo._shipLimit}만원 이상 구매시 <Text style={styles.point}>무료배송</Text></Text>
              <Text style={[styles.label,styles.font3]}>3. 리뷰작성 시 적립금 <Text style={styles.point}>100%</Text> 지급</Text>
              <Text style={[styles.label,styles.font4]}>4. 출석체크 이벤트 참여 시 <Text style={styles.point}>다양한 보상</Text></Text>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.buttonContainer} onPress={()=>{navigation.navigate("register")}}>
                <View style={styles.buttonImageContainer}>
                  <Image source={require('../../assets/img/login/createAccount.png')}></Image>
                </View>
                <View style={styles.buttonLabelContainer}>
                  <Text style={styles.buttonTitle}>간편회원가입</Text>
                  <Text style={styles.buttonSubtitle}>아직 회원이 아니신가요?</Text>
                </View>
                <View  style={[styles.shadowContainer, styles.shadow]}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}  onPress={()=>{navigation.navigate("login")}}>
                <View style={styles.buttonImageContainer}>
                    <Image source={require('../../assets/img/login/login.png')}></Image>
                </View>
                <View style={styles.buttonLabelContainer}>
                  <Text style={styles.buttonTitle}>로그인</Text>
                  <Text style={styles.buttonSubtitle}>용된다 회원이신가요?</Text>
                </View>
                <View  style={[styles.shadowContainer, styles.shadow]}/>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
    );
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width :"100%",
    height:"100%",
  },
  image: {
    height:"100%",
  },
  itemContainer:{
    width:"100%",
    height:"100%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom:"100rem",
  },
  labelContainer:{
    alignItems: "center",
    justifyContent: "center",
  },
  title:{
    fontFamily:"NotoSansKR-Bold",
    color:"black",
    fontSize:"13rem",
  },
  label:{
    fontFamily:"NotoSansKR-Regular",
    color:"black",
    fontSize:"13rem",
  },
  point:{
    fontFamily:"NotoSansKR-Medium",
    color:"black",
    fontSize:"13rem",
  },
  fontPosition:{  bottom:Platform.OS != "ios" ?"15rem":0,},
  font1:{ bottom: Platform.OS != "ios" ? "10rem" :0 },
  font2:{  bottom:Platform.OS != "ios" ? "23rem" :0,},
  font3:{  bottom:Platform.OS != "ios" ? "36rem":0,},
  font4:{  bottom:Platform.OS != "ios" ? "49rem":0, },
  bottomContainer:{
    flexDirection: 'row',
    top: Platform.OS != "ios" ? 0 : "50rem"
  },
  buttonContainer:{
    width:"159rem",
    height:"145rem",
    margin:"10rem",
    backgroundColor:"#0D2141",
    borderRadius:15,
    alignItems: "center",
    justifyContent: "center",
    paddingTop:"50rem",
  },
  buttonImageContainer:{
    height:"53%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLabelContainer:{
    alignItems: "center",
    justifyContent: "center",
    top:"15rem",
  },
  buttonTitle:{
    fontSize:"16rem",
    color:"#26CBFF",
  },
  buttonSubtitle:{
    fontSize:"13rem",
    color:"white",
  },
  shadowContainer:{ 
    height:"60rem",
    width:"96%", 
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 1,
    elevation: "16rem",
    borderRadius:"36rem",
  },
  
  
});
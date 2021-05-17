import  React ,{useState ,useEffect}  from 'react';
import { Text,Image, View, Dimensions,ScrollView,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar';
import DropDownAllInfo from '../../components/register/DropDownAllInfo';
import DropDownIdentify from '../../components/register/DropDownIdentify';
import DropDownPolicyMarketing from '../../components/register/DropDownPolicyMarketing';
import PolicyDecideButton from '../../components/register/PolicyDecideButton';
import MarginBox from '../../components/comm/MarginBox';

import {navigationBackHandler,useNavigation} from '../../navigation/NavigationBackHandler';

import registerApi from '../../server/registerServerController';


export default function InsertRegisterInfomation({route}) {
  const [identify,setIdentify] = useState("");
  const [checkAll,setCheckAll] = useState(false);
  const [checkIdentify,setCheckIdentify] = useState(false);
  const [checkMustInfo,setCheckMustInfo] = useState(false);
  const [checkMarketing,setCheckMarketing] = useState(false);
  const navigation = useNavigation();
  var isClick = false;

  navigationBackHandler();
  useEffect(() => {
    if(checkAll == true){
      setCheckMarketing(true);
      setCheckIdentify(true);
      setCheckMustInfo(true);
    }
  }, [checkAll])

  useEffect(() => { setIdentify(checkIdentify && checkMustInfo);}, [checkIdentify]);
  useEffect(() => { setIdentify(checkIdentify && checkMustInfo);}, [checkMustInfo]);



  const moveToNext = (data) =>{
    isClick = false;

    if(data == 0){
      Alert.alert(" ","이미 가입되어있는 회원입니다.");
      return;
    }

    let inputInfo = route.params.inputInfo;
    inputInfo.marketting = checkMarketing;
    inputInfo.number = data;

    navigation.navigate("insertIdentify",{ 
      inputInfo : inputInfo,
      nextRoot : "insertIdAndPassword" }, 
    );
  }



  const submitEvent = () =>{  
    

    if(isClick)
      return;
    isClick = true;
    registerApi.registerPhoneNumberCheck(route.params.inputInfo.phone.toString(),moveToNext);

  
}

    return (
      <ScrollView style={styles.container}>
        <CommonTitleBar rightOption={"close"} bottom={false}></CommonTitleBar>
        <View style={styles.itemContainer}>  
          <Text style={styles.title}>
              약관을 확인해주세요
          </Text>
          <TouchableOpacity  style={styles.checkContainer} activeOpacity={1} onPress={()=>{setCheckAll(!checkAll)}}>
            <View style={checkAll ? styles.imageActive : styles.image} >
              <Image source={require('../../assets/img/label_point/check.png')}></Image>
            </View>
            <Text style={styles.subtitle}>약관 전체동의</Text>
          </TouchableOpacity>
          <DropDownAllInfo  checkMustInfo={checkMustInfo} setCheckMustInfo={setCheckMustInfo}/>
          <DropDownIdentify checkIdentify={checkIdentify} setCheckIdentify={setCheckIdentify}/>
          <DropDownPolicyMarketing checkMarketing={checkMarketing} setCheckMarketing={setCheckMarketing} />
          <MarginBox height={180}></MarginBox>
          <PolicyDecideButton active={identify} title={"확인"} clickEvent={submitEvent}/>
        </View>
      </ScrollView>
    );
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width :"100%",
    paddingLeft:"15rem",
    backgroundColor:"white",
  },
  itemContainer:{
    bottom:"20rem",
  },
  checkContainer:{
    flexDirection: 'row',
    alignItems: "center", 
    paddingLeft:"15rem",
  },
  image:{
    width:"22rem",
    height:"22rem",
    marginRight:"5rem",
    backgroundColor:"#E1E6ED",
    borderRadius:"11rem",
    alignItems: "center", 
    justifyContent: "center",
  },
  imageActive:{
    width:"22rem",
    height:"22rem",
    marginRight:"5rem",
    backgroundColor:"#0D2141",
    borderRadius:"11rem",
    alignItems: "center", 
    justifyContent: "center",
  },
  title:{
    fontFamily:"NotoSansKR-Medium",
    fontSize:"28rem",
  },
  subtitle:{
    fontFamily:"NotoSansKR-Medium",
    fontSize:"18rem",
  },
  
});
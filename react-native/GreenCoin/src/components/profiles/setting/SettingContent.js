import React ,{useState}from 'react';
import { Alert,Text, View, Dimensions,Image ,Switch} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { TouchableOpacity } from 'react-native-gesture-handler';
import settingServerController from '../../../server/settingServerController';
import userInfoSingleton from '../../../db/userInfoSingleton';
import { useNavigation,useRoute } from '@react-navigation/native';

export default function SettingContent({url,title,point,clickEvent}) {
  const toggleState =  title == "이벤트/마케팅 알림" ? 
  userInfoSingleton.getInstance()._mem_notification 
  : 
  userInfoSingleton.getInstance()._mem_notification_event;

  const [isEnabled, setIsEnabled] = useState(toggleState == "" || toggleState =="n" ? false : true );
  const navigation = useNavigation();
  const routeInfo = useRoute();

  const toggleCallBack = (data) => {
    if(data == 1){
      if(title == "이벤트/마케팅 알림")
        userInfoSingleton.getInstance()._mem_notification = !isEnabled;
      else
        userInfoSingleton.getInstance()._mem_notification_event = !isEnabled;

      setIsEnabled(previousState => !previousState);
    }
    else
      Alert.alert(' ','변경 실패하였습니다.');
  }
  const toggleSwitch = (checked) => {
    var formData = new FormData();
    
    if(userInfoSingleton.getInstance()._isLogin != true){
      setIsEnabled(previousState => !previousState);
      return;
      // navigation.navigate("selectLoginOrRegister",{root:routeInfo.name});
    }

    formData.append("mem_id",userInfoSingleton.getInstance()._userId);
    formData.append(title == "이벤트/마케팅 알림" ? "mem_notification" : "mem_notification_event", checked ? "y":"n");
    settingServerController.updateNotification(formData,toggleCallBack)
  }




    return (
       <View style={styles.container}>
         <TouchableOpacity style={styles.touchableOpacity} onPress={clickEvent}>
            <View style={styles.imageContainer}>
              <Image style={styles.icon} source={url}/>
            </View>
            <Text style={styles.title}>{title}</Text>
          </TouchableOpacity>
          <View style={styles.pointContainer}> 
          {
            point ?
              point == "switch" ?
              <Switch 
                trackColor={{ false: "#EBEBEB", true: "#0D2141"}}
                thumbColor={"white"}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              :
              <Image style={styles.select} source={require("../../../assets/img/settingIcon/right.png")}/>
            : 
            null
          }
          </View>
      </View>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"306.205rem",
    height:"57.457rem",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    padding:10,
  },
  touchableOpacity:{
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    width:"100%",
  },
  imageContainer:{
    height:"57.457rem",    
    alignItems: "center",
    justifyContent: "center",
    width:"30rem",
  },
  pointContainer:{
    width:"20%",
    height:"100%",
    alignItems: "center",
    justifyContent: "center",
  },
  icon:{
    marginRight:"18rem",
  },
  title:{
    width:"190rem",
    fontFamily:"NotoSansKR-Medium",
    fontSize:"14.864rem",
    right:"5rem",

  },
  select:{
    fontSize:"11.891rem",
    fontFamily:"NotoSansKR-Regular",
    marginLeft:"auto",
    right:"4rem",
  },
});
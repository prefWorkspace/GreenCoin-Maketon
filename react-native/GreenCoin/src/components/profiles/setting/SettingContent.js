import React ,{useState}from 'react';
import { Alert,Text, View, Dimensions,Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { TouchableOpacity } from 'react-native-gesture-handler';
import settingServerController from '../../../server/settingServerController';
import userInfoSingleton from '../../../db/userInfoSingleton';
import { useNavigation,useRoute } from '@react-navigation/native';
import { Switch } from 'react-native-switch';
export default function SettingContent({title,toggle,setToggle,clickEvent}) {

  const toggleSwitch = (checked) => {
    setToggle(checked);
  }


    return (
       <View style={styles.container}>
         <TouchableOpacity style={styles.touchableOpacity} onPress={clickEvent}>
            <Text style={styles.title}>{title}</Text>
          </TouchableOpacity>
          <View style={styles.pointContainer}> 
              <Switch 
                backgroundActive={"#66D8B9"}
                backgroundInactive={"#959595"}
                onValueChange={toggleSwitch}
                value={toggle}
                circleSize={33}
                innerCircleStyle={styles.dot}
                outerCircleStyle={styles.dotContainer}
                switchLeftPx={4} 
                switchRightPx={4} 
              />
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
  dot:{
    width:"23rem",
    height:"23rem",
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
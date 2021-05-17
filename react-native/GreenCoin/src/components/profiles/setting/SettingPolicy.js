import * as React from 'react';
import { Text, View, Dimensions,Image, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import SettingContent from './SettingContent';
import { useNavigation,useRoute } from '@react-navigation/native';


export default function SettingPolicy() {
    const navigation = useNavigation();
    const routeInfo = useRoute();

    const openPersonPolicy =()=>{
      navigation.navigate("개인정보취급방침",{root:routeInfo.name});
    };

    const openPolicy =()=>{
      navigation.navigate("이용약관",{root:routeInfo.name});
    };

    return (
      <View style={styles.container}>
        <View style={styles.shadow}>
          <SettingContent 
            url={require("../../../assets/img/settingIcon/personalPolicy.png")}
            title={"개인정보취급방침"}
            point={true}
            clickEvent={openPersonPolicy}
          />
          <SettingContent 
            url={require("../../../assets/img/settingIcon/policy.png")}
            title={"이용약관"}
            point={true}
            clickEvent={openPolicy}
          />
         </View>
      </View>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    padding:"10rem",
    alignItems: "center",
    justifyContent: "center",
    borderRadius:"10rem",
  },
  shadow:{
    width:"90%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"white",
    borderRadius:10,
    elevation:6,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
  },
  itemContainer:{
    width:"306.205rem",
    height:"57.457rem",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    padding:10,
  },
  icon:{
    marginRight:"auto",
  },
  title:{
    width:"190rem",
    fontFamily:"NotoSansKR-Medium",
    fontSize:"14.864rem",
    marginRight:"40rem",
  },
  select:{
    height:"33.692rem",
    fontSize:"11.891rem",
    fontFamily:"NotoSansKR-Regular",
    marginLeft:"auto",
  },
  hr:{
    width:"90%",
    borderBottomColor: '#efefef',
    borderBottomWidth: 1.2,
  }, 
});
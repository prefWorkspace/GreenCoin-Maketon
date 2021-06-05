import React, {useState} from 'react';
import { TouchableOpacity, Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation ,useRoute , useFocusEffect } from '@react-navigation/native';
import userInfoSingleton from '../../../db/userInfoSingleton';

export default function MainTitle() {
  const navigation = useNavigation();
  const [image, setImage] = useState("");


  useFocusEffect(
    React.useCallback(() => {  
      setImage(userInfoSingleton.getInstance()._profile_img);
    }, [])
  );

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.titleLeft} onPress={()=>{navigation.navigate("main")}}>
          <Image style={styles.logoImage} source={require('../../../assets/img/logo/MainLogo.png')} resizeMode="stretch" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.titleRight}  onPress={()=>{  navigation.navigate(""); }}>
          <Image style={styles.image} source={
              image ? 
              {uri: "https://d2rue8hpwv3oux.cloudfront.net/post/" + image}
              :
              require('../../../assets/img/logo/profile.png')
              } 
              resizeMode={"cover"}
            />
        </TouchableOpacity>
      </View>
    );
  }
  

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    height :"68.42rem",
    justifyContent: "center",
    right:"10rem",
  },
  titleLeft:{
    flexDirection: 'row',
    padding:"10rem",
    paddingLeft:"30rem",
    height:"68.42rem",
    marginRight:"auto",
  },
  titleRight:{
    flexDirection: 'row',
    padding:"10rem",
    height:"68.42rem",
    marginLeft:"auto",
  },
 
  logoImage:{
    height:"40.62rem",
    width:"123.09rem"
  },
  image:{ 
    width:"40rem",
    height:"40rem",
    borderRadius:50,
  },

});

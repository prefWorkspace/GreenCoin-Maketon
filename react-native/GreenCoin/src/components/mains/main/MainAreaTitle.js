import * as React from 'react';
import { TouchableOpacity, Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation ,useRoute } from '@react-navigation/native';
import userInfoSingleton from '../../../db/userInfoSingleton';

export default function MainTitle() {
  const navigation = useNavigation();
  const routeInfo = useRoute();

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.titleAreaBody} onPress={()=>{}}>
          <Text style={styles.titleLabel}>{"주소를 선택해주세요!"}</Text>
          <Image style={styles.titleAddressPoint} source={require('../../../assets/img/label_point/titleAddressPoint.png')}></Image>
        </TouchableOpacity>
      </View>
    );
  }
  

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    width :"380rem",
    paddingLeft:"20rem",
    backgroundColor:"#F8F7F7"
  },
  titleAreaBody:{
    flexDirection: 'row',
    width:"240rem",
    // padding:"10rem",
    height:"68.42rem",
    alignItems: "center",
    // justifyContent: "center",
  },
  titleLabel:{
    textAlign:"center",
    fontSize :"14rem",
    fontWeight:'bold',
    
  },
  titleAddressPoint:{
    marginLeft:"5rem",
    bottom:"2rem",
  },

});

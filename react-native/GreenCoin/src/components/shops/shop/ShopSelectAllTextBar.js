import * as React from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet, Platform, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation ,useRoute} from '@react-navigation/native';

export default function ShopSelectAllTextBar() {
    const navigation = useNavigation();
    const route = useRoute();

    return (
      <View style={styles.container}>
          <Text style={styles.label} onPress={()=>{navigation.navigate("shopList",{route: route.name, cat_name:"전체보기",cat_id:0})}}>전체보기
          </Text>
          <Image style={styles.labelPoint} source={require('../../../assets/img/label_point/rightClickPoint.png')} />
      </View>
    );
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

const c = StyleSheet.create({
  
})
const styles = EStyleSheet.create({
  container: {
    width :"380rem",
    height:"85.89rem",
    backgroundColor:"white",
    paddingRight:Platform.OS != "ios" ?  "13rem" : "13rem"
  },
  label:{
    alignSelf: 'flex-end',
    paddingTop:"29rem",
    paddingRight:"15rem",
    fontSize :"14rem",
  },
  labelPoint:{
    alignSelf: 'flex-end',
    bottom:Platform.OS != "ios" ?  "15rem" : "13rem",
  }
});
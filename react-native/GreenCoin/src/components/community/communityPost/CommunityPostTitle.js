import * as React from 'react';
import { TouchableOpacity, Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation ,useRoute } from '@react-navigation/native';
import userInfoSingleton from '../../../db/userInfoSingleton';

export default function CommunityPostTitle() {
  const navigation = useNavigation();
  const routeInfo = useRoute();

  const goBack = () =>{ navigation.goBack(); }


    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.titleAreaBody} onPress={goBack}>
           <Image style={styles.titleAddressPoint} source={require('../../../assets/img/label_point/leftClickPoint.png')}></Image>
           <Text style={styles.titleLabel}>{"글 쓰기"}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor:"#F8F7F7"
  },
  titleAreaBody:{
    width:"100%",
    flexDirection: 'row',
    height:"50.42rem",
    alignItems: "center",
    justifyContent: "center",
  },
  titleLabel:{
    fontSize :"14rem",
    fontWeight:'bold',
    color:"#505050",
    marginRight:"auto",
  },
  titleAddressPoint:{
    marginRight:"auto",
    left:"15rem",
  },

});

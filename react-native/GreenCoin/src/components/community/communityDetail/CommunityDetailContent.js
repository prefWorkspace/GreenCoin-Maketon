import * as React from 'react';
import { TouchableOpacity, Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation ,useRoute } from '@react-navigation/native';
import userInfoSingleton from '../../../db/userInfoSingleton';

export default function CommunityDetailContent({textData}) {
  const navigation = useNavigation();

  const goBack = () =>{ navigation.goBack(); }


    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.titleAreaBody} onPress={goBack}>
           <Text style={styles.titleLabel}>{textData.date}</Text>
           <Image style={styles.titleAddressPoint} source={require('../../../assets/img/label_point/rightClickPoint.png')}></Image>
        </TouchableOpacity>
        <View style={styles.labelContainer}>
          <Text style={styles.title}>{textData.title}</Text>
          <Text style={styles.label}>{textData.label}</Text>
        </View>
      </View>
    );
  }
  

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    backgroundColor:"#F8F7F7",
    padding:"20rem",
  },
  titleAreaBody:{
    width:"100%",
    flexDirection: 'row',
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
    marginLeft:"auto",
    right:"10rem",
  },
  labelContainer:{

  },
  title:{
    fontSize:15,
    color:"#505050",
    marginTop:"10rem",
    marginBottom:"30rem",
  },
  label:{
    fontSize:12,
    color:"#505050",
  }

});

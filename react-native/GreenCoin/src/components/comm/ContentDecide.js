import * as React from 'react';
import { TouchableOpacity, Text,Image, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation ,useRoute } from '@react-navigation/native';

export default function ContentDecide({submitEvent}) {
  const navigation = useNavigation();
  const routeInfo = useRoute();


    return (
      <View style={styles.container}>
      <TouchableOpacity style={styles.titleAreaBody}>
        <Text style={styles.label}>취소</Text>
      </TouchableOpacity>
      <View style={styles.div}></View>
        <TouchableOpacity style={styles.titleAreaBodyActive} onPress={submitEvent}>
        <Text style={styles.labelActive}>수정</Text>
        </TouchableOpacity>
      </View>
    );
  }
  

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor:"#F8F7F7",
    alignItems: "center",
    justifyContent: "center",
    marginTop:"20rem",
    marginBottom:"20rem",
  },
  div:{
    margin:"2%",
  },
  titleAreaBody:{
    width:"45%",
    height:"50.42rem",
    borderRadius:10,
    backgroundColor:"grey",
    alignItems: "center",
    justifyContent: "center",
  },
  titleAreaBodyActive:{
    width:"45%",
    height:"50.42rem",
    borderRadius:10,
    backgroundColor:"#66D8B9",
    alignItems: "center",
    justifyContent: "center",
  },
  label:{
    fontSize :"14rem",
    fontWeight:'bold',
    color:"white",
  },
  labelActive:{
    fontSize :"14rem",
    fontWeight:'bold',
    color:"white",
  },
  titleAddressPoint:{
    marginRight:"auto",
    left:"15rem",
  },

});

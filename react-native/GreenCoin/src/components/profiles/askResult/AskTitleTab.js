import * as React from 'react';
import { Text,Image, View, Dimensions,ScrollView,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';


export default function AskTitleTab({setSort}) {
  
const navigation = useNavigation();
    return (
      <View style={styles.container}>
            <TouchableOpacity style={styles.infoColum} onPress ={()=>{setSort(null)}}>
                <Text>전체</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.infoColum} onPress ={()=>{setSort(true)}}>
                <Text>답변</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.infoColum}  onPress ={()=>{setSort(false)}}>
                <Text>미답변</Text>
            </TouchableOpacity>
      </View>
    );
  }


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth:1,
    borderBottomColor :"#efefef",
    backgroundColor:"white",
  },
  infoColum:{
    width:"33%",
    height:"106.032rem",   
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth:1,
    borderRightColor :"#efefef",
  },
  lightLabel:{
    color:"#26CBFF",
  },


});
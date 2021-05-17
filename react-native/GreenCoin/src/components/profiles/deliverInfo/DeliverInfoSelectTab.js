import * as React from 'react';
import { Text,Image, View, Dimensions,ScrollView,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function DeliverInfoSelectTab({cancelLength , length,tabSelect,setTabSelect}) {
    return (
      <View style={styles.container}>
          <View style={styles.infoColum}>
            <TouchableOpacity style={styles.touchableOpacity} onPress ={()=>{setTabSelect(true)}}>
              <Text style={tabSelect ? styles.labelActive : styles.label}>주문/배송조회</Text>
              <Text style={tabSelect ? styles.labelActive : styles.label}>{ length > 0 ? `(${length})` : ""}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoColum}>
            <TouchableOpacity style={styles.touchableOpacity} onPress ={()=>{setTabSelect(false)}}>
              <Text style={tabSelect == false? styles.labelActive : styles.label}>취소/교환/반품조회</Text>
              <Text style={tabSelect ? styles.labelActive : styles.label}>{ cancelLength > 0 ? `(${cancelLength})` : ""}</Text>
            </TouchableOpacity>
          </View>
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
    width:"50%",
    height:"64.412rem",   
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth:1,
    borderRightColor :"#efefef",
  },
  lightLabel:{
    color:"#26CBFF",
  },
  touchableOpacity:{
    flexDirection: 'row',
  },
  label:{
    fontFamily:"NotoSansKR-Regular",
  },
  labelActive:{
    fontFamily:"NotoSansKR-Bold",
  },

});

import * as React from 'react';
import { Text, View, Dimensions, Platform, Alert } from 'react-native';
import CheckBox  from '@react-native-community/checkbox';

import EStyleSheet from 'react-native-extended-stylesheet';

export default function AbleCuponSearch({sort,clickUsedCouponOnly}) {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
            <CheckBox boxType="square" tintColors={{true:"#0D2141" ,false:"#D2D5DA"}} style={styles.checkbox} lineWidth={1}  value={sort} onChange={clickUsedCouponOnly}/>
            <Text style={styles.title}>사용가능한 쿠폰만 보기</Text>
        </View>
      </View>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    top:Platform.OS!='ios' ? "10rem" : 0,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    marginRight:"auto",
  },
  title:{
    fontFamily:"NotoSansKR-Regular",
    fontSize:Platform.OS!='ios' ? "15.855rem" : "14rem",
    color:"black",
  },
  contentContainer:{
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    marginRight:"auto",
    left:"14rem",
  },
  checkbox:{
    marginRight:"6rem",
  },


});
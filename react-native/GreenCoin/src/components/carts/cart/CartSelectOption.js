import React ,{useState}  from 'react';
import { TouchableOpacity,Text, View, Dimensions,ScrollView,StyleSheet ,FlatList} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import CheckBox  from '@react-native-community/checkbox';


export default function CartSelectOption({selectAll,deleteCartsItem, selectAllClick}) {

  const selectAllEvent = () =>{ selectAllClick(true); }
  const deleteCartsItemEvent = () =>{ deleteCartsItem(false); }

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.touchableOpacity} onPress={selectAllEvent}>
            <CheckBox boxType="square" tintColors={{true:"#0D2141" ,false:"#D2D5DA"}} style={styles.check} value={selectAll} onValueChange={selectAllEvent}/>
            <Text style={styles.left}>전체선택</Text>
        </TouchableOpacity>
        <View style={styles.paddingBox}></View>
        <TouchableOpacity style={styles.touchableOpacity} onPress={deleteCartsItemEvent}>
            <Text style={styles.right}>선택삭제</Text>
        </TouchableOpacity>
      </View>
    );
  }


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width :"100%",
    height :"59rem",
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"white",
  },
  touchableOpacity:{
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    width:"25%",
    paddingLeft:"14rem",
    paddingRight:"14rem",
    paddingTop:"4rem",
  },
  paddingBox:{
    width:"50%",
  },
  title:{
    fontFamily:"NotoSansKR-Bold",
    color:"#0D2141",
  },
  otherTitle:{
    fontFamily:"NotoSansKR-Regular",
    color:"#D2D5DA",
  },
  left:{ 
    marginRight:"auto",
  },
  right:{
    marginLeft:"auto",
  }
});
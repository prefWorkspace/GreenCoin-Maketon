import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';

export default function AskDetailSubmit({item,setIsModalVisible}) {
  const navigation = useNavigation();

  const editBoarderView = () =>{
    if(item.boardInfo.board_re_content == undefined)
      navigation.navigate("writeAsk",{root:item.root,productInfo:item.productInfo,boardInfo:item.boardInfo});
    else
      Alert.alert(" ","답변이 완료된 게시글은 수정할 수 없습니다.")
  }

    return (
      <View style={styles.container}>
          <View style={styles.itemContainer}>
              <TouchableOpacity style={styles.canceleBox} onPress={editBoarderView}>
                  <Text>수정</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.okayBox} onPress={()=>{setIsModalVisible(true)}}>
                  <Text style={styles.okay}>삭제</Text>
              </TouchableOpacity>
          </View>
      </View>
    );
  }


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom:"45rem",
    marginTop:"5rem",
  },
  itemContainer:{
    borderTopWidth:1,
    borderColor:"#F4F6F9",
    paddingTop:"30rem",
    width:"90%",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  canceleBox:{
    width:"72rem",
    height:"40rem",
    marginRight:"10rem",
    borderWidth: 1,
    borderRadius:5,
    alignItems: "center",
    justifyContent: "center",
  },  
  okayBox:{
    width:"72rem",
    height:"40rem",
    borderWidth: 1,
    borderRadius:5,
    backgroundColor:"#0D2141",
    alignItems: "center",
    justifyContent: "center",
  },
  okay:{
    color:"white",
  }
 

});

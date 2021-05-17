import React,{useState} from 'react';
import { Text, View, Dimensions,TouchableOpacity, Platform, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import registerServerController from '../../../server/registerServerController';
import CheckBox  from '@react-native-community/checkbox';

const leftData = ["상품 불만족","개인정보 누출 우려","서비스 불만족"];
const rightData = ["사생활 기록 삭제 우려","이용할 기능 부족","이벤트 등의 목적으로 한시 사용"];


export default function SelectDeleteReason({activeList,setActiveList}) {
    const [change,setChange] = useState(false);

    
    const changeState = (value ,index) =>{
      var templist = activeList;
      templist[index] =  value == null ? templist[index] : value;
      setActiveList(templist);
      setChange(!change);
    } 

    const Item = ({value,index}) =>{
        change; //지우지마세요 (for re-render)
        return (
                <TouchableOpacity style={styles.selectItem} onPress={()=>{changeState(null,index)}}> 
                   <CheckBox boxType="square" 
                    tintColors={{true:"#0D2141" ,false:"#D2D5DA"}}
                    style={styles.checkBox} 
                    value={activeList[index]} 
                    onValueChange={value=>{changeState(value,index)}}/>
                   <Text style={styles.selectLabel}>{value}</Text>
                </TouchableOpacity>
            )
    }


    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.labelContainer}>
              <Text style={styles.label}>탈퇴사유</Text>
          </View>
          <View style={styles.labelContainer}>
              <Text style={styles.sublabel}>용된다 탈퇴 사유를 선택해주세요 (복수 선택 가능)</Text>
          </View>
          <View style={styles.selectContainer}>
            <View style={styles.selectBody}>
              {
                leftData.map((value,index)=>{
                  return (<Item value={value} index={index}></Item>)
                })
              }
            </View>
            <View style={styles.selectRightBody}>
            {
              rightData.map((value,index)=>{
                  return (<Item value={value} index={index + 3}></Item>)
               })
            }
            </View>
          </View>
        </View>
       
      </View>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer:{  
    width:"86%",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    height:'59.457rem',
  },
  contentContainer:{
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
  },
  labelContainer:{
    width:"86%",
    justifyContent: "center",
    marginTop:"5rem",
  },
  label:{
    fontSize:"13rem",
    fontFamily:"NotoSansKR-Bold",
  },
  sublabel:{
    fontSize:"13rem",
    fontFamily:"NotoSansKR-Regular",
    bottom:"10rem",
  },
  inputBox:{
    width:"100%",
    height:"48.556rem",
    backgroundColor:"white",
    borderColor:"grey",
    borderWidth:1,
    borderRadius:5,
    width:"86%",
    paddingLeft:"10rem",
  },
  selectContainer:{
    flexDirection: 'row',
  },
  selectBody:{
    width:"50%",
    paddingLeft:"20rem",
  },
  selectItem:{
    flexDirection: 'row',
    alignItems: "center",
  },
  selectRightBody:{
    width:"50%",
    right:"20rem",
  },
  selectLabel:{
    color:"#878787",
    fontSize:"13rem",
    fontFamily:"NotoSansKR-Regular",
  },
  checkBox: Platform.OS == "ios" ? {
    width:"25rem",
    height:"25rem",
    margin:"5rem",
  } : {}

});
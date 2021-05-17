import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import MarginBox from '../../comm/MarginBox';

const Data = [
  {title:"사이즈"},
  {title:"S"},
  {title:"M"},
  {title:"L"},
  {title:"XL"},
  {title:"XS"},
];

export default  function ChangeSelectOption({placeholder , title}) {
    const [dropBox,setDropBox] = useState(false);
    const [size,setSize] = useState(0);

    const touchItemListByIndex = (index) =>{
      return (
          <TouchableOpacity style={styles.touchableOpacity} onPress={()=>{setDropBox(!dropBox); setSize(index)}}>
            <View style={styles.labelContainer}>
              <Text>{Data[index].title}</Text>
            </View>
          </TouchableOpacity>
      );
    }

    return (
      <View style={styles.container}>
          {
            title ?  
              <Text style={styles.title}>
              *변경하실 옵션 선택
              </Text>
              :
              null
          }
          <TouchableOpacity style={styles.itemContainer} onPress={()=>{setDropBox(!dropBox)}}>
            <View style={styles.touchableOpacity}>
              <View style={styles.labelContainer}>
                  <Text>{size == 0 ? placeholder : Data[size].title}</Text>
              </View>
              {
                  dropBox ?
                  <Image style={styles.image} source={require('../../../assets/img/label_point/dropUpPoint.png')}/>
                  :
                  <Image style={styles.image} source={require('../../../assets/img/label_point/dropDownPoint.png')}/>
              }
          </View>
          </TouchableOpacity>
          {
            dropBox?
            <ScrollView style={styles.dropItemContainer}>
              {touchItemListByIndex(1)}
              {touchItemListByIndex(2)}
              {touchItemListByIndex(3)}
              {touchItemListByIndex(4)}
              {touchItemListByIndex(5)}
              <MarginBox height={30}></MarginBox>
            </ScrollView>
            :
            null
          }
      </View>
    );
  }

//
//<Text style={styles.example}>asdsadas</Text>
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft:"20rem",
    paddingRight:"20rem",
    paddingTop:"10rem",
  },
  itemContainer:{
    width:"100%",
    height:"45rem",
    padding:"12rem",
    borderWidth:1,
    borderRadius:5,
    borderColor:"#E1E6ED",
  },
  dropItemContainer:{
    width:"100%",
    height:"100rem",
    padding:"12rem",
    borderRadius:5,
    borderColor:"#E1E6ED",
    borderRightWidth:1,
    borderLeftWidth:1,
    borderBottomWidth:1,
  },  
  touchableOpacity:{
    flexDirection: 'row',
    alignItems: "center",
    marginBottom:"8rem",
  },
  labelContainer:{
    width:"100rem",
    flexDirection: 'row',
  },
  label:{
    fontSize:"11.891rem",
    color:"black",
  },
  title:{
    color:"black",
    fontFamily:"NotoSansKR-Bold",
    marginRight:"auto",
  },
  image:{
    marginLeft:"auto",
  },
});

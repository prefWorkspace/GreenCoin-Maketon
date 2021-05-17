import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import MarginBox from '../../comm/MarginBox';


export default function DeliverModalSelectBox({size,setSize, placeholder}) {
    const [dropBox,setDropBox] = useState(false);

    const touchItemListByIndex = (index) =>{
      return (
          <TouchableOpacity style={styles.touchableOpacity} onPress={()=>{setDropBox(!dropBox); setSize(index)}}>
            <View style={styles.labelContainer}>
              <Text>aaaa</Text>
            </View>
          </TouchableOpacity>
      );
    }

    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.itemContainer} onPress={()=>{setDropBox(!dropBox)}}>
            <View style={styles.touchableOpacity}>
              <View style={styles.labelContainer}>
                  <Text>{size == 0 ? placeholder : "test"}</Text>
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
    marginBottom:"10rem",
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

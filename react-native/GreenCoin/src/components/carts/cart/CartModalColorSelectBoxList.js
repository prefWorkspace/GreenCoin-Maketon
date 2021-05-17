import React,{useState,useEffect}  from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import CartModalSizeSelectBox from './CartModalSizeSelectBox';

const Data = ['x','l','xl','s'];



export default function CartModalColorSelectBoxList({prd_id,title,options,reset,vaildateSetSelectItem}) {
  const [sizeList,setSizeList] = useState(options.sizeList);
  const [top,setTop] = useState(null);
  const [colorChange,setColorChange] = useState(false);




  useEffect(() => {if(colorChange == false){setColorChange(true);}}, [colorChange]);
  return (  
     <View style={styles.itemContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
        <CartModalSizeSelectBox zIndex={500}  reset={false} title={"컬러"} list={options.colorList} clickSelect={(e)=>{ setColorChange(false); setTop(e);}}/>
        <CartModalSizeSelectBox zIndex={200} reset={false} title={"사이즈"} list={top ? options.sizeList[top.label] : null} clickSelect={(e)=>{vaildateSetSelectItem(prd_id,options.product,top,e,options);}}/>
      </View>
    )
  }

//
//<Text style={styles.example}>asdsadas</Text>
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    marginBottom:"10rem",
    alignItems: "center", 
    justifyContent: "center",
  },
  itemContainer:{
    width:"100%",
    
  },
  titleContainer:{
    justifyContent: "center",
  },
  title:{
    fontSize:"15rem",
    fontFamily:"NotoSansKR-Regular",
  }
});

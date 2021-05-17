import React, {useState,useEffect} from 'react';
import {Image, Text, View,Dimensions,TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Modal from 'react-native-modal';
import DeliverModalSelectBox from './DeliverModalSelectBox';
import DeliverModalSelectItem from './DeliverModalSelectItem';
import DeliverModalDecideButton from './DeliverModalDecideButton';
import productOptionServerController from '../../../server/productOptionServerController';


function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export default function DeliverInfoModal({ modalItem ,isModalVisible , setModalVisible}) {

    if(modalItem == null)
      return null;

    var option = JSON.parse(modalItem.mog_option);
    
    const [count , setCount ] = useState(option.count); 
    const [size , setSize ] = useState(option.size); 
    const [color , setColor ] = useState(option.color); 
    const [sizelist , setSizeList ] = useState(option.size); 
    const [colorlist , setColorList ] = useState(option.color); 

    const callBack = (data) =>{
      var sizeList = [];
      var colorList = {};
      data.map((value)=>{
        if(colorList[value.po_value2] == undefined)
          sizeList.push(value.po_value2);
        if(colorList[value.po_value2] == undefined)
          colorList[value.po_value2] = [{color: value.po_value1, size : value.po_value2, inventory : value.po_inventory}];
        else
          colorList[value.po_value2].push({color: value.po_value1, size : value.po_value2, inventory : value.po_inventory});
      });
      setColorList(colorList);
      setSizeList(sizeList);
    }

    useEffect(() => {
      productOptionServerController.getProductOptionsDetailById(modalItem.prd_id,callBack);
    }, [modalItem])

    return (
      <Modal isVisible={isModalVisible} style={styles.modal}>
          <View style={styles.container}>
          <View style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                  <Image style={styles.image} source={require("../../../assets/img/sample/deliver.png")}></Image>
              </View>
              <View style={styles.labelContainer}>
                  <Text style={styles.title}>{modalItem.prd_title}</Text>
                  {/* <Text style={styles.price}>{numberWithCommas(modalItem.prd_price)}원</Text> */}
                  <Text style={styles.option}>배송비 2,500원</Text>
              </View>
          </View>
          <DeliverModalSelectBox list={colorlist} size={size} setSize={setSize} placeholder={"사이즈"}/>
          <DeliverModalSelectBox size={color} setSize={setColor} placeholder={"컬러"}/>
          <DeliverModalSelectItem option={option} count={count} setCount={setCount}/>
          <View style={styles.resultContainer}>
            <Text style={styles.result}>총 합계</Text>
            <Text style={styles.resultPrice}>{numberWithCommas(modalItem.prd_price * count)}원</Text>
          </View>
          <DeliverModalDecideButton setModalVisible={setModalVisible}/>
      </View>
      </Modal>
    );
  
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    height:"470rem",
    backgroundColor:"white",
    right:"19rem",
    position:"absolute",
    bottom:0,
    paddingLeft:"20rem",
    paddingRight:"20rem",
    borderRadius:10,
  },
  modal:{
    width:"100%",
    top:"20rem",
  },
  itemContainer:{
    height:"106.480rem",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    marginTop:"10rem",
  },
  imageContainer:{
    width:"35%",
    height:"100%",
    alignItems: "center",
    justifyContent: "center",
  },
  labelContainer:{
    width:"65%",
    height:"100%",
    right:"10rem",
  },  
  image:{
    width :"95rem",
    height :"95rem",
    marginRight:"auto",
  },
  title:{
    fontSize:"16.846rem",
    fontFamily:"NotoSansKR-Medium",
  },
  option:{
    fontSize:"12.882rem",
    fontFamily:"Poppins-Regular",
    color:"#A3A7AB",
    bottom:"7rem",
    marginTop:"auto",
  },
  price:{
    fontSize:"15.855rem",
    bottom:"10rem",
    fontFamily:"Montserrat-Medium",
  },
  resultContainer:{
    flexDirection: 'row',
    marginTop:"10rem",
    paddingLeft:"30rem",
    paddingRight:"30rem",
    alignItems: "center",
    justifyContent: "center",
  },
  result:{
    color:"#A3A7AB"
  },
  resultPrice:{
    marginLeft:"auto",
    fontFamily:"NotoSansKR-Medium",
  }
});
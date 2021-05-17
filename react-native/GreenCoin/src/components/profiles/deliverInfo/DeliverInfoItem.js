import React,{useState}  from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ModalContent from '../../comm/ModalContent';
import localStringData from '../../../const/localStringData';
import OrderStateBar from '../../comm/OrderStateBar';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function DeliverInfoItem({cancelItem,type,bottomOption,options,value,vBankbottomOption}) {
    const [modal,setModal] = useState(false);
    const [cancleModal,setCancleModal] = useState(false);

    if(!value.mog_option)
      return null;

    const mogOption = JSON.parse(value.mog_option);


    function calculateTotal(){
      var mogPrice  = Math.round(value.mog_total_price * ((value.mog_total_dis_price - value.txn_shipping) / (value.mog_price)));
        return numberWithCommas(mogPrice);
    }
  

  const getOptionText = () =>{
      var tagList = [];
      mogOption.data.map((value)=>{
        for(let key in value.options.optionList){
          let optionlist = value.options.optionList[key];
          let optionText = "";
          let optionPrice = 0;
          optionlist.map((opt,i)=>{
            optionPrice += opt.opt_price;
            optionText += "" + opt.opt_name + ( i + 1 == optionlist.length ?  " " :  " /");
          })

          optionText += (optionPrice > 0 ? `+${numberWithCommas(optionPrice)}원` : "") + ` ${value.count}개`;
          tagList.push(<Text style={styles.size}>{optionText}</Text>);
        }
      });
      return tagList;
  }

  const cancleVbankClick = () =>{
    setCancleModal(true);
  };
    const cancleClick = () =>{
      setModal(true);
    };

    const clickDelete = () =>{
      setModal(false);
      cancelItem(value);
    }

    const vbankCancle = () =>{
      setModal(false);
      options.firstOption(value);
    }

    return (
      <View style={styles.container}>
          <View style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                  <Image style={styles.image} source={{uri:localStringData.imagePath+ value.prd_img}}></Image>
              </View>
              <View style={styles.labelContainer}>
                <View style={styles.labelInner}>
                  <Text style={styles.title}>{value.prd_title}</Text>
                  {
                    getOptionText()
                  }
                  <Text style={styles.price}>{numberWithCommas(calculateTotal())}원</Text>
                </View>
              </View>
          </View>
          <View style={styles.bottomBorder}></View>
          <OrderStateBar value={value} type={type}></OrderStateBar>
          <View style={styles.bottomBorder}></View> 
          {
            vBankbottomOption ? 
            <View style={styles.itemOptionContainer}>
              <TouchableOpacity style={styles.itemOption} onPress={cancleVbankClick}>
                <Text style={styles.selectBox}>{"주문 취소"}</Text>
              </TouchableOpacity>  
              <TouchableOpacity style={[styles.itemOption,{borderWidth:0}]}/>
              <TouchableOpacity style={[styles.itemOption,{borderWidth:0}]}/>
            </View>
            :
            null
          }
          {
             bottomOption ?
            <View style={styles.itemOptionContainer}>
              <TouchableOpacity style={styles.itemOption} onPress={()=>{options.firstOption(value)}}>
                <Text style={styles.selectBox}>{bottomOption.option ? "옵션변경" : "교환신청"}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemOption} onPress={()=>{options.secondOption(value)}}>
                <Text style={styles.selectBox}>{bottomOption.option ? "배송지변경" : "반품신청"}</Text>
              </TouchableOpacity> 
              <TouchableOpacity style={styles.itemOptionCancel} onPress={()=>{options.thirdOption ? options.thirdOption(value) : cancleClick()}}>
                <Text style={styles.selectBoxPoint}>{bottomOption.option ? "주문취소" : "구매후기"}</Text>
              </TouchableOpacity>   
            </View>
          :
          null


          }
          

          <ModalContent submitClick={clickDelete} modalType={"CancelOrder"} bottomType={"select"} isModalVisible={modal} setIsModalVisible={setModal}></ModalContent>
          <ModalContent submitClick={vbankCancle} modalType={"CancelOrder"} bottomType={"select"} isModalVisible={cancleModal} setIsModalVisible={setCancleModal}></ModalContent>
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
    paddingTop:"14rem",
  },
  itemContainer:{
    width:"90%",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    marginBottom:"20rem",
  },
  imageContainer:{
    width:"40%",
    alignItems: "center",
    justifyContent: "center",
  },
  labelContainer:{
    width:"60%",
    paddingLeft:"10rem",
    right:"10rem",
    marginBottom:"20rem",
  },  
  labelInner:{

  },
  image:{
    width :"120rem",
    height :"120rem",
    marginRight:"auto",
  },
  title:{
    fontSize:"16.846rem",
    fontFamily:"NotoSansKR-Medium",
    bottom:"10rem",
  },
  option:{
    fontSize:"12.882rem",
    fontFamily:"Poppins-Regular",
    bottom:"18rem",
  },
  price:{
    fontSize:"15.855rem",
    fontFamily:"Montserrat-Medium",
    top:"10rem",
    marginTop:"auto",
  },
  bottomBorder:{
    width:"90%",
    borderBottomWidth:1,
    borderBottomColor :"#efefef",
    backgroundColor:"white",
  },
  state:{
    marginTop:"5rem",
    fontFamily:"NotoSansKR-Medium",
  },
  stateContainer:{
    width:"100%",
    paddingLeft:"20rem",
    paddingRight:"20rem",
    flexDirection: 'row',

  },
  left:{
    fontFamily:"NotoSansKR-Medium",
    color:"black",
    marginRight:"auto",
  },
  right:{
    fontFamily:"NotoSansKR-Medium",
    color:"#9FA6B2",
    marginLeft:"auto",
  },
  itemOptionContainer:{
    width:"100%",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    marginTop:"10rem",
    marginBottom:"10rem",
  },
  itemOption:{
    width:"29%",
    margin:"1%",
    height:"39.638rem",
    alignItems: "center",
    justifyContent: "center",
    borderWidth:1,
    borderRadius:30,
  },
  labelInner:{
    marginLeft:"4%",
    marginBottom:"auto",
  },
  itemOptionCancel:{
    width:"29%",
    margin:"1%",
    height:"39.638rem",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"#0D2141",
    borderWidth:1,
    borderRadius:30,
  },
  selectBoxPoint:{
    color:"white",
    fontSize:"13rem",
    fontFamily:"NotoSansKR-Medium",
  },
  selectBox:{
    fontSize:"13rem",
    fontFamily:"NotoSansKR-Medium",
  },


});

import React,{useState,useEffect} from 'react';
import { Text,Linking, View, Dimensions,ScrollView,StyleSheet, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar'

import ChangeItemInfo from '../../components/profiles/changeRequire/ChangeItemInfo';
import ChangeSelectOption from '../../components/profiles/changeRequire/ChangeSelectOption';
import ChangeWriteReason from '../../components/profiles/changeRequire/ChangeWriteReason';
import ChangeSelectReasonTag from '../../components/profiles/changeRequire/ChangeSelectReasonTag';
import ChangeSelectImage from '../../components/profiles/changeRequire/ChangeSelectImage';
import ChangeAbout from '../../components/profiles/changeRequire/ChangeAbout';
import ChangeDecideBox from '../../components/profiles/changeRequire/ChangeDecideBox';
import MarginBox from '../../components/comm/MarginBox';
import {navigationBackHandler , useNavigation} from '../../navigation/NavigationBackHandler';

import productServerController from '../../server/productServerController';
import orderSeverController from '../../server/orderSeverController';

import userInfoSingleton from '../../db/userInfoSingleton';

import DetailSetOption from '../../components/comm/itemDetail/DetailSetOption';
import DetailSelectedItem from '../../components/comm/itemDetail/DetailSelectedItem';
import CartModalColorSelectBoxList from '../../components/carts/cart/CartModalColorSelectBoxList'
import ModalContent from '../../components/comm/ModalContent';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export default function ChangeRequireScreen({route}) {

  const item = route.params.item;


  const navigation = useNavigation();

  const [content,setContent] =useState("");

  const [active,setActive] = useState(-1);

  const [imageList , setImageList] = useState([]);

  const [totalPrice,setTotalPrice] = useState(0);



  const [productInfo,setProductInfo] = useState(null);
  const [product,setProduct] = useState(null);
  const [optionList,setOptionList] = useState([]);
  const [selectList,setSelectList] = useState({});
  const [reqeust,setReqeust] = useState(false);



  const callBack = ((jsonData) => {
    setProduct(jsonData.product);
    setOptionList(jsonData.opt);
    setProductInfo(jsonData.productInfo);
  });
  
  useEffect(() => {   
    if(item.prd_id)
    productServerController.getProductDetailById(item.prd_id,callBack,function(){
        Alert.alert(" ","삭제 혹은 숨김 처리된 상품입니다.")
        navigation.goBack();
    });
  }, [route])    
  
  useEffect(() => { 
    if(selectList)
      setTotalPrice(calculatePrice(selectList));
  }, [selectList])    


  const requestCallBack = (data) =>{
    if(data == 1){
      Alert.alert(" ","요청 완료");
      navigation.goBack();
      navigation.goBack();
    }
    else
      Alert.alert(" ","요청 실패");
  }

  const cancleClick = () => { navigation.goBack(); }


  const calculatePrice = (list) =>{
    var totalPrice = 0;
    var count = 0;
    
    for(var key in list){
    var price = 0;
    var optionList = list[key].options.optionList;
    count++;
    for(var calKey in optionList){
      for(var i =0;i<	optionList[calKey].length ;i++){
        price += optionList[calKey][i].opt_price;
      }
    }

    if(list[key].options.isSetOptional == true || list[key].options.isOptional == false){
      price += Math.round((list[key].prd_price) - ((list[key].prd_price) * (list[key].prd_sale_rate)) / 100);
    }
      
    price *= list[key].count;
    totalPrice += price;
    }
    
    if(count > 0)
      totalPrice += item.txn_shipping;

    return totalPrice;
  }



  const changeClick = () => { 

    let mog_option = JSON.parse(item.mog_option);

    if(mog_option){
      if(calculatePrice(mog_option.data) != calculatePrice(selectList)){
        setReqeust(true);
        return;
      }
    }


      if(content.length  < 10 ){
        Alert.alert(" ","택스트를 10자이상 적어주세요")
        return;
      }

      var resultArray = [];
      for(var key in selectList){
        resultArray.push(selectList[key]);
     }

      let currentOption = {
        prd_id : product.prd_id, 
        prd_price : product.prd_price, 
        prd_sale_rate : product.prd_sale_rate, 
        prd_title : product.prd_title, 
        prd_img : product.prd_img, 
        count:1,
        data:resultArray};

        
      var formData = new FormData();
      formData.append("mem_id",userInfoSingleton.getInstance()._userId);
      formData.append("txn_id",item.txn_id);
      formData.append("txn_update_require", 57);
      formData.append("mog_order_status", 57);
      formData.append("txnu_memo", content);
      formData.append("txnu_type", active);
      formData.append("mog_idx", item.mog_idx);
      

      formData.append("mog_option",JSON.stringify(currentOption));

      var namelist = [];
      imageList.map((localImgData,index)=>{

        var regJpg = /(.*?)\.(jpg|jpeg)$/;
        var timestamp = new Date();
        var fileExtension = localImgData.path.match(regJpg) ? ".jpg" : ".png";
        var fileType = localImgData.path.match(regJpg) ? "image/jpg" : "image/png";
        var fileName = "orderRequest/" + userInfoSingleton.getInstance()._userId + index + timestamp.getTime() + fileExtension;
        var image = {  uri: localImgData.path, 
                       type: 'multipart/form-data', 
                       name: fileName, 
        };

        formData.append('file', image);
        namelist.push(fileName);
      });
   
      formData.append('txnu_file',namelist.toString());

      orderSeverController.updateTransactionOption(formData,requestCallBack);

  }
  

  const removeSelectItem = (key) =>{
    delete selectList[key];
    setSelectList(JSON.parse(JSON.stringify(selectList)));
  };

  const updateCount = (key, count) =>{
    selectList[key].count = count;
    setSelectList(JSON.parse(JSON.stringify(selectList)));
    setTotalPrice(calculatePrice(selectList));
  }


const GetSelectList = () =>{ 
  var selectItemList = [];

  for(var key in selectList){
      var price = 0;
      var optionList = selectList[key].options.optionList;
      
      for(var calKey in optionList){
        for(var i =0;i<	optionList[calKey].length ;i++){
          price += optionList[calKey][i].opt_price;
        }
      }

    if(selectList[key].options.isSetOptional == true || selectList[key].options.isOptional == false){
      price += Math.round((selectList[key].prd_price) - ((selectList[key].prd_price) * (selectList[key].prd_sale_rate)) / 100);
    }
    price *= selectList[key].count;
    selectItemList.push(
      <DetailSelectedItem 
        title={selectList[key].prd_title}
        item={selectList[key].options}
        count={selectList[key].count}
        price={Math.round(price)}
        index={key}
        updateCount={updateCount}
        removeSelectItem={removeSelectItem}
    />
    )
  }
  return selectItemList;
}
  
const checkSetProductValidation = (opt) =>{
   
  let options = opt.options;

  for(let key  in selectList){
    if(JSON.stringify(selectList[key].options) == JSON.stringify(options)){
        Alert.alert(" ","이미 선택된 옵션입니다.");
        return;
    }
 }


  var selectOption = JSON.parse(JSON.stringify(selectList));
  var date_id = new Date().getTime().toString();
  selectOption[date_id] = opt;
  setSelectList(selectOption);
}

if(!product || !productInfo || !optionList)
  return <View></View>

    return (
      <ScrollView style={styles.container}>
        <CommonTitleBar title={"교환요청"} leftOption={"back"}></CommonTitleBar>
        <MarginBox height={60} backgroundColor={"white"} title={"교환 사유를 입력해주세요."} customStyle={{borderBottomWidth:1, borderBottomColor:"#F4F6F9"}}></MarginBox>
        <ChangeItemInfo item={item}/>
        <View style={styles.selectContainer}> 
        <View style={{zIndex:3000}}>
            <DetailSetOption  
                product={product}
                productInfo={productInfo}
                checkSetProductValidation={checkSetProductValidation} 
                optionList={optionList} 
            />
            {
              selectList? <GetSelectList/> : null
            }
            <View style={[styles.resultContainer,{zIndex:0}]}>
              <Text style={styles.result}>총 합계</Text>
              <Text style={styles.resultPrice}>{numberWithCommas(totalPrice)}원</Text>
            </View>
          </View>
        </View>
        <ChangeSelectReasonTag active={active} setActive={setActive}/>
        <ChangeWriteReason setContent={setContent}/>
        <ChangeSelectImage imageList={imageList} setImageList={setImageList}/>
        <MarginBox height={5} backgroundColor={"#F4F6F9"} marginTop={30} marginBottom={10}></MarginBox>
        <ChangeAbout/>
        <ChangeDecideBox cancleClick={cancleClick} changeClick={changeClick}/>
        <ModalContent 
          modalType={"productKakao"} 
          bottomType={"select"} 
          isModalVisible={reqeust} 
          setIsModalVisible={setReqeust} 
          submitClick={()=>{  Linking.openURL('https://pf.kakao.com/_dexmSK');}}>
        </ModalContent>
      </ScrollView>
    );
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

const c = StyleSheet.create({
  
})
const styles = EStyleSheet.create({
  container: {
    width :"100%",
    height:"100%",
    backgroundColor:"white",
  },
  selectContainer:{
    zIndex:3000,
    paddingTop:"20rem",
    paddingLeft:"20rem",
    paddingRight:"20rem",
  },
  form:{ 
    width:"100%",  
    justifyContent: "flex-start",
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor:"white",
    marginBottom:"40rem",
    marginTop:"20rem",    
    justifyContent: "center",
    alignItems: "center",
  },
  label:{
    left:"8rem",
  },
  clear:{
    margin:"3.5rem",
    width :"155.877rem",
    height:"56.316rem",
    fontSize:"14.864rem",
    textAlign: "center",
    backgroundColor:"#DFE1E8",
    borderRadius:100,
    paddingVertical: "6.5rem",
    fontFamily:"NotoSansKR-Medium",
    color:"#FFFFFF"
  }, 
  submit:{
    margin:"3.5rem",
    width :"155.877rem",
    height:"56.316rem",
    fontSize:"14.864rem",
    textAlign: "center",
    backgroundColor:"#0D2141",
    borderRadius:100,
    paddingVertical: "6.5rem",
    fontFamily:"NotoSansKR-Medium",
    color:"#FFFFFF"
  },
  hr:{
    padding:"15rem",
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
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
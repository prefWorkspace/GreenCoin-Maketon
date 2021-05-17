import React,{useState,useEffect, useCallback,useRef } from 'react';
import { BackHandler , View, ScrollView,Dimensions,Alert , TouchableOpacity,Image} from 'react-native';


import DetailSelectReviewOrAsk from '../components/comm/itemDetail/DetailSelectReviewOrAsk';
import DetailSimlierItem from '../components/comm/itemDetail/DetailSimlierItem';
import DetailReviewList from '../components/comm/itemDetail/review/DetailReviewList';
import DetailAskList from '../components/comm/itemDetail/DetailAsk/DetailAskList';
import DetailBottomNav from '../components/comm/itemDetail/DetailBottomNav';
import DetailSelectProcess from '../components/comm/itemDetail/DetailSelectProcess';

import EStyleSheet from 'react-native-extended-stylesheet';
import {StackActions,useNavigation} from '@react-navigation/native';
import productServerController from '../server/productServerController';
import boardServerController from '../server/boardServerController';
import reviewServerController from '../server/reviewServerController';
import MarginBox from '../components/comm/MarginBox';
import cartPreviousController from '../db/realm/cartPreviousController';

import cartServerController from '../server/cartServerController';
import userInfoSingleton from '../db/userInfoSingleton';
import localStringData from '../const/localStringData';
import ItemDetailOptionModal from '../components/comm/itemDetail/ItemDetailOptionModal';

import { WebView } from 'react-native-webview';
import ModalContent from '../components/comm/ModalContent';

export default function ItemDetailScreen({navigation,route}){

  
  const [isLoad , setIsLoad] = useState(false);
  const [productInfo,setProductInfo] = useState(null);
  const [product,setProduct] = useState(null);
  const [optionList,setOptionList] = useState([]);
  const [reviewList,setReviewList] = useState([]);
  const [relativeProductList,setRelativeProductList] = useState([]);
  const [reviewCount,setReviewCount] = useState(0);
  const [boardList,setBoardList] = useState([]);
  const [boardCount,setBoardCount] = useState(0);
  const [bottomNav,setBottomNav] = useState(false);
  const [selectList,setSelectList] = useState({});
  const [reserve,setReserve] = useState(null);
  const [ship,setShipping] = useState(0);
  const [webViewHeight,setWebViewHeight] = useState(100);
  const [modal,setModal] = useState(false);
  const [totalPrice,setTotalPrice] = useState(0);
  const [scroll ,setScroll] = useState(true);
  const [isModalVisible,setIsModalVisible] =useState(false);
  const [heightInfo,setHeightInfo] = useState({});

  const scrollRef = useRef();

  const popAction = StackActions.pop(1);

  const onAndroidBackPress = () => {
    if(route.params && route.params.root == "main"){
      navigation.dispatch(popAction);
      navigation.goBack();
    }
    else
      navigation.dispatch(popAction);
  
    return true;
  };

  const updatePreviousProductList = useCallback((product) => {
    if(product == null) 
      return;
    var state = {
      src: product.prd_img, 
      prd_id : product.prd_id,
      prd_title : product.prd_title,
      prd_price: product.prd_price,
      prd_sale_rate : product.prd_sale_rate,
      prd_list_price : product.prd_list_price,
    };
    cartPreviousController.setPreviousProduct(state);
   },
  )

  useEffect(() => {
    updatePreviousProductList(product);
  }, [product])

  
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress',onAndroidBackPress);
    };
  }, []); 

  useEffect(() => {
    setIsLoad(false);
    productServerController.getProductDetailById(route.params.id,callBack,function(){
      Alert.alert(" ","삭제 혹은 숨김 처리된 상품입니다.")
      navigation.goBack();
    });
  }, [route])


  const callBack = useCallback((jsonData) => {
        setProduct(jsonData.product);
        setOptionList(jsonData.opt);
        setProductInfo(jsonData.productInfo);
        setReviewList(jsonData.reviewList);
        setReviewCount(jsonData.reviewCount);
        setBoardList(jsonData.boardList);
        setBoardCount(jsonData.boardCount);
        setRelativeProductList(jsonData.relativeProductList ? jsonData.relativeProductList : []);
        setIsLoad(true);
        setShipping(jsonData.shipPrice);
        setReserve(jsonData.reserve);
  });


    const checkScrollHeight = (ev) =>{

      // console.log(ev.nativeEvent.contentSize.height);
      // console.log(reviewTag.current);


      if(heightInfo.scroll != ev.nativeEvent.contentSize.height)
        setHeightInfo(e => { e.scroll = ev.nativeEvent.contentSize.height; return e;})
      
      if(ev.nativeEvent.contentOffset.y > 1300 && bottomNav == false){
        setBottomNav(true);
      }
      else if(ev.nativeEvent.contentOffset.y < 1300 && bottomNav == true){
        setBottomNav(false);
      } 
     }

     
   const cartCallBack = (data)=>{

      if(data == 1){
        navigation.reset({index: 0, routes: [{ name: 'cart' }],});
        setIsModalVisible(true);
      }
      else
      Alert.alert(" ","다시 시도해주세요");
   }


   const moveToCartPage = () =>{
    setIsModalVisible(false);
    navigation.navigate("cart",{root:"main",type:0});
   }

   const cartClick = () =>{

    
    if(userInfoSingleton.getInstance()._isLogin != true){
      navigation.navigate("selectLoginOrRegister",{root:"main"});
      return true;
    } 

    var essenceSelectArray = product.prd_additional5.split(',');

    var count = 0;
    for(let key in selectList){
      if(selectList[key].options.isOptional == false && essenceSelectArray.indexOf(String(selectList[key].prd_id)) != -1){
        count++;
      }
      else if(selectList[key].options.isOptional == false && selectList[key].prd_id == product.prd_id)
        count++;
    }
    
    if(count == 0){
      Alert.alert(" ","필수 상품을 선택해주세요");
      return false;
    }
    

    var formData = new FormData();
	    
    var resultArray = [];
    for(var key in selectList){
      resultArray.push(selectList[key]);
   }
   
    formData.append("option",JSON.stringify({
      prd_id : product.prd_id, 
      prd_price : product.prd_price, 
      prd_sale_rate : product.prd_sale_rate, 
      prd_title : product.prd_title, 
      prd_img :product.prd_img,
      count:1,
      data:resultArray
    }));
    formData.append("mem_id",userInfoSingleton.getInstance()._userId);
    formData.append("prd_id",product.prd_id);

    cartServerController.inserCarttItemListToCart(formData,cartCallBack);
    return true;
  };

  const purchaseClick = () =>{

    if(userInfoSingleton.getInstance()._isLogin != true){
      navigation.navigate("selectLoginOrRegister",{root:"main"});
      return true;
    } 
    else if(selectList.length == 0){
      Alert.alert(" ","상품을 선택해주세요");
      return false;
    }
    else
    {

      var essenceSelectArray = product.prd_additional5.split(',');

      var count = 0;
      for(let key in selectList){
        if(selectList[key].options.isOptional == false && selectList[key].options.isSetOptional == false && essenceSelectArray.indexOf(String(selectList[key].prd_id)) != -1){
          count++;
        }
      }
      var resultArray = [];
      for(var key in selectList){
        resultArray.push(selectList[key]);
     }


     if(resultArray.length == 0){
      Alert.alert(" ","상품을 선택해주세요");
      return false;
    }

      navigation.goBack();
      navigation.navigate("cartOrderItem",{productlist:[{
        prd_id : product.prd_id, 
        prd_price : product.prd_price, 
        prd_sale_rate : product.prd_sale_rate, 
        prd_title : product.prd_title, 
        prd_img :product.prd_img,
        cart_items:{
          prd_id : product.prd_id, 
          prd_price : product.prd_price, 
          prd_sale_rate : product.prd_sale_rate, 
          prd_title : product.prd_title, 
          prd_img :product.prd_img,
          count:1,
          data:resultArray
        }
      }]});
      return true;
    }
  };


  const moveToReview = () =>{
    console.log(heightInfo);
    scrollRef.current.scrollTo(heightInfo.container + heightInfo.reviewY);
    //scrollRef.current.scrollTo(5000);
  }

  const moveToAsk = () =>{
    scrollRef.current.scrollTo(heightInfo.container + (heightInfo.askY ));
  }

    const updateReviewList = (data)=>{  setReviewList(reviewList.concat(data));  }

    const updateBoardList = (data)=>{  setBoardList(boardList.concat(data));  }

    const moreReview = ()=>{
      reviewServerController.getReviewListByIdAndOffset(route.params.id,reviewList.length,updateReviewList);
    }

    const moreBoard = () =>{ boardServerController.getBoardListByIdAndOffset(route.params.id,boardList.length,updateBoardList);}
     
    const onWebViewMessage = (event) => {
      if(event.nativeEvent.data)
        setWebViewHeight(Number(event.nativeEvent.data));
    }


    if(!productInfo)
      return <View></View>;

    return (
        <View >  
          <View style={styles.container}>
          <ScrollView ref={scrollRef} onScroll={(ev)=>{ checkScrollHeight(ev)}}  scrollEnabled={scroll}>
            <View>
              <DetailSelectProcess 
                scroll={scroll}
                setScroll={setScroll}
                productInfo={productInfo} 
                selectList={selectList} 
                setSelectList={setSelectList} 
                optionList={optionList} 
                cartClick={cartClick}
                purchaseClick={purchaseClick}
                product={product}
                reserve={reserve}
                ship={ship}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
                setModal={setModal}
              />
              <DetailSelectReviewOrAsk 
                  reviewCount={reviewCount} 
                  boardCount={boardCount}
                  moveToAsk={moveToAsk}
                  moveToReview={moveToReview}
                  setHeightInfo={setHeightInfo}
              />
            </View>
            <View>
              <ScrollView  contentContainerStyle={{flexGrow: 1, height : webViewHeight}}>
                <WebView
                    source={{ uri: `${localStringData.webIp}shopdetail/mobile/${product.prd_id}` }}
                    bounces={true}
                    scrollEnabled={false}
                    onMessage={onWebViewMessage}
                    injectedJavaScript="window.ReactNativeWebView.postMessage(Math.max(document.body.offsetHeight, document.body.scrollHeight));"
                    style={styles.content}
                    // onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
                    />
              </ScrollView>
            </View>
            <DetailSimlierItem relativeProductList={relativeProductList}/>
            <View onLayout={(event) => {
                  var {x, y, width, height} = event.nativeEvent.layout;
                  setHeightInfo(e => { e.container = y;   return e;});
                }}
              >
              <View 
                onLayout={(event) => {
                  var {x, y, width, height} = event.nativeEvent.layout;
                  setHeightInfo(e => { e.review = height;  e.reviewY = y; return e;});
                }}
              >
                <DetailSelectReviewOrAsk 
                  reviewCount={reviewCount} 
                  boardCount={boardCount} 
                  reviewActive={true}
                  moveToAsk={moveToAsk}
                  moveToReview={moveToReview}
                  />
                <DetailReviewList moreView={moreReview} count={reviewCount} reviewList={reviewList} productInfo={product}/>
              </View>
         
              <View onLayout={(event)=>{
                  var {x, y, width, height} = event.nativeEvent.layout;
                  setHeightInfo(e => { e.ask = height;   e.askY = y;  return e;});
              }}>
                <DetailSelectReviewOrAsk 
                  reviewCount={reviewCount} 
                  boardCount={boardCount} 
                  askActive={true}
                  moveToAsk={moveToAsk}
                  moveToReview={moveToReview}
                />
                <DetailAskList moreView={moreBoard} count={boardCount} boardList={boardList} productInfo={product}/>
              </View>
            </View>
         
            <MarginBox height={40}></MarginBox>
        </ScrollView>

          </View>
        {
          bottomNav?
          <DetailBottomNav 
            cartClick={()=>{setModal({type:true,event:"cart"})}}
            purchaseClick={()=>{setModal({type:true,event:"purchase"})}}
          />
          :
          null
          // <TouchableOpacity style={styles.imageContainer} onPress={moveToCart}>
          //   <Image style={styles.image} source={require('../assets/img/shop/cart.png')}></Image>
          // </TouchableOpacity>
        }
        <TouchableOpacity style={styles.BackHandler} onPress={()=>{navigation.goBack()}}>
            <Image source={require('../assets/img/label_point/leftClickPoint.png')}></Image>
        </TouchableOpacity>
        <ItemDetailOptionModal 
          cartClick={cartClick}
          purchaseClick={purchaseClick}
          shipping={10000}
          modalItem={{}} 
          product={product}
          productInfo={productInfo}
          optionList={optionList}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
          modal={modal} 
          setModal={setModal}
          setSelectList={setSelectList}
          selectList={selectList}
          />
          <ModalContent bottomType={"select"} submitClick={moveToCartPage} modalType={"CartAdd"} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} ></ModalContent>
        </View>
    )
}


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width:"100%",
    height:"100%",
    backgroundColor:"white",
    borderRadius:10,
  },
  BackHandler:{
    position: 'absolute',
    height: "40rem",
    width: "40rem",
    backgroundColor:"white",
    borderRadius:100,
    left:"5%",
    top:"2%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer:{
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left:"75%",
    top:"78%",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  content: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  webView:{
    width:"100%",
    height:10000,
    opacity:0.90,
  }


});
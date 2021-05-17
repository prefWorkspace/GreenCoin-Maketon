import React,{useState,useEffect} from 'react';
import { Text, View, ScrollView,Dimensions, BackHandler} from 'react-native';

import CommonTitleBar from '../../components/comm/CommonTitleBar'
import ShopSelectAllTextBar from '../../components/shops/shop/ShopSelectAllTextBar'
import ShopTopTitleSelectList from '../../components/shops/shop/ShopTopTitleSelectList'
import ShopSelectorListView from '../../components/shops/shop/ShopSelectorListView';
import ShopGoodsList from '../../components/shops/shop/ShopGoodsList';
import ShopSubTitleList from '../../components/shops/shop/ShopSubTitleList';
import ShopHotItemList from '../../components/shops/shop/ShopHotItemList';
import EStyleSheet from 'react-native-extended-stylesheet';
import productApi from '../../server/productServerController';
import {navigationBackHandler} from '../../navigation/NavigationBackHandler';


import Loading from '../Loading';
import userInfoSingleton from '../../db/userInfoSingleton';
import appStaticInfomation from '../../db/appStaticInfomation';
import MarginBox from '../../components/comm/MarginBox';
import OrderFindBar from '../../components/comm/OrderFindBar';

const { height } = Dimensions.get('window');
export default function ShopScreen({route}){

    var params = route.params;
    var appInfo = appStaticInfomation.getInstance();

    const [load,setLoad] = useState(false);
    const [loadList,setLoadList] = useState(true);
    const [category,setCategory] = useState([params.cat_name,params.cat_id]);
    const [subCategory,setSubCategory] = useState(-1);
    const [itemList,setItemList] = useState([]);
    const [hotItemList,setHotItemList] = useState([]);
    const [categoriesList,setCategoriesList] = useState(appInfo._categorieslist);
    const [subCategoriesList,setSubCategoriesList] = useState(appInfo._subCategoriesList);
    const [itemCount,setItemCount] = useState(0);
    const [filterSearch,setFilterSearch] = useState(false);

    useEffect(() => {
      setLoad(false);
      setLoadList(true);
      setCategoryEvent([params.cat_name,params.cat_id]);
      initShopList(initFormData());
    }, [route])

  const createFormdata =(length , isTrue) =>{
    var formData = new FormData();

    if(isTrue ? isTrue : filterSearch){
      formData.append('benefit',userInfoSingleton.getInstance()._benefit ==  false ? 0 : 1);
      formData.append('sortType',userInfoSingleton.getInstance()._sortType);
      formData.append('price_min',userInfoSingleton.getInstance()._price_min);
      formData.append('price_max',userInfoSingleton.getInstance()._price_max);
      formData.append('sale_min',userInfoSingleton.getInstance()._sale_min);
      formData.append('sale_max',userInfoSingleton.getInstance()._sale_max);
    }
  
    formData.append('count',length == 0 ? length : itemList.length);
    formData.append('cat_id',category[1]);
    formData.append('mem_id',userInfoSingleton.getInstance()._userId);

    if(subCategory != -1 && subCategoriesList[category[1]]){
      formData.append('sub_categories',subCategoriesList[category[1]][subCategory].brn_id);
    }
    return formData;
  }

  const initFormData = () =>{

    var formData = new FormData();
    formData.append('mem_id',userInfoSingleton.getInstance()._userId);
    formData.append('count',0);
    formData.append('cat_id',category[1]);
    formData.append('sortType',0);

    if(subCategory != -1 && subCategoriesList[category[1]]){
      formData.append('sub_categories',subCategoriesList[category[1]][subCategory].brn_id);
    }

    return formData;
  }

  const applyFilter =(isTrue)=>{
    setFilterSearch(isTrue);
    productApi.getShoplistInitSetting(createFormdata(0,isTrue),updateInitItemList);
  }

  const initShopList =(formData)=>{
    productApi.getShoplistInitSetting(formData,updateInitItemList);
  }

  const updateCategoryShoList =(formData)=>{
    productApi.getFilterInitItemList(formData,updateInitItemList);
  }

  const updateShopList =(formData)=>{
    productApi.getFilterItemList(formData,updateItemList);
  }


  const updateInitItemList=(data)=>{
    var updataArray = {load : true,itemCount : data.itemCount};

    if(data.itemCount == 0 && data.itemList.length == 0){
      updataArray.itemList = [];
      updataArray.hotItemList = [];
    }
    else{
      var tempList = itemList.concat(data.itemList);
      updataArray.itemList = tempList;
      updataArray.hotItemList = data.hitList;
    }

    setLoad(updataArray.load);
    setItemCount(updataArray.itemCount);
    setItemList(data.itemList);
    setHotItemList(data.hitList ? data.hitList : []);

  }

  const updateItemList=(data)=>{
      if(data && data.length == 0)
        setLoadList(false);

      var tempList = itemList.concat(data);
      setLoad(true);
      setLoadList(true);
      setItemList(tempList);

  }

  const setCategoryEvent=(item)=>{
    setLoad(false);
    if(item)
    setCategory(item);
    setSubCategory(-1);
    setItemList([]);
    setHotItemList([]);
    setFilterSearch(false);
    setLoadList(true);
  }

  const setSubCategoryEvent=(item)=>{
    setLoad(false);
    setSubCategory(item);
    setItemList([]);
    setHotItemList([]);
    setFilterSearch(false);
    setLoadList(true);
  }

  const  scrollEvent = (e)=>{
    var paddingToBottom = 700;
    paddingToBottom += e.nativeEvent.layoutMeasurement.height;
    
    if (loadList && e.nativeEvent.contentOffset.y + paddingToBottom >= e.nativeEvent.contentSize.height) {
        updateShopList(createFormdata());
    }
  }

  if(load == false && itemList.length == 0){
      updateCategoryShoList(initFormData());
  }

 
    return (
      <View style={{width:"100%",height:"100%", backgroundColor:"white"}}>
        <CommonTitleBar leftOption={"back"} title={category[0]}/>
        <ShopTopTitleSelectList categoriesList={categoriesList} category={category} setCategory={setCategoryEvent}/>
        <ShopSubTitleList  subCategoriesList={subCategoriesList}  subCategory={subCategory} setSubCategory={setSubCategoryEvent} category={category}/>
        <ScrollView 
          style={styles.container} 
          onScroll={scrollEvent}
          >
          {
            load ? 
              <View>
              {
                category[0] != "전체보기" ?
                <ShopHotItemList hotItemList={hotItemList}/>
                :
                null
              }
              <ShopGoodsList 
                applyFilter={applyFilter} 
                category={category} 
                itemCount={itemCount} 
                itemList={itemList}/>
            </View>
            :
            <Loading/>
          }
          <MarginBox height={50}></MarginBox>
        </ScrollView>
        <OrderFindBar></OrderFindBar>
    </View>
    );
}
  


const styles = EStyleSheet.create({
  container:{
    height:"100%",
    backgroundColor:"white",
    
  },
  marginBox:{
    height :"59rem",
  },


});

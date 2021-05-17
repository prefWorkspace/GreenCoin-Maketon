import React,{useState,useEffect}  from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import DetailSetOptionSelectBox from './DetailSetOptionSelectBox';
import DetailOptionBox from './DetailOptionBox';


function numberWithCommas(x) { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}



export default function DetailSetOption({relative,product,productInfo,optionList,checkSetProductValidation}) {
  const [options,setOptions] = useState(null);
  const [reset,setReset] = useState(false);
  const [keepOptionList,setKeepOptionList] = useState({});
  var optionalSelectArray = product.prd_additional4.split(',');
  var essenceSelectArray = product.prd_additional5.split(',');
  
  function createOptionObject(){
    var o = {};
    for(var i =0;i<optionList.length;i++)
       o[optionList[i].prd_id] ? o[optionList[i].prd_id].push(optionList[i]) : o[optionList[i].prd_id] = [optionList[i]];
    return o;
  }

  function getProductById(key){
    for(var i =0;i<productInfo.length;i++)
      if(productInfo[i].prd_id == key)
        return productInfo[i];
    return null;
  }
  

  useEffect(() => { 
    if(optionList)
     setOptions(createOptionObject());
  }, [optionList])

  useEffect(() => { 
    if(reset)
      setReset(false);
  }, [reset])

  

  const createSelectedItem = (list,isOptional,isSetOptional) =>{
    let optInfo = {optionList:{},optId:[]};
    let result = {};

    for(let pKey in list){
        for(let key in list[pKey]){

          if(key == 0)
            continue;

          let prd = null;
          if(isSetOptional == false)
            prd = product;
          else
            prd = getProductById(list[pKey][key].option.prd_id);
            
          let curProduct = getProductById(list[pKey][key].option.prd_id);

          var op = {
              opt_id:     list[pKey][key].option.opt_id, 
              opt_title:  list[pKey][key].option.opt_title, 
              opt_name :  list[pKey][key].option.opt_name, 
              opt_price : list[pKey][key].option.opt_price,
              prd_title : prd.prd_title,
              prd_id : prd.prd_id,
              prd_title : curProduct.prd_title
            //  product : product
          };
        
          
          optInfo.product = {
            prd_id : prd.prd_id,
            prd_sale_rate : prd.prd_sale_rate,
            prd_price : prd.prd_price
          };
          
          result = {
              prd_id : prd.prd_id, 
              prd_img : prd.prd_img, 
              prd_price : prd.prd_price,
              prd_sale_rate : prd.prd_sale_rate,
              prd_title : prd.prd_title,
              count : 1
            }
          
          optInfo.optionList[list[pKey][key].option.prd_id] ? 
          optInfo.optionList[list[pKey][key].option.prd_id].push(op)
          :
          optInfo.optionList[list[pKey][key].option.prd_id] = [op];
          optInfo.optId.push(list[pKey][key].option.opt_id);
      }  
    }
    
    optInfo.isOptional = isOptional;
    optInfo.isSetOptional = isSetOptional;

    result.options  = optInfo;
    checkSetProductValidation(result);
    setReset(true);
  }

  

  const vaildateSetSelectItem = (option) =>{
    let list = JSON.parse(JSON.stringify(keepOptionList));
    if(optionalSelectArray.indexOf(String(option[1].option.prd_id)) == -1){
      list[option[1].option.prd_id] = option;
      setKeepOptionList(list);
    }
    else if(optionalSelectArray.indexOf(String(option[1].option.prd_id)) != -1){
      createSelectedItem({item: option},false,false);
      setKeepOptionList({});
    }

    let count =0;
    let checkVaildItemCount = 0;
    for(let key in options){
      let prd = getProductById(options[key][0].prd_id);
      if(optionalSelectArray.indexOf(String(prd.prd_id)) != -1)
        continue;
        count++;
    }

    for(let key in list){
      if(optionalSelectArray.indexOf(String(list[key][1].option.prd_id)) == -1){
        checkVaildItemCount++;
      }
    }
    
    if(checkVaildItemCount == count){
      createSelectedItem(list,false,count == 1 ? false : true);
      setKeepOptionList({});
    }

  }
  function getOptionRelateList(){
    var opt = {};
    for(var i =0;i<optionList.length;i++){
      opt[optionList[i].opt_relate_id] ? opt[optionList[i].opt_relate_id].push(optionList[i]) : opt[optionList[i].opt_relate_id] = [optionList[i]];
    }
    return opt;
  }
  


   const createOptionTagList = () =>{

      
    if(product.prd_soldout != 1){
      return <Text style={styles.title}>품절 상품입니다.</Text>;
    }

      var renderList = [];
      var count =  1;
      let optionMap = getOptionRelateList();

      for(let key in options){
        let prd = getProductById(options[key][0].prd_id);
        if(prd == null)
          return null;
        count++;
        
        if(optionalSelectArray.indexOf(String(prd.prd_id)) != -1)
          continue;

        renderList.push(
          <DetailOptionBox 
          relative={relative} zIndex={40000 / count} isSet={essenceSelectArray.length > 0} title={prd.prd_title} options={options[key]} type={0} vaildateSetSelectItem={vaildateSetSelectItem}
          />
        );
      }

      for(let key in options){
        let prd = getProductById(options[key][0].prd_id);
        if(prd == null)
          return null;
        count++;
        
        if(optionalSelectArray.indexOf(String(prd.prd_id)) == -1)
          continue;
          
        renderList.push(
          <DetailOptionBox 
          relative={relative}  zIndex={40000 / count} isSet={essenceSelectArray.length > 0} title={"[선택 옵션] " + prd.prd_title} options={options[key]} type={0} vaildateSetSelectItem={vaildateSetSelectItem}
          />
        );
      }


      for(let key in options){
        let ontionalCount = 0;
        let optionalList = {};
        for(var i =0;i<options[key].length;i++){
          if(options[key][i].opt_type == 1){
            ontionalCount++;
            optionalList[options[key][i].opt_title] ? 
            optionalList[options[key][i].opt_title].push(options[key][i])
            : 
            optionalList[options[key][i].opt_title] = [options[key][i]];
          }
        }

        if(ontionalCount == 0)
          continue;
        
        renderList.push(
          <DetailOptionBox 
          relative={relative}  zIndex={40000 / count} isSet={false} title={"선택옵션"} options={{}} type={0} vaildateSetSelectItem={vaildateSetSelectItem}
          />
        ); 

        for(let k in optionalList){
          count++;
          let list = [];
          for(var i =0;i < optionalList[k].length; i++){
              let soldout = !optionMap[optionalList[k][i].opt_id] && optionalList[k][i].opt_inventory == 0 ? true : false;
              list.push({
                idx:0, 
                option: optionalList[k][i], 
                label:  (soldout ? " 품절 " + optionalList[k][i].opt_name : optionalList[k][i].opt_name + (optionalList[k][i].opt_price > 0 ? " + " + numberWithCommas(optionalList[k][i].opt_price) + "원" : "")),
                soldout : soldout
              });
          }

          renderList.push(
            <View style={styles.itemContainer}>
              <DetailSetOptionSelectBox  
              relative={relative} 
                zIndex={40000 / count} 
                title={k} 
                list={list} 
                clickSelect={(e)=>{ 
                  
                  if(e.soldout){
                    return false;
                  }
                  createSelectedItem({item:{1:{opt_id: e.option.opt_id,option: e.option}}},true,false);
                  return true;
                }}
              />
            </View>
          );
        }
    }


      var sum = 0;

      for(var i =0;i<optionList.length;i++){
        sum += optionList[i].opt_inventory;
      }

      if(sum == 0){
        return <Text style={styles.title}>품절 상품입니다.</Text>;
      }

      return renderList; //renderList.length == 0 ? <Text style={styles.title}>품절 상품입니다.</Text> : renderList;
   }

    return ( 
    <View style={styles.container}>
      {
        reset ?
        null
        :
        createOptionTagList()
      }
    </View> )
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
    justifyContent: "center"
  },
  itemContainer:{
    width:"92%",
  },
  titleContainer:{
    justifyContent: "center",
  },
  title:{
    fontSize:"15rem",
    fontFamily:"NotoSansKR-Regular",
  },
});

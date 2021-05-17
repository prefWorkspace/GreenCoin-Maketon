import React,{useState,useEffect}  from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import MarginBox from '../../comm/MarginBox';
import DetailSetOptionSelectBox from './DetailSetOptionSelectBox';


function numberWithCommas(x) { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}






export default function DetailOptionBox({zIndex,relative ,isSet ,title,options,vaildateSetSelectItem ,type}) {

    const [indexList,setIndexList] = useState({});

    function indexHelper(){
      let firstIndex = {opt_id : 0, option : null};
      let count = 0;
      let idxList = {};
      while(true){
        var curOption = null;
        
        for(var i =0;i<options.length;i++){
          if(options[i].opt_relate_id == firstIndex.opt_id && options[i].opt_type == type){
            curOption = options[i];
            break;
          }
        }

        if(curOption == null){
          setIndexList(idxList);
          return;
        }

        idxList[count] = firstIndex;
        count++;
        firstIndex = {opt_id : curOption.opt_id, option : null};
      }
    }

    useEffect(() => {
      indexHelper();
    },[]);
    

    function getOptionRelateList(){
      var optionList = {};
      for(var i =0;i<options.length;i++){
        optionList[options[i].opt_relate_id] ? optionList[options[i].opt_relate_id].push(options[i]) : optionList[options[i].opt_relate_id] = [options[i]];
      }
      return optionList;
    }
    

    function initSelectTag(){
      let optionMap = getOptionRelateList();
      let idx = 0;
      let firstIndex = indexList[idx];
      let result = [];

      while(true){
        var curOption = null;
        
        if(firstIndex == null){
          return result;
        }

        for(var i =0;i<options.length;i++){
          if(options[i].opt_relate_id == firstIndex.opt_id && options[i].opt_type == type){
            curOption = options[i];
            break;
          }
        }

        if(curOption == null){
          return result;
        }
      
        let list = [];
        for(var i =0;i < options.length; i++){
          if(options[i].opt_relate_id == curOption.opt_relate_id && options[i].opt_type == type){


            let soldout = !optionMap[options[i].opt_id] && options[i].opt_inventory == 0 ? true : false;
            list.push({
              idx:idx + 1, 
              option: options[i], 
              label:  (soldout ? " 품절 " + options[i].opt_name : options[i].opt_name + (options[i].opt_price > 0 ? " + " + numberWithCommas(options[i].opt_price) + "원" : "")),
              soldout : soldout
            });
          }
        }
        
          zIndex -= 2000;
          result.push(
            <DetailSetOptionSelectBox 
              relative={relative}
              zIndex={zIndex} 
              title={curOption.opt_title} 
              list={idx == 0 || indexList[idx].option ? list : null} 
              clickSelect={(e)=>{ 
                
                if(e.soldout){
                  return false;
                }

                let il = JSON.parse(JSON.stringify(indexList));
                let c = e.idx;
                il[c] = {opt_id: e.option.opt_id,option: e.option};

                let checkDone = 0;
                for(var i =0;i<options.length;i++){
                  if(options[i].opt_relate_id == il[c].opt_id && options[i].opt_type == type){
                    checkDone++;
                  }
                }

                if(checkDone == 0){
                  vaildateSetSelectItem(il);
                }

                while(il[c + 1]){
                  for(var i =0;i<options.length;i++){
                    if(options[i].opt_relate_id == il[c].opt_id && options[i].opt_type == type){
                      il[c + 1] = {opt_id: options[i].opt_id, option: null};
                      break;
                    }
                  }
                  c++;
                }

                
                setIndexList(il);
                return true;
              }}
            />
          );

          firstIndex = indexList[++idx];
      }

    }

    return (  
      <View style={[styles.itemContainer]}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {/* {
            isSet ? 
            <View style={styles.setTitleContainer}>
              {
                 //options.product.prd_sale_rate > 0 ? 
                 <View style={styles.titleContainer}>
                   <Text style={styles.originalPrice}>{numberWithCommas("1000")}원</Text>
                   <Text style={styles.salePrice}> {numberWithCommas("2000")}%</Text>
                 </View>
                 //:
                 //null
              }
              { <Text style={styles.price}>{numberWithCommas(Math.round(options.product.price - (options.product.price * options.product.prd_sale_rate / 100)))}원</Text> }
            </View>
          :
          null
          } */}
         
        </View>
          {
            initSelectTag()
          }
        {/* <DetailSetOptionSelectBox zIndex={zIndex + 100} reset={reset} title={"컬러"} list={options.colorList} clickSelect={(e)=>{setColorChange(false); setTop(e);}}/>
        <DetailSetOptionSelectBox  zIndex={zIndex} reset={reset} title={"사이즈"} list={top ? options.sizeList[top.label] : null} clickSelect={(e)=>{vaildateSetSelectItem(prd_id,options,top,e);}}/> */}
      </View>
    )
  }

//
//<Text style={styles.example}>asdsadas</Text>
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    backgroundColor:"white",
    width:"100%",
    marginBottom:"40rem",
    alignItems: "center", 
    justifyContent: "center",
  },
  itemContainer:{
    width:"92%",
  },
  titleContainer:{
    alignItems: "center", 
    justifyContent: "center",
    flexDirection: 'row',
  },
  setTitleContainer:{
    alignItems: "center", 
    justifyContent: "center",
    flexDirection: 'row',
    marginLeft:"auto",
  },
  title:{
    fontSize:"15rem",
    fontFamily:"NotoSansKR-Regular",
    marginRight:"auto",
  },
  price:{
    color:"black",
    fontSize:"14rem",
    marginRight:"auto",
  },
  salePrice:{
    color:"black",
    fontSize:"14rem",
    marginRight:"10rem",
    color:"#26CBFF",
  },
  originalPrice:{
    color:"#878787",
    fontSize:"14rem",
    marginRight:"auto",
    textDecorationLine:"line-through",
  },
});

import React,{useState,useEffect}  from 'react';
import { Text,Image, View, Dimensions,TextInput,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import WriteReviewSize from './WriteReviewSize';
import WriteReviewHeightAndWeight from './WriteReviewHeightAndWeight';
import WriteReviewRegulerSize from './WriteReviewRegulerSize';
import WriteReviewInputBox from './WriteReviewInputBox';


export default function WriteReviewSizeInfo({sizeResult,setSizeResult,updateUserWeightAndHeight}) {

 

    const [openSize,setOpenSize] = useState(false);
    
    /*
    const updateData =()=> {
      setSizeResult({
          sizeInfo:sizeInfo,
          sizeOpinion:sizeOpinion,
          weight:weight,
          height:height,
          currentSize:currentSize
      })};

   // useEffect(() => { updateData(); }, [openSize])
    useEffect(() => { updateData(); }, [sizeInfo])
    useEffect(() => { updateData(); }, [sizeOpinion])
    useEffect(() => { updateData(); }, [weight])
    useEffect(() => { updateData(); }, [height])
    useEffect(() => { updateData(); }, [currentSize])
  */
    const updateSizeResult = (index ,data)=>{
      setSizeResult({
        sizeInfo:    index == 0 ? data : sizeResult.sizeInfo,
        sizeOpinion: index == 1 ? data : sizeResult.sizeOpinion,
        weight:      index == 2 ? data : sizeResult.weight,
        height:      index == 3 ? data : sizeResult.height,
        currentSize: index == 4 ? data : sizeResult.currentSize
    })};

    const updateSizeOpinion = (data) =>{ updateSizeResult(1 , data);}

    const setHeight = (data) =>{ updateSizeResult(3 , data);}
    
    const setWeight = (data) =>{ updateSizeResult(2 , data);}

    const setCurrentSize = (data) =>{ updateSizeResult( 4 , data);}

    const setSizeInfo = (data) =>{ updateSizeResult( 0 , data);}
    
    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.touchableOpacity} onPress={()=>{setOpenSize(!openSize)}}>
              <Text style={styles.title}>사이즈는 어때요?</Text>
              {
                  openSize ?
                  <Image style={styles.image} source={require('../../../../assets/img/label_point/dropUpPoint.png')}></Image>
                  :
                  <Image style={styles.image} source={require('../../../../assets/img/label_point/dropDownPoint.png')}></Image>
                  
              }
          </TouchableOpacity>
          {
            openSize?
            <View style={styles.itemContainer}>
            <WriteReviewSize sizeInfo={sizeResult.sizeInfo} setSizeInfo={setSizeInfo}></WriteReviewSize>
            <WriteReviewInputBox 
              title={"사이즈 한줄평"}
              placeholder={"사이즈 한줄평 입력"}
              onChangeText={updateSizeOpinion}
              text={sizeResult.sizeOpinion}
            ></WriteReviewInputBox>
            <WriteReviewHeightAndWeight
              sizeResult={sizeResult}
              setHeight={setHeight}
              setWeight={setWeight}
              updateUserWeightAndHeight={updateUserWeightAndHeight}
            />
            <WriteReviewRegulerSize currentSize={sizeResult.currentSize} setCurrentSize={setCurrentSize}/>
            </View>
            :
            null
          }
           {
            /*
            <WriteReviewInputBox 
            title={"키"}
            placeholder={"키 입력"}
            onChangeText={setSizeOpinion}
          ></WriteReviewInputBox>
              <WriteReviewInputBox 
            title={"몸무게"}
            placeholder={"몸무게 입력"}
            onChangeText={setSizeOpinion}
          ></WriteReviewInputBox>
            */
          }
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
    padding :"20rem",
  },
  itemContainer:{
    width:"100%",
    marginTop:"5rem",
  },
  inputTitle:{
    width:"100%",
    borderWidth:1,
    borderColor:"#E1E6ED",
    borderRadius:5,
    padding:"10rem",
    fontSize:"12.882rem",
  },
  title:{
    color:"black",
    fontFamily:"NotoSansKR-Bold",
    marginRight:"auto",
  },
  touchableOpacity:{
    width:"100%",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  image:{
    marginLeft:"auto",
  },


});

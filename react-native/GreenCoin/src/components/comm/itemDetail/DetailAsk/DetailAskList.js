import  React from 'react';
import { View, Dimensions, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import DetailAskItem from './DetailAskItem';
import DetailAskReply from './DetailAskReply';
import DetailListController from '../DetailListController';
import MarginBox from '../../MarginBox';
import userInfoSingleton from '../../../../db/userInfoSingleton';
import { useNavigation ,useRoute } from '@react-navigation/native';
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function DetailAskList({count,boardList,productInfo,moreView}){
  const navigation = useNavigation();

  const routeInfo = useRoute();
  

  const moveToWriteAskPage = () =>{ 
    if(userInfoSingleton.getInstance()._isLogin != true){
      navigation.navigate("selectLoginOrRegister",{root:routeInfo.name});
      return;
    }
    navigation.navigate("writeAsk",{root:routeInfo.name,productInfo:productInfo,root:"itemDetail"});
  }

  
  return (
    <View style={styles.container}>
        {
          boardList.map((item,index)=>{
            return (
              <View>
                <DetailAskItem index={count-index}item={item} productInfo={productInfo}/>
                {
                  item.board_re_content != null ?
                    <DetailAskReply></DetailAskReply>
                    :
                    null
                }
              </View>
            )
              
          })
          // <DetailAskReply></DetailAskReply>
        }
         <MarginBox height={110}/>
        <DetailListController 
          active={ count != boardList.length }  
          writeTitle={"문의하기"} 
          writeEvent={moveToWriteAskPage} 
          moreView={moreView} />
        <MarginBox height={110}/>
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    width:"100%",
    alignItems: "center",
    justifyContent :"center",
  },
}); 
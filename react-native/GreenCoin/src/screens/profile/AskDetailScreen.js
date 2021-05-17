import React,{useState,useEffect} from 'react';
import { Text, ScrollView, Dimensions, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar';

import AskSelectedItem from '../../components/profiles/askDetail/AskSelectedItem';
import AskTitleInfo from '../../components/profiles/askDetail/AskTitleInfo';
import AskContent from '../../components/profiles/askDetail/AskContent';
import AskDetailSubmit from '../../components/profiles/askDetail/AskDetailSubmit';
import AskReply from '../../components/profiles/askDetail/AskReply';
import ModalContent from '../../components/comm/ModalContent';
import {navigationBackHandler,useNavigation} from '../../navigation/NavigationBackHandler';



export default function AskDetailScreen({route}) {

  const [boardInfo,setBoardInfo]   = useState(route.params.boardInfo);
  const [productInfo,setProductInfo]   = useState(route.params.productInfo);
  const [boardReply,setBoardReply]   = useState(boardInfo.board_re_content);
  const navigation = useNavigation();
  const [isModalVisible,setIsModalVisible] =useState(false);
  navigationBackHandler(route.params.root);
 

  useEffect(() => {
    setBoardInfo(route.params.boardInfo);
    setProductInfo(route.params.productInfo);
    setBoardReply(route.params.boardInfo.board_re_content);

  }, [route.params])

  const leftClick = ()=>{navigation.navigate(route.params.root);}

  const submitClick = () =>{
    setIsModalVisible(true);
  }

    return (
      <ScrollView style={styles.container}>
        <CommonTitleBar title={"문의내역"} leftOption={"back"} leftClick={leftClick}/>
        <AskSelectedItem productInfo={productInfo} state={boardReply ? true : false}/>
        <AskTitleInfo 
          title={boardInfo.board_title} 
          name={boardInfo.board_user} 
          date={boardInfo.board_date} 
          view={boardInfo.board_view}
        />
        <AskContent content={boardInfo.board_content}/>
        {
          boardReply ?
            <AskReply boardReply={boardReply}/>
            :
            null
        }
        <AskDetailSubmit item={route.params} setIsModalVisible={setIsModalVisible}/>
        <ModalContent modalType={"Delete"} bottomType={"select"} submitClick={submitClick} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>
      </ScrollView>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    backgroundColor:"white",
  },
  height:{
    height:"100rem",
  }
});
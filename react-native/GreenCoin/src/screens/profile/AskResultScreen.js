import  React,{useState,useEffect} from 'react';
import { Text, BackHandler, Dimensions, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CommonTitleBar from '../../components/comm/CommonTitleBar';
import MyInfo from '../../components/profiles/profile/MyInfo';
import AskTitleTab from '../../components/profiles/askResult/AskTitleTab';
import AskItem from '../../components/profiles/askResult/AskItem';
import { ScrollView } from 'react-native-gesture-handler';
import {navigationBackHandler} from '../../navigation/NavigationBackHandler';
import boardServerController from '../../server/boardServerController';
import userInfoSingleton from '../../db/userInfoSingleton';

export default function AskResultScreen() {

  const [sort,setSort] = useState(null);
  const [boardList,setBoardList] = useState([]);

  const callBack = (data)=>{
    setBoardList(data);
  }

  useEffect(() => {
    boardServerController.getBoardListByUserId(userInfoSingleton.getInstance()._userId,callBack);
  }, []);

  navigationBackHandler();

    return (
      <ScrollView style={styles.container}>
        <CommonTitleBar title={"문의내역"} leftOption={"back"}></CommonTitleBar>
        <AskTitleTab setSort={setSort}></AskTitleTab>
        {
          boardList.length != 0 ?
          boardList.map((value)=>{
            if(sort == null || sort == (value.board_re_content == undefined ? false :true))
            return  <AskItem state={value.board_re_content == undefined ? false : true} item={value}></AskItem>
          })
          :
          null
        }
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
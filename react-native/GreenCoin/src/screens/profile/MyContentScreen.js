import React,{useState,useEffect} from 'react';
import { View, ScrollView, Dimensions, Alert, Text, CheckBox} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import MyInfo from '../../components/profiles/profile/MyInfo';
import ProfileContent from '../../components/profiles/profile/ProfileContent';
import {navigationBackHandler} from '../../navigation/NavigationBackHandler';
import { useNavigation} from '@react-navigation/native';
import userInfoSingleton from '../../db/userInfoSingleton';
import MainTitle from '../../components/mains/main/MainTitle';
import CommunityDetailTitle from "../../components/community/communityDetail/CommunityDetailTitle";
import CommonDetailTitle from '../../components/comm/CommonDetailTitle';
import MyContentDecide from '../../components/profiles/myContent/MyContentDecide';
import ModalCommon from '../../components/comm/ModalCommon';
import serverController from '../../server/serverController';
import DateText from '../../components/commonsjh/dateText';

export default function MyContentScreen({route}) {
  
  const [show, setShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [list, setList] = useState([
    {
      content:"testestsetset",
      date:"2020-22-22",
    },
    {
      content:"testestsetset",
      date:"2020-22-22",
    },
    {
      content:"testestsetset",
      date:"2020-22-22",
    },
    {
      content:"testestsetset",
      date:"2020-22-22",
    },
    {
      content:"testestsetset",
      date:"2020-22-22",
    }
  ]);
  const [checkList, setCheckList] = useState([]);

    // 초기 글 업데이트
    useEffect(() => {
      updateList();
    }, [])
    
    // 글 업데이트
    const updateList = () => {
      serverController.connectFetchController(`/posts?user_no=${userInfoSingleton.getInstance()._no}`,"GET",null,function(res){
        if(res.success==1){
          setList(res.data.posts);
        }
      },function(err){console.log(err);});
    }

    // 삭제 모달 열기
    const deleteEvent = () =>{ 
      setShow(true);
    }

    const editEvent = () =>{ 
    }

    // 체크박스  체크
    const onPressCheck = (value) => {
      let newArr = checkList;
      newArr.push(value.no);
      setCheckList([...newArr]);
    }

    // 글 삭제 
    const onClickDelete = () => {
      let data = {
        token : userInfoSingleton.getInstance()._token,
      }
      checkList.map(item => {
        serverController.connectFetchController(`/posts/${item}`,"DELETE",JSON.stringify(data),function(res){
          if(res.success==1){
            updateList();
            setShow(false);
          }
        },function(err){console.log(err);});
      })
    }

    // 글
    const Item = ({value}) =>{
      return (
        <View style={styles.contentContainer}>
          <View  style={styles.content}>
            <CheckBox style={styles.checkbox} value={checkList.some(item => item == value.no)} onValueChange={() => onPressCheck(value)}/>
            <Text style={styles.left}>{value.content}</Text>
            <Text  style={styles.right}>{DateText(new Date(value.create_date), ".")}</Text>
          </View>
          <View  style={styles.hr}/>
        </View>
      )
    }

    return (
      <View  style={styles.container}>
        <MainTitle></MainTitle>
        <CommonDetailTitle title={"내 글보기"}/>
        <ScrollView>
          {
            list.map((value)=>{
              return  <Item value={value}/> 
            })
          }
          <MyContentDecide editEvent={editEvent} deleteEvent={deleteEvent}/>
        </ScrollView>
        <ModalCommon submitClick={() => onClickDelete()} isModalVisible={show} setIsModalVisible={setShow} title={"선택하신 작성글을 삭제하시겠습니까?"} bottomType={"select"}/>
        <ModalCommon isModalVisible={deleteShow} setIsModalVisible={setDeleteShow} title={"성공적으로 삭제가 완료되었습니다."}/>
      </View>
    );
  }


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    backgroundColor:"white",
    height:"100%",
  },
  contentContainer:{
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
    padding:"5rem",
  },
  content:{
    width:"100%",
    flexDirection:"row",
    alignItems: "center",
    justifyContent: "center",
  },
  hr:{
    width:"98%",
    borderBottomWidth:1.5,
    borderBottomColor:"#E6E6E6",
    paddingBottom:"5rem",
  },
  left:{
    marginRight:"auto",
  },
  right:{
    marginLeft:"auto",
  },
  checkbox:{
    width:"25rem",
    height:"25rem",
    marginRight:"10rem",
  },
  currentTop:{
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-between",
  },
  currentTitle:{
    fontSize :"15rem",
  },
  changeText:{
    fontSize :"13rem",
    color:"#D68C01",
    width:"111rem",
    height:"28rem",
    backgroundColor:"#FFF7E8",
    lineHeight:"28rem",
    borderWidth:"1rem",
    borderColor:"#CD8E31",
    borderRadius:"14rem",
    textAlign:"center",
  },
  crtCoin:{
    fontSize :"29rem",
    color:"#66D8B9",
  },
  tableTitle:{
    display: "flex",
    flexDirection:"row",
    marginVertical:"20rem",
    marginHorizontal:"20rem",
  },
  pigIcon:{
    width: "22rem",
    height: "22rem",
    marginRight:"10rem",
  },
});
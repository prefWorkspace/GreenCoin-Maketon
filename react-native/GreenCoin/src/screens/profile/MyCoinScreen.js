import React,{useState,useEffect} from 'react';
import { View, ScrollView, Dimensions, Alert, Text, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import MyInfo from '../../components/profiles/profile/MyInfo';
import ProfileContent from '../../components/profiles/profile/ProfileContent';
import {navigationBackHandler} from '../../navigation/NavigationBackHandler';
import { useNavigation} from '@react-navigation/native';
import userInfoSingleton from '../../db/userInfoSingleton';
import MainTitle from '../../components/mains/main/MainTitle';
import CommunityDetailTitle from "../../components/community/communityDetail/CommunityDetailTitle";
import CommonDetailTitle from '../../components/comm/CommonDetailTitle';

export default function MyCoinScreen({route}) {
    const navigation = useNavigation();
    const userName = userInfoSingleton.getInstance()._userName;
    navigationBackHandler("main");
    const [currentCoin, setCurrentCoin] = useState(0);
    const [historyData, setHistoryData] = useState([]);
    const [isHistory, setIsHistory] = useState(false);

    useEffect(() => {
      setHistoryData([
        {date:"2020.00.00", price:150, desc:"적립", current:550},
        {date:"2020.00.00", price:150, desc:"적립", current:400},
        {date:"2020.00.00", price:-5000, desc:"지역화폐 교환", current:250},
        {date:"2020.00.00", price:250, desc:"적립", current:5250},
      ]);
    }, [])

    useEffect(() => {
      if(historyData.length !== 0){
        setIsHistory(true);
      }
    }, [historyData])

    return (
      <View  style={styles.container}>
        <MainTitle></MainTitle>
        <CommonDetailTitle title={"내 그린코인"}></CommonDetailTitle>
        <ScrollView>
          <View style={styles.currentArea}>
            <View style={styles.currentTop}>
              <Text style={styles.currentTitle}>보유 그린코인:</Text>
              <Text style={styles.changeText}>지역 화폐로 교환</Text>
            </View>

            <Text style={styles.crtCoin}>{currentCoin} 코인</Text>
          </View>

          <View style={styles.tableTitle}>
            <Image  style={styles.pigIcon} source={require('../../img/pig.png')}/>
            <Text style={styles.title}>나의 그린코인 적립 및 지역 화폐 전환 내역</Text>
          </View>

          <View style={styles.historyTable}>
            <View style={styles.titleWrap}>
              <Text style={styles.tableTitleText}>날짜</Text>
              <Text style={styles.tableTitleText}>금액</Text>
              <Text style={styles.tableTitleText}>내용</Text>
              <Text style={styles.tableTitleText}>보유 코인 잔액</Text>
            </View>

            {
              isHistory?
              <>     
                {
                  historyData.map((item, index) => {
                    return(
                      <View style={styles.contentWrap}>
                        <Text style={[styles.tableContent, styles.grey]}>{item.date}</Text>
                        <Text style={styles.tableContent}>{item.price} 코인</Text>
                        <Text style={[styles.tableContent, item.desc == "지역화폐 교환"?styles.orange:styles.green]}>{item.desc}</Text>
                        <Text style={styles.tableContent}>{item.current} 코인</Text>
                      </View>
                    )
                  })
                }
              </>
              :
              <Text style={styles.noCoinText}>그린코인 적립 및 지역 화폐 전환 내역이 없습니다.</Text>
            }

          </View>
         
         </ScrollView>
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
  currentArea:{
    paddingHorizontal:"28rem",
    paddingVertical:"28rem",
    borderBottomWidth:"13rem",
    borderColor:"#F8F7F7",
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
  title:{
  },
  historyTable:{
  },
  grey:{
    color:"#959595",
  },
  green:{
    color:"#00C386",
  },
  orange:{
    color:"#D68C01",
  },

  noCoinText:{
    width: "100%",
    marginTop:"45rem",
    textAlign:"center",
    color:"#959595",
    fontSize:"12rem"
  },
  titleWrap:{
    height: "36rem",
    backgroundColor:"#F8F7F7",
    display: "flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
  },
  tableTitleText:{
    width:"25%",
    textAlign:"center",
    fontSize:"12rem",
  },
  contentWrap:{
    width:"100%",
    height: "35rem",
    display: "flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-around",
    borderBottomWidth:"1rem",
    borderColor:"#E6E6E6",
  },
  tableContent:{
    width:"25%",
    textAlign:"center",
    fontSize:"12rem",
    color:"#505050",
  },

});
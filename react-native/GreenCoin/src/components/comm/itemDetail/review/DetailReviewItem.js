import * as React from 'react';
import { Text,Image, View, Dimensions,ScrollView,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import DetailReviewTitle from './DetailReviewTitle';
import DetailReviewInfo from './DetailReviewInfo';
import DetailContent from './DetailContent';
import DetailReviewImageList from './DetailReviewImageList';
import DetailReply from './DetailReply';
import DetailHelp from './DetailHelp';
import { useNavigation } from '@react-navigation/native';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default function DetailReviewItem({item}){
  const navigation = useNavigation();
  const moveReviewDetailScreen = ()=>{
    navigation.navigate("reviewDetail",{root:"itemDetail",id:item.rev_id});
  }

  return (
    <View style={styles.container}>
      <DetailReviewTitle item={item}/>
      <DetailReviewInfo item={item}/>
      <DetailContent 
        content={item.rev_content} 
        moveReviewDetailScreen={moveReviewDetailScreen}
      />
      {
        item.rev_photo > 0 ? 
        <DetailReviewImageList/>
        :
        null
      }
      <DetailHelp item={item}/>
      {
        item.rev_content_reply != null?
        <DetailReply 
          content={item.rev_content_reply} 
          date={item.rev_content_reply_date} 
          moveReviewDetailScreen={moveReviewDetailScreen}
        />
        :
        null
      }
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
    width:"100%",
    padding:"20rem",
    alignItems: "center",
    justifyContent :"center",
  },
});
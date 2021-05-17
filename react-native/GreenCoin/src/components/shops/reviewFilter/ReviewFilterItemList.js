import * as React from 'react';
import { Text,Image, View, Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ReviewFilterItem from '../reviewFilter/ReviewFilterItem';


export default function ReviewFilterItemList({itemList}) {
    return (
      <View style={styles.container} >
        <View style={styles.titleContainer}>
          {
            itemList.map((item)=>{
              return  <ReviewFilterItem item={item}></ReviewFilterItem>
            })
          }
        </View>
      </View>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    width: '100%',
    marginTop:"12rem",   
  },
  titleContainer:{
    padding:"20rem",
    justifyContent: "center",
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor:"white",
  },
  titleLabelContainer:{
    marginRight:"auto",
    justifyContent: 'flex-end',
    bottom:"13.5rem"
  },
  title:{
    fontSize:"17.837rem",
    fontFamily:"NotoSansKR-Bold",
  },
  flatlistContainer:{
    width:"100%",
    height:"100%",
  }
});
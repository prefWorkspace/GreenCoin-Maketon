import React , {useState} from 'react';
import { Text, View, Dimensions,TouchableOpacity,Image,CheckBox ,TextInput} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

const RenderItem = ({item})=>{
  return (
    <View style={styles.renderContainer}>
      <Text style={styles.renderTitle}>{item.title}</Text>
      <Text style={styles.renderSubtitle}>- {numberWithCommas(item.subtitle)}원</Text>
    </View>
    )
}

function numberWithCommas(x) {return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}

export default function CartOrderResultPriceContent({title,titleActive, subtitle,contentActive, subContent,content ,detailList,payContent ,contentColor}){
  return (
    <View style={styles.container}>
        <View style={styles.labelContainer}>
          <View  style={styles.titleContainer}>
            <Text style={titleActive ? styles.titleActive : styles.title}>{title}</Text>
            <Text style={styles.subTitle}>{subtitle}</Text>
            {
              content ?
              <Text style={styles.subContent}>{subContent}
              {
                content != "empty" ?
                  content == "배송비 무료" || content == "무료" ?
                  <Text style={contentActive ? styles.contentActive:styles.content}>{content}</Text>
                  :
                  <Text style={[contentActive ? styles.contentActive:styles.content,contentColor ? {color :"red"} :  {}]}>{numberWithCommas(content)}원</Text>
                :
                null
              }
              </Text>
              :
              <Text style={styles.subContent}>사용불가</Text>
            }
            {
              payContent ?
              <Text style={contentActive ? styles.contentActive:styles.content}>{payContent}</Text>
              :
              null
            }
          </View>
          {
            detailList ?
            detailList.map((item)=>{
              return item.title && item.subtitle ? 
              <RenderItem item={item}></RenderItem>
              :
              null
            })
            :
            null
          }
        </View>
    </View>
  )
};


const styles = EStyleSheet.create({
  container:{
  },
  title:{
    fontFamily:"NotoSansKR-Bold",
    color:"#000000",
    fontSize:"17rem",
    marginRight:"auto",
  },
  titleRight:{
    marginLeft:"auto",    
    color:"#000000",
    fontSize:"17rem",
  },
  titleActive:{
    color:"#000000",
    fontSize:"14rem",
    marginRight:"auto",
  },
  title:{
    color:"#878787",
    fontSize:"14rem",
    marginRight:"auto",
  },
  subTitle:{
    color:"#000000",
    fontSize:"14rem",
    marginRight:"50rem",
  },
  subContent:{
    marginLeft:"auto",  
    color:"#878787",
    fontSize:"14rem",
  },
  contentActive:{
    marginLeft:"auto",    
    color:"#26CBFF",
    fontSize:"14rem",
  },
  content:{
    marginLeft:"auto",    
    color:"#000000",
    fontSize:"14rem",
  },
  titleContainer:{
    width:"100%",
    justifyContent: "center",
    flexDirection: 'row',
  },
  labelContainer:{
    width:"100%",
    borderBottomWidth:1,
    borderColor:"#D2D5DA",
    paddingTop:"20rem",
    paddingBottom:"20rem",
  },
  label:{
    fontFamily:"NotoSansKR-Medium",
    color:"black",
    fontSize:"16rem",
  },
  labelPoint:{
    fontFamily:"NotoSansKR-Medium",
    color:"#26CBFF",
    fontSize:"16rem",
  },
  renderContainer:{
    flexDirection: 'row',
    marginTop:"10rem",
  },
  renderSubtitle:{
    color:"#878787",
    fontSize:"14rem",
  },
  renderTitle:{
    color:"#878787",
    fontSize:"14rem",
    marginRight:"auto",
    marginLeft:"17.8rem",
  }

});
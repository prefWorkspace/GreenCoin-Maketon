import React,{useState,useEffect} from 'react';
import { Dimensions, View, ScrollView,Animated} from 'react-native';
import CommonTitleBar from '../../components/comm/CommonTitleBar'
import ShopSelectAllTextBar from '../../components/shops/shop/ShopSelectAllTextBar'
import ShopTopTitleSelectList from '../../components/shops/shop/ShopTopTitleSelectList'
import ShopSelectorListView from '../../components/shops/shop/ShopSelectorListView';
import ShopGoodsList from '../../components/shops/shop/ShopGoodsList';
import ShopSubTitleList from '../../components/shops/shop/ShopSubTitleList';
import ShopHotItemList from '../../components/shops/shop/ShopHotItemList';
import EStyleSheet from 'react-native-extended-stylesheet';
import {navigationBackHandler} from '../../navigation/NavigationBackHandler';


class ShopScreen extends React.Component{

 

  constructor(props) {
    super(props);
  
    this.state = {
      scrollY: new Animated.Value(0),
      category : this.props.category,
    };
    
    this.setCategory = this.setCategory.bind(this);
  }

  setCategory(item){
    this.setState({category:item});
  }
  
  render() {

   

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0,HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT,80, HEADER_MIN_HEIGHT + styles.HEADER_MIN_HEIGHT.padding],
      extrapolate: 'clamp',
    });

    const titleTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0,0, styles.HEADER_MAX_HEIGHT.padding],
      extrapolate: 'clamp',
    });

    const selectorTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0,0, -50],
      extrapolate: 'clamp',
    });


  return (
      <View>
      <ScrollView style={styles.container}
        scrollEventThrottle={16}
        onScroll={Animated.event(
        [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
      )}
      >
        <View>
          {
            this.props.category != "전체보기" ?
            <ShopHotItemList category={this.state.category}></ShopHotItemList>
            :
              null
            }
            <ShopGoodsList category={this.state.category}></ShopGoodsList>
        </View>
    </ScrollView>
    <Animated.View style={[styles.header, {height: headerHeight}]}>
      <Animated.View style={[styles.bar,{transform: [{ translateY: titleTranslate },]},]}>
          <CommonTitleBar title={this.state.category} direction={null}></CommonTitleBar>
      </Animated.View>
      <Animated.View style={[styles.subtitle,{transform: [{ translateY: selectorTranslate },]},]}>
          <ShopTopTitleSelectList setCategory={this.setCategory}></ShopTopTitleSelectList>
          <ShopSubTitleList></ShopSubTitleList>
      </Animated.View>
    </Animated.View>          
    </View>
  )
}
}



export default function ShopListScreen({route,navigation}) {
  navigationBackHandler();
  return <ShopScreen category={route.params == undefined ? null : route.params.category}></ShopScreen>;
}


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container:{
    height:"100%",
    backgroundColor:"white",
    paddingTop:"200rem",
  },
  row: {
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    backgroundColor:"white",
  },
  bar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"white",
  },
  subtitle:{
    height:"130rem",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"white",
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },
  HEADER_MAX_HEIGHT:{
    height:"200rem",
    padding:"-80rem",
  },
  HEADER_MIN_HEIGHT:{
    height:"100rem", 
    padding:"45rem",
  },
  HEADER_SCROLL_DISTANCE:{
    height:"60rem",
    padding:"-40rem",
  },
});

const HEADER_MAX_HEIGHT = styles.HEADER_MAX_HEIGHT.height;
const HEADER_MIN_HEIGHT = styles.HEADER_MIN_HEIGHT.height;
const HEADER_SCROLL_DISTANCE = styles.HEADER_SCROLL_DISTANCE.height;

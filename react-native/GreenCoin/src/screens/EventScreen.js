import React,{useState ,Component} from 'react';
import { Text, View, ScrollView,Animated,StyleSheet} from 'react-native';
import CommonTitleBar from '../components/comm/CommonTitleBar'
import MarginBox from '../components/comm/MarginBox';
import ShopSelectAllTextBar from '../components/shops/shop/ShopSelectAllTextBar'
import ShopTopTitleSelectList from '../components/shops/shop/ShopTopTitleSelectList'
import ShopSelectorListView from '../components/shops/shop/ShopSelectorListView';
import ShopGoodsList from '../components/shops/shop/ShopGoodsList';
import ShopSubTitleList from '../components/shops/shop/ShopSubTitleList';
import ShopHotItemList from '../components/shops/shop/ShopHotItemList';
import EStyleSheet from 'react-native-extended-stylesheet';

import {navigationBackHandler} from '../navigation/NavigationBackHandler';



export default class ShopScreen extends Component{
   // const [category,setCategory] = useState(props.params == undefined ? "null" : props.params.category);
    
    constructor(props) {
      super(props);
    
      this.state = {
        scrollY: new Animated.Value(0),
        category :"null",
      };
      navigationBackHandler();
    }
    
  
    render() {
  
      const headerHeight = this.state.scrollY.interpolate({
        inputRange: [0,HEADER_SCROLL_DISTANCE],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
      });
  
      const titleTranslate = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [0,0, -50],
        extrapolate: 'clamp',
      });
  
      const selectorTranslate = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [0,0, -80],
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
          <MarginBox height={120}></MarginBox>
        {

         this.state.category == null ? 
          <View>
            <ShopSelectAllTextBar></ShopSelectAllTextBar>
            <ShopSelectorListView></ShopSelectorListView>
          </View>
         :
          <View>
              <ShopSubTitleList></ShopSubTitleList>
              <ShopHotItemList></ShopHotItemList>
              <ShopGoodsList></ShopGoodsList>
          </View>
         
        }
        
      </ScrollView>
      <Animated.View style={[styles.header, {height: headerHeight}]}>
        <Animated.View style={[styles.bar,{transform: [{ translateY: titleTranslate },]},]}>
          <CommonTitleBar title={"SHOP"}></CommonTitleBar>
        </Animated.View>
        <Animated.View style={[styles.bar,{transform: [{ translateY: selectorTranslate },]},]}>
          <ShopTopTitleSelectList ></ShopTopTitleSelectList>
        </Animated.View>
      </Animated.View>          
      </View>
    )
  }
}


const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = 40;

const styles = StyleSheet.create({

  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  bar: {
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"white",
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },
});
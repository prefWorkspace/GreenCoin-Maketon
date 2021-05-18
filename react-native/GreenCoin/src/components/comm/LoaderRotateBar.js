/*This is an Example of React Native Rotate Image View Using Animation*/
import React from 'react';
//import react in our project
import { StyleSheet, View, Animated, Image, Easing, Alert } from 'react-native';



//import all the components we needed
export default class LoaderRotateBar extends React.Component {
  constructor(props) {
    super(props);
    this.RotateValueHolder = new Animated.Value(0);
  }

  componentDidMount() {
    this.StartImageRotateFunction();
  }

  StartImageRotateFunction() {
    this.RotateValueHolder.setValue(0);
    Animated.timing(this.RotateValueHolder, {
      useNativeDriver:true,
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
    }).start(() => this.StartImageRotateFunction());
  }

  render() {
    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    
    return (
      <View style={styles.container}>
        <Animated.Image
          style={{
            width: 50,
            height: 50,
            transform: [{ rotate: RotateData }],
          }}
          // source={require('../../assets/img/load/loadbar.png')}
          resizeMode={"stretch"}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C2C2C2',
  },
});
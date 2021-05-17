import React, {useState}  from 'react';
import { Text, View, Dimensions, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'

var radio_props = [
  {label: '여    ', value: 0 },
  {label: '남', value: 1 }
];

export default function GenderInformation({gender,setGender}) {
    return (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
            <Text style={styles.title}>성별</Text>
            <RadioForm
              formHorizontal={true}
              radio_props={radio_props}
              initial={gender}
              onPress={(value) => {setGender(value)}}
              
            />
        </View>
        <View style={styles.hr}></View>
        
      </View>
    );
  }
  


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",

  },
  itemContainer:{
    width:"86%",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    height:'59.457rem',
  },
  title:{
      marginRight:"auto",
      fontSize:"14.864rem",
  },
  hr:{
    marginTop:"auto",
    width:"86%",
    borderBottomColor: '#efefef',
    borderBottomWidth: 1.2,
  }, 
});
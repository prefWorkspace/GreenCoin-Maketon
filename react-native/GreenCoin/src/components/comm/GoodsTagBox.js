import * as React from 'react';
import { Text, View, Dimensions, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

function NewTagBox(props) {
    return (
      <View style={[styles.container,styles.newContainer]}>
        <Text style={[styles.label,styles.newTagLabel]}>NEW 10%</Text>
      </View>
    );
}

function FitTagBox(props) {
    return (
      <View style={[styles.container,styles.fitContainer]}>
        <Text style={[styles.label,styles.fitTagLabel]}>FIT GOOD</Text>
      </View>
    );
}

function MdPickTagBox(props) {
    return (
      <View style={[styles.container,styles.mdContainer]}>
        <Text style={[styles.label,styles.mdTagLabel]}>MD PICK</Text>
      </View>
    );
}

function ModelPickTagBox(props) {
    return (
      <View style={[styles.container,styles.modelContainer]}>
        <Text style={[styles.label,styles.modelTagLabel]}>MODEL PICK</Text>
      </View>
    );
}

function WeatherNewTagBox(props) {
    return (
      <View style={[styles.container,styles.weatherContainer]}>
        <Text style={[styles.label,styles.weatherTagLabel]}>계절 신상</Text>
      </View>
    );
}

export { NewTagBox , FitTagBox,MdPickTagBox, ModelPickTagBox,WeatherNewTagBox};

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });


const styles = EStyleSheet.create({
    container:{
        marginRight:"3rem",
        marginTop:"3rem",
        padding:"1.2rem",
        alignItems:"center",
        textAlign:"center",
        height:"15.855rem",
    },
    label:{
        fontSize:"8.423rem"
    },
    newContainer:{
        width:"50.538rem",
        borderWidth: "0.495rem",
        borderColor: "#E73555",
    },
    fitContainer:{
        width:"50.538rem",
        backgroundColor: "#D9B878",
    },
    mdContainer:{
        width:"48.556rem",
        backgroundColor: "#000000",
    },
    modelContainer:{
        width:"66.394rem",
        borderWidth: "0.495rem",
        borderColor: "#4884DE",
    },  
    weatherContainer:{
        width:"41.620rem",
        backgroundColor: "#2E6262",
    },
    newTagLabel:{color:"#E73555"},
    fitTagLabel:{color:"white"},
    mdTagLabel:{color:"white"},
    modelTagLabel:{color:"#4884DE"},
    weatherTagLabel:{color:"white"},
  
});
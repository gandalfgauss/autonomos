import * as React from "react";
import { Image, View, KeyboardAvoidingView, TextInput, StyleSheet} from "react-native";
import { FontSize, FontFamily, Color, Margin, Border } from "../GlobalStyles";


const TelaTeste= () => {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <TextInput
          placeholder="Email"
          style={styles.input}
        />
        <TextInput
          placeholder="Username"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
        />
        <TextInput
          placeholder="Confirm Password"
          keyboardType="phone-pad"
          style={styles.input}
        />

      </KeyboardAvoidingView>
    );
};


const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"blue",

    },
    input:{
        width:100,
        height:100,
        backgroundColor: Color.blue,
        color: "black"
    }
})
export default TelaTeste;
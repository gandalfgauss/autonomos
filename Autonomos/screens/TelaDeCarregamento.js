import * as React from "react";
import { Image, StyleSheet, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

const TelaDeCarregamento = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.telaDeCarregamento}
      onPress={() => navigation.navigate("TelaAutenticacaoInicial")}
    >
      <Image
        style={styles.logomarcaAutonomosIcon}
        resizeMode="cover"
        source={require("../assets/logomarca_autonomos.png")}
      />
      <Image
        style={styles.simboloDeCarregamentoIcon}
        resizeMode="cover"
        source={require("../assets/simbolo_de_carregamento.png")}
      />
      <Text style={styles.nomeDoAplicativo}>Autônomos</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  logomarcaAutonomosIcon: {
    top: 81,
    left: 0,
    width: 387,
    height: 333,
    position: "absolute",
  },
  simboloDeCarregamentoIcon: {
    top: 453,
    left: 170,
    width: 36,
    height: 35,
    position: "absolute",
  },
  nomeDoAplicativo: {
    top: 366,
    left: 80,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.sanchez,
    color: Color.black,
    textAlign: "left",
    position: "absolute",
  },
  telaDeCarregamento: {
    backgroundColor: "#8deed6",
    flex: 1,
    width: "100%",
    height: 667,
    overflow: "hidden",
  },
});

export default TelaDeCarregamento;

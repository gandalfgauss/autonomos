import * as React from "react";
import { Image, StyleSheet, View, Text, Pressable } from "react-native";
import { Color, Border, FontSize, FontFamily, Margin } from "../GlobalStyles";

const TelaInicialAutonomo = ({route, navigation}) => {

  //const {telefone} = route.params;
  const telefone = "+5533988923674";
  //Profissional
  // Obter dados do Mongo DB


  //------------

  return (
    <View style={styles.telaInicialAutonomo}>

      <Pressable
        style={[styles.voltar, styles.voltarPosition]}
        onPress={() => navigation.navigate("TelaAutenticacaoInicial")}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/voltar.png")}
        />
      </Pressable>

      <Image
        style={styles.logomarcaAutonomosIcon}
        resizeMode="cover"
        source={require("../assets/logomarca-autonomos1.png")}
      />

      <Text style={styles.textoBoasVindas}>Bem-Vindo Autônomo!</Text>

      <View style={[styles.linhaSuperior, styles.voltarPosition]} />
        
      <Pressable 
        style={[styles.areasDeAtuacao, styles.chatLayout]}
        onPress={()=>{navigation.navigate("TelaAutonomoAreasDeAtuacao", {"telefone":telefone})}}
      >
        <View style={[styles.botaoAreasDeAtuacao, styles.botaoPosition]} />
        <Text style={[styles.textoAreasDeAtuacao, styles.textoTypo]}>
          Áreas de Atuação
        </Text>
        <Image
          style={[styles.imagemAreasDeAtuacaoIcon, styles.imagemIconLayout]}
          resizeMode="cover"
          source={require("../assets/imagem-areas-de-atuacao.png")}
        />
      </Pressable>

      <Pressable
        style={styles.verificarServicosDisponiveis}
        onPress={() =>
          navigation.navigate("TelaAutonomoVerificarServicosDisponiveis", {"telefone":telefone})
        }
      >
        <View
          style={[styles.botaoVerificarServicosDispo, styles.botaoPosition]}
        />
        <Text style={[styles.textoVerificarServicosDispo, styles.textoTypo]}>
          <Text style={styles.verificarServios}>{`Verificar Serviços `}</Text>
          <Text style={styles.disponveis}>Disponíveis</Text>
        </Text>
        <Image
          style={[
            styles.imagemVerificarServicosDispIcon,
            styles.imagemIconLayout,
          ]}
          resizeMode="cover"
          source={require("../assets/imagem-verificar-servicos-disponiveis.png")}
        />
      </Pressable>

      <Pressable
        style={[styles.chat, styles.chatLayout]}
        onPress={() => navigation.navigate("TelaChat1", {"telefone": telefone, "tipoDeLogin" : "profissional"})}
      >
        <View style={[styles.botaoAreasDeAtuacao, styles.botaoPosition]} />
        <Text style={[styles.textoAreasDeAtuacao, styles.textoTypo]}>
          Conversas
        </Text>
        <Image
          style={[styles.imagemAreasDeAtuacaoIcon, styles.imagemIconLayout]}
          resizeMode="cover"
          source={require("../assets/imagem-chat.png")}
        />
      </Pressable>
      
    </View>
  );
};

const styles = StyleSheet.create({
  voltarPosition: {
    left: 0,
    position: "absolute",
  },
  chatLayout: {
    height: 186,
    width: 187,
    left: -3,
    position: "absolute",
  },
  botaoPosition: {
    backgroundColor: Color.skyblue,
    borderRadius: Border.br_lg,
    top: "0%",
    position: "absolute",
  },
  textoTypo: {
    textAlign: "center",
    color: Color.darkslategray_200,
    fontSize: FontSize.size_sm-4,//FontSize.size_sm,
    fontFamily: FontFamily.roboto,
    position: "absolute",
  },
  imagemIconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  logomarcaAutonomosIcon: {
    left: 100,
    width: 175,
    height: 161,
    top: 0,
    position: "absolute",
  },
  linhaSuperior: {
    top: 173,
    borderStyle: "solid",
    borderColor: "#3f3f3f",
    borderTopWidth: 1,
    width: "100%",//376,
    height: 1,
  },
  textoBoasVindas: {
    top: 128,
    left: 37,
    fontSize: FontSize.size_lg-3,//FontSize.size_lg,
    color: Color.black,
    textAlign: "left",
    width: 302,
    height: 34,
    fontFamily: FontFamily.roboto,
    position: "absolute",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  voltar: {
    width: 48,
    height: 48,
    top: 0,
  },
  botaoAreasDeAtuacao: {
    height: "77.96%",
    width: "75.4%",
    right: "10.7%",
    bottom: "22.04%",
    left: "13.9%",
  },
  textoAreasDeAtuacao: {
    height: "22.04%",
    top: "77.96%",
    left: "0%",
    width: "100%",
  },
  imagemAreasDeAtuacaoIcon: {
    height: "64.52%",
    width: "64.17%",
    top: "4.3%",
    right: "19.25%",
    bottom: "31.18%",
    left: "16.58%",
  },
  areasDeAtuacao: {
    top: 229,
  },
  chat: {
    top: 452,
  },
  botaoVerificarServicosDispo: {
    height: "79.23%",
    width: "95.27%",
    right: "4.73%",
    bottom: "20.77%",
    left: "0%",
  },
  verificarServios: {
    marginBlockStart: 0,
    marginBlockEnd: 0,
  },
  disponveis: {
    margin: Margin.m_md,
  },
  textoVerificarServicosDispo: {
    height: "20.77%",
    width: "96.62%",
    top: "79.23%",
    left: "3.38%",
  },
  imagemVerificarServicosDispIcon: {
    height: "65.57%",
    width: "81.08%",
    top: "7.1%",
    right: "10.81%",
    bottom: "27.32%",
    left: "8.11%",
  },
  verificarServicosDisponiveis: {
    top: 220,
    left: 207,
    width: 148,
    height: 183,
    position: "absolute",
  },
  telaInicialAutonomo: {
    backgroundColor: Color.white,
    flex: 1,
    height: 667,
    overflow: "hidden",
    width: "100%",
  },
});

export default TelaInicialAutonomo;

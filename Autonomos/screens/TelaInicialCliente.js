import * as React from "react";
import { Image, StyleSheet, View, Text, Pressable } from "react-native";
import { Color, Border, FontSize, FontFamily, Margin } from "../GlobalStyles";

const TelaInicialCliente = ({route, navigation}) => {

  const {telefone} = route.params;

  //Cliente
  // Obter dados do Mongo DB


  //------------

  // Solicitar um servico
  function solicitarServico()
  {
    navigation.navigate("TelaSolicitacaoServico1", 
    {"telefone": telefone});
  }

  //--------------------------

  return (
    <View style={styles.telaInicialCliente}>
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

      <Text style={styles.textoBoasVindas}>Bem-Vindo Cliente!</Text>

      <View style={[styles.linhaSuperior, styles.voltarPosition]} />
           
      <Pressable
        style={styles.solicitarServico}
        onPress={solicitarServico}
      >
        <View style={[styles.botaoSolicitarSevico, styles.botaoPosition]} />
        <Text style={styles.textoSolicitarServico}>Solicitar um Serviço</Text>
        <Image
          style={[styles.imagemSolicitarServicoIcon, styles.imagemIconLayout]}
          resizeMode="cover"
          source={require("../assets/imagem-solicitar-servico.png")}
        />
      </Pressable>

      <Pressable
        style={styles.verificarServico}
        onPress={() => navigation.navigate("TelaVerificacaoServicoCliente", {"telefone":telefone})}
      >
        <View
          style={[styles.botaoVerificarServicosSolic, styles.botaoPosition]}
        />
        <Text style={[styles.textoVerificarServicosSolic, styles.textoTypo]}>
          <Text style={styles.verificarServios}>{`Verificar Serviços `}</Text>
          <Text style={styles.solicitados}>Solicitados</Text>
        </Text>
        <Image
          style={[styles.imagemVerificarServicoIcon, styles.imagemIconLayout]}
          resizeMode="cover"
          source={require("../assets/imagem-verificar-servico.png")}
        />
      </Pressable>
      
      <Pressable
        style={styles.chat}
        onPress={() => navigation.navigate("TelaChat1", {"telefone":telefone, "tipoDeLogin" : "cliente"})}
      >
        <View style={[styles.botaoChat, styles.botaoPosition]} />
        <Text style={[styles.textoChat, styles.textoTypo]}>Conversas</Text>
        <Image
          style={[styles.imagemChatIcon, styles.imagemIconLayout]}
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
  botaoPosition: {
    backgroundColor: Color.skyblue,
    borderRadius: Border.br_lg,
    top: "0%",
    position: "absolute",
  },
  imagemIconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  textoTypo: {
    textAlign: "center",
    color: Color.darkslategray_200,
    fontSize: FontSize.size_sm -2,//FontSize.size_sm,
    fontFamily: FontFamily.roboto,
    position: "absolute",
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
    left: 57,
    fontSize: FontSize.size_lg-3,//FontSize.size_lg,
    color: Color.black,
    width: 261,
    height: 34,
    textAlign: "left",
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
  botaoSolicitarSevico: {
    height: "87.88%",
    width: "85.98%",
    right: "10.37%",
    bottom: "12.12%",
    left: "3.66%",
  },
  textoSolicitarServico: {
    height: "20.91%", //"10.91%",
    top: "89.09%",
    color: Color.darkslategray_200,
    fontSize: FontSize.size_sm-2,//FontSize.size_sm,
    left: "0%",
    textAlign: "left",
    fontFamily: FontFamily.roboto,
    position: "absolute",
    width: "100%",
  },
  imagemSolicitarServicoIcon: {
    height: "72.73%",
    width: "73.17%",
    top: "4.85%",
    right: "15.85%",
    bottom: "22.42%",
    left: "10.98%",
  },
  solicitarServico: {
    top: 223,
    left: 17,
    width: 164,
    height: 165,
    position: "absolute",
  },
  botaoVerificarServicosSolic: {
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
  solicitados: {
    margin: Margin.m_md,
  },
  textoVerificarServicosSolic: {
    height:"29.77%", //"20.77%",
    width: "96.62%",
    top: "79.23%",
    left: "3.38%",
  },
  imagemVerificarServicoIcon: {
    height: "65.57%",
    width: "81.08%",
    top: "7.1%",
    right: "10.81%",
    bottom: "27.32%",
    left: "8.11%",
  },
  verificarServico: {
    top: 214,
    left: 211,
    width: 148,
    height: 183,
    position: "absolute",
  },
  botaoChat: {
    height: "77.96%",
    width: "75.4%",
    right: "10.7%",
    bottom: "22.04%",
    left: "13.9%",
  },
  textoChat: {
    height: "22.04%",
    top: "77.96%",
    left: "0%",
    width: "100%",
  },
  imagemChatIcon: {
    height: "64.52%",
    width: "64.17%",
    top: "4.3%",
    right: "19.25%",
    bottom: "31.18%",
    left: "16.58%",
  },
  chat: {
    top: 425,
    left: -6,
    width: 187,
    height: 186,
    position: "absolute",
  },
  telaInicialCliente: {
    backgroundColor: Color.white,
    flex: 1,
    height: 667,
    overflow: "hidden",
    width: "100%",
  },
});

export default TelaInicialCliente;

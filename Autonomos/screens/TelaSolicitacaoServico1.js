import * as React from "react";
import { Image, StyleSheet, View, Text, Pressable } from "react-native";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";

const TelaSolicitacaoServico1 = ({route, navigation}) => {
  
  const {telefone} = route.params;


  function solicitarServico(area)
  {
    navigation.navigate("TelaSolicitacaoServico2",
      {"telefone":telefone, "area": area})
  }

  return (
    <View style={styles.telaSolicitacaoServicoClien}>
      <Image
        style={styles.logomarcaAutonomosIcon}
        resizeMode="cover"
        source={require("../assets/logomarca-autonomos1.png")}
      />
      <View style={[styles.linhaSuperior, styles.voltarPosition]} />
      <Text style={styles.textoSoliciteServico}>Solicite um serviço</Text>
      <Pressable
        style={[styles.voltar, styles.voltarPosition]}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/voltar.png")}
        />
      </Pressable>
      <View style={styles.servicos}>
        <Pressable 
          style={styles.desenvolvedor} 
          onPress={() => solicitarServico("desenvolvedor")}
        >
          <View style={[styles.botaoDesenvolvedor, styles.botaoPosition]} />
          <Text style={[styles.textoDesenvolvedor, styles.textoTypo]}>
            Desenvolvedor
          </Text>
          <Image
            style={styles.imagemDesenvolvedorIcon}
            resizeMode="cover"
            source={require("../assets/imagem-desenvolvedor.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.pintorPosition, styles.pintorPosition1]}
          onPress={() => solicitarServico("pintor")}
        >
          <View style={[styles.botaoPintor, styles.botaoPosition]} />
          <Text style={[styles.textoPintor, styles.textoTypo]}>Pintor</Text>
          <Image
            style={[styles.imagemPintorIcon, styles.imagemIconPosition]}
            resizeMode="cover"
            source={require("../assets/imagem-pintor2.png")}
          />
        </Pressable>
        <Pressable 
          style={[styles.medicoPosition1, styles.pintorPosition1]}
          onPress={() => solicitarServico("professor")}
        >
          <View style={[styles.botaoPintor, styles.botaoPosition]} />
          <Text style={[styles.textoPintor, styles.textoTypo]}>Professor</Text>
          <Image
            style={[styles.imagemProfessorIcon, styles.imagemIconLayout1]}
            resizeMode="cover"
            source={require("../assets/imagem-professor.png")}
          />
        </Pressable>
        <Pressable 
          style={[styles.pedreiroPosition, styles.pedreiroPosition1]}
          onPress={() => solicitarServico("pedreiro")}
        >
          <View style={[styles.botaoPintor, styles.botaoPosition]} />
          <Text style={[styles.textoPintor, styles.textoTypo]}>Pedreiro</Text>
          <Image
            style={[styles.imagemPedreiroIcon, styles.imagemIconPosition]}
            resizeMode="cover"
            source={require("../assets/imagem-pedreiro.png")}
          />
        </Pressable>
        <Pressable 
          style={[styles.pedreiroPosition1, styles.pintorPosition]}
          onPress={() => solicitarServico("montador")}
        >
          <View style={[styles.botaoPintor, styles.botaoPosition]} />
          <Text style={[styles.textoPintor, styles.textoTypo]}>Montador</Text>
          <Image
            style={[styles.imagemMontadorIcon, styles.imagemIconLayout]}
            resizeMode="cover"
            source={require("../assets/imagem-montador.png")}
          />
        </Pressable>
        <Pressable 
          style={[styles.pedreiroPosition1, styles.medicoPosition1]}
          onPress={() => solicitarServico("diarista")}
        >
          <View style={[styles.botaoPintor, styles.botaoPosition]} />
          <Text style={[styles.textoPintor, styles.textoTypo]}>Diarista</Text>
          <Image
            style={[
              styles.imagemDiaristaIcon,
              styles.imagemIconLayout1,
              styles.imagemIconLayout2,
            ]}
            resizeMode="cover"
            source={require("../assets/imagem-diarista.png")}
          />
        </Pressable>
        <Pressable 
          style={[styles.arquitetoPosition, styles.pedreiroPosition]}
          onPress={() => solicitarServico("engenheiro")}
        >
          <View style={[styles.botaoPintor, styles.botaoPosition]} />
          <Text style={[styles.textoPintor, styles.textoTypo]}>Engenheiro</Text>
          <Image
            style={[styles.imagemPedreiroIcon, styles.imagemIconPosition]}
            resizeMode="cover"
            source={require("../assets/imagem-engenheiro.png")}
          />
        </Pressable>
        <Pressable 
          style={[styles.arquitetoPosition, styles.pintorPosition]}
          onPress={() => solicitarServico("arquiteto")}
        >
          <View style={[styles.botaoPintor, styles.botaoPosition]} />
          <Text style={[styles.textoPintor, styles.textoTypo]}>Arquiteto</Text>
          <Image
            style={[styles.imagemArquitetoIcon, styles.imagemIconLayout]}
            resizeMode="cover"
            source={require("../assets/imagem-arquiteto.png")}
          />
        </Pressable>
        <Pressable 
          style={[styles.arquitetoPosition, styles.medicoPosition1]}
          onPress={() => solicitarServico("manutencao")}
        >
          <View style={[styles.botaoPintor, styles.botaoPosition]} />
          <Text style={[styles.textoPintor, styles.textoTypo]}>Manutenção</Text>
          <Image
            style={[
              styles.imagemManutencaoIcon,
              styles.imagemIconLayout1,
              styles.imagemIconLayout2,
            ]}
            resizeMode="cover"
            source={require("../assets/imagem-manutencao.png")}
          />
        </Pressable>
        <Pressable 
          style={[styles.medicoPosition, styles.pedreiroPosition]}
          onPress={() => solicitarServico("motorista")}
        >
          <View style={[styles.botaoPintor, styles.botaoPosition]} />
          <Text style={[styles.textoPintor, styles.textoTypo]}>Motorista</Text>
          <Image
            style={[styles.imagemPedreiroIcon, styles.imagemIconPosition]}
            resizeMode="cover"
            source={require("../assets/imagem-motorista.png")}
          />
        </Pressable>
        <Pressable 
          style={[styles.medicoPosition, styles.pintorPosition]}
          onPress={() => solicitarServico("voluntario")}
        >
          <View style={[styles.botaoPintor, styles.botaoPosition]} />
          <Text style={[styles.textoPintor, styles.textoTypo]}>
            Trabalho Voluntário
          </Text>
          <Image
            style={[styles.imagemArquitetoIcon, styles.imagemIconLayout]}
            resizeMode="cover"
            source={require("../assets/imagem-trabalho-voluntario.png")}
          />
        </Pressable>
        <Pressable 
          style={[styles.medicoPosition, styles.medicoPosition1]}
          onPress={() => solicitarServico("medico")}
        >
          <View style={[styles.botaoPintor, styles.botaoPosition]} />
          <Text style={[styles.textoPintor, styles.textoTypo]}>Médico</Text>
          <Image
            style={[
              styles.imagemManutencaoIcon,
              styles.imagemIconLayout1,
              styles.imagemIconLayout2,
            ]}
            resizeMode="cover"
            source={require("../assets/imagem-medico.png")}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  voltarPosition: {
    left: 0,
    position: "absolute",
  },
  botaoPosition: {
    backgroundColor: Color.whitesmoke_200,
    borderRadius: Border.br_md,
    top: "0%",
    position: "absolute",
  },
  textoTypo: {
    textAlign: "center",
    color: Color.gray,
    fontSize: FontSize.size_xs-2,//FontSize.size_xs,
    left: "0%",
    fontFamily: FontFamily.roboto,
    position: "absolute",
    width: "100%",
  },
  pintorPosition1: {
    bottom: "78.67%",
    width: "28.48%",
    height: "21.33%",
    top: "0%",
    position: "absolute",
  },
  imagemIconPosition: {
    bottom: "34.29%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  imagemIconLayout1: {
    right: "17.02%",
    width: "65.96%",
    height: "59.05%",
    left: "17.02%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  pedreiroPosition1: {
    bottom: "50.83%",
    top: "27.83%",
    width: "28.48%",
    height: "21.33%",
    position: "absolute",
  },
  pintorPosition: {
    left: "71.52%",
    right: "0%",
  },
  imagemIconLayout: {
    bottom: "33.33%",
    width: "64.89%",
    height: "58.1%",
    top: "8.57%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  medicoPosition1: {
    right: "71.52%",
    left: "0%",
  },
  imagemIconLayout2: {
    right: "17.02%",
    width: "65.96%",
    height: "59.05%",
  },
  pedreiroPosition: {
    left: "35.76%",
    right: "35.76%",
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
  textoSoliciteServico: {
    top: 128,
    left: 57,
    fontSize: FontSize.size_lg-2,//FontSize.size_lg,
    color: Color.black,
    textAlign: "left",
    width: 261,
    height: 40,//34,
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
  botaoDesenvolvedor: {
    height: "76.79%",
    width: "74.59%",
    right: "13.57%",
    bottom: "23.21%",
    left: "11.83%",
  },
  textoDesenvolvedor: {
    height: "40.05%",//"17.05%",
    top: "82.95%",
  },
  imagemDesenvolvedorIcon: {
    height: "53.09%",
    width: "49.73%",
    top: "11.38%",
    right: "25.12%",
    bottom: "35.54%",
    left: "25.15%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  desenvolvedor: {
    height: "21.43%",
    width: "34.12%",
    right: "32.64%",
    bottom: "78.57%",
    left: "33.23%",
    top: "0%",
    position: "absolute",
  },
  botaoPintor: {
    height: "77.14%",
    width: "89.36%",
    right: "5.32%",
    bottom: "22.86%",
    left: "5.32%",
  },
  textoPintor: {
    height: "40.14%",//"17.14%",
    top: "82.86%",
  },
  imagemPintorIcon: {
    height: "51.43%",
    width: "57.45%",
    top: "14.29%",
    right: "20.21%",
    left: "22.34%",
  },
  imagemProfessorIcon: {
    bottom: "32.38%",
    left: "17.02%",
    top: "8.57%",
    right: "17.02%",
    width: "65.96%",
    height: "59.05%",
  },
  imagemPedreiroIcon: {
    height: "53.33%",
    width: "59.57%",
    top: "12.38%",
    right: "19.15%",
    left: "21.28%",
  },
  imagemMontadorIcon: {
    right: "15.96%",
    left: "19.15%",
  },
  imagemDiaristaIcon: {
    top: "10.48%",
    bottom: "30.48%",
    left: "17.02%",
  },
  arquitetoPosition: {
    bottom: "22.79%",
    top: "55.87%",
    width: "28.48%",
    height: "21.33%",
    position: "absolute",
  },
  imagemArquitetoIcon: {
    right: "18.09%",
    left: "17.02%",
  },
  imagemManutencaoIcon: {
    top: "9.52%",
    bottom: "31.43%",
    left: "17.02%",
  },
  medicoPosition: {
    bottom: "0%",
    top: "78.67%",
    width: "28.48%",
    height: "21.33%",
    position: "absolute",
  },
  servicos: {
    top: 210,
    left: 19,
    width: 337,
    height: 411,
    position: "absolute",
  },
  telaSolicitacaoServicoClien: {
    backgroundColor: Color.white,
    flex: 1,
    height: 667,
    overflow: "hidden",
    width: "100%",
  },
});

export default TelaSolicitacaoServico1;

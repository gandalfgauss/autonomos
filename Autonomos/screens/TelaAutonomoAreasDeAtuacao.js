import * as React from "react";
import { Image, StyleSheet, View, Text, Pressable, Alert } from "react-native";
import { Api } from "../Api";
import { Border, FontSize, FontFamily, Color } from "../GlobalStyles";

const TelaAutonomoAreasDeAtuacao = ({route, navigation}) => {

  const {telefone} = route.params;

  const nomes  = ["professor", "desenvolvedor", "pintor", "diarista", "pedreiro", "montador", 
                  "manutencao", "engenheiro", "arquiteto", "medico","motorista", "voluntario"]


  let areas = {}                
  for(const nome of nomes)
  {
    areas[nome] = React.useState(false);
  }

  React.useEffect(()=>{
    
    Api.post("/areas/", {telefone:telefone}).then(res=>{
      
      let bdAreas = res.data.areas;
      for(let area of bdAreas)
      {
        areas[area][1](true);
      }

    }).catch(error=>{
      console.log("erro cat 1", error)
      Alert.alert("Alerta !", error.response.data.error)
    })   
  }, [])
  

  function pressionou(area)
  {
    if(areas[area][0] === false)
    {
      areas[area][1](true);
    }
    else
    {
      areas[area][1](false);
    }
    
  }

  function voltar()
  {
    let novasAreas = [];

    for(let nome of nomes)
    {
      if(areas[nome][0])
      {
        novasAreas.push(nome)
      }
    }
    Api.post("/areas/setAreas", {telefone:telefone, novasAreas: novasAreas}).then(res=>{
    }).catch(error=>{
      Alert.alert("Alerta !", "erro")//error.response.data.error)
    })
    navigation.goBack();
  }

  return (
    <View style={styles.telaAutonomoAreasDeAtuacao}>

      <Pressable
        style={[styles.voltar, styles.voltarPosition]}
        onPress={voltar}
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

      <Text style={styles.textoAreasDeAtuacao}>Áreas de Atuação</Text>

      <View style={[styles.linhaSuperior, styles.voltarPosition]} />
 
      <View style={styles.servicos}>

        <Pressable style={styles.desenvolvedor} onPress={() => pressionou("desenvolvedor")}>
          <View style={[styles.botaoDesenvolvedor, styles.botaoPosition, {backgroundColor: (areas["desenvolvedor"][0] ? Color.skyblue : Color.whitesmoke_200)}]} />
          <Text style={[styles.textoDesenvolvedor, styles.textoTypo, {color:(areas["desenvolvedor"][0] ? Color.skyblue : styles.textoDesenvolvedor.color)}]}>
            Desenvolvedor
          </Text>
          <Image
            style={styles.imagemDesenvolvedorIcon}
            resizeMode="cover"
            source={require("../assets/imagem-desenvolvedor.png")}
          />
        </Pressable>

        <Pressable style={[styles.pintorPosition, styles.pintorPosition1]} onPress={() => pressionou("pintor")} >
          <View style={[styles.botaoPintor, styles.botaoPosition, {backgroundColor: (areas["pintor"][0] ? Color.skyblue : Color.whitesmoke_200)}]} />
          <Text style={[styles.textoPintor, styles.textoTypo, {color:(areas["pintor"][0] ? Color.skyblue : styles.textoPintor.color)}]}>Pintor</Text>
          <Image
            style={[styles.imagemPintorIcon, styles.imagemIconPosition]}
            resizeMode="cover"
            source={require("../assets/imagem-pintor2.png")}
          />
        </Pressable>

        <Pressable style={[styles.medicoPosition1, styles.pintorPosition1]} onPress={() => pressionou("professor")}>
          <View style={[styles.botaoPintor, styles.botaoPosition, {backgroundColor: (areas["professor"][0] ? Color.skyblue : Color.whitesmoke_200)}]} />
          <Text style={[styles.textoPintor, styles.textoTypo, {color:(areas["professor"][0] ? Color.skyblue : styles.textoPintor.color)}]}>Professor</Text>
          <Image
            style={[styles.imagemProfessorIcon, styles.imagemIconLayout1]}
            resizeMode="cover"
            source={require("../assets/imagem-professor.png")}
          />
        </Pressable>

        <Pressable style={[styles.pedreiroPosition, styles.pedreiroPosition1]} onPress={() => pressionou("pedreiro")}>
          <View style={[styles.botaoPintor, styles.botaoPosition, {backgroundColor: (areas["pedreiro"][0] ? Color.skyblue : Color.whitesmoke_200)}]} />
          <Text style={[styles.textoPintor, styles.textoTypo, {color:(areas["pedreiro"][0] ? Color.skyblue : styles.textoPintor.color)}]}>Pedreiro</Text>
          <Image
            style={[styles.imagemPedreiroIcon, styles.imagemIconPosition]}
            resizeMode="cover"
            source={require("../assets/imagem-pedreiro.png")}
          />
        </Pressable>

        <Pressable style={[styles.pedreiroPosition1, styles.pintorPosition]} onPress={() => pressionou("montador")}>
          <View style={[styles.botaoPintor, styles.botaoPosition, {backgroundColor: (areas["montador"][0] ? Color.skyblue : Color.whitesmoke_200)}]} />
          <Text style={[styles.textoPintor, styles.textoTypo, {color:(areas["montador"][0] ? Color.skyblue : styles.textoPintor.color)}]}>Montador</Text>
          <Image
            style={[styles.imagemMontadorIcon, styles.imagemIconLayout]}
            resizeMode="cover"
            source={require("../assets/imagem-montador.png")}
          />
        </Pressable>

        <Pressable style={[styles.pedreiroPosition1, styles.medicoPosition1]} onPress={() => pressionou("diarista")}>
          <View style={[styles.botaoPintor, styles.botaoPosition, {backgroundColor: (areas["diarista"][0] ? Color.skyblue : Color.whitesmoke_200)}]} />
          <Text style={[styles.textoPintor, styles.textoTypo, {color:(areas["diarista"][0] ? Color.skyblue : styles.textoPintor.color)}]}>Diarista</Text>
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

        <Pressable style={[styles.arquitetoPosition, styles.pedreiroPosition]} onPress={() => pressionou("engenheiro")}>
          <View style={[styles.botaoPintor, styles.botaoPosition, {backgroundColor: (areas["engenheiro"][0] ? Color.skyblue : Color.whitesmoke_200)}]} />
          <Text style={[styles.textoPintor, styles.textoTypo, {color:(areas["engenheiro"][0] ? Color.skyblue : styles.textoPintor.color)}]}>Engenheiro</Text>
          <Image
            style={[styles.imagemPedreiroIcon, styles.imagemIconPosition]}
            resizeMode="cover"
            source={require("../assets/imagem-engenheiro.png")}
          />
        </Pressable>

        <Pressable style={[styles.arquitetoPosition, styles.pintorPosition]} onPress={() => pressionou("arquiteto")}>
          <View style={[styles.botaoPintor, styles.botaoPosition, {backgroundColor: (areas["arquiteto"][0] ? Color.skyblue : Color.whitesmoke_200)}]} />
          <Text style={[styles.textoPintor, styles.textoTypo, {color:(areas["arquiteto"][0] ? Color.skyblue : styles.textoPintor.color)}]}>Arquiteto</Text>
          <Image
            style={[styles.imagemArquitetoIcon, styles.imagemIconLayout]}
            resizeMode="cover"
            source={require("../assets/imagem-arquiteto.png")}
          />
        </Pressable>

        <Pressable style={[styles.arquitetoPosition, styles.medicoPosition1]} onPress={() => pressionou("manutencao")}>
          <View style={[styles.botaoPintor, styles.botaoPosition, {backgroundColor: (areas["manutencao"][0] ? Color.skyblue : Color.whitesmoke_200)}]} />
          <Text style={[styles.textoPintor, styles.textoTypo, {color:(areas["manutencao"][0] ? Color.skyblue : styles.textoPintor.color)}]}>Manutenção</Text>
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

        <Pressable style={[styles.medicoPosition, styles.pedreiroPosition]} onPress={() => pressionou("motorista")}>
          <View style={[styles.botaoPintor, styles.botaoPosition, {backgroundColor: (areas["motorista"][0] ? Color.skyblue : Color.whitesmoke_200)}]} />
          <Text style={[styles.textoPintor, styles.textoTypo, {color:(areas["motorista"][0] ? Color.skyblue : styles.textoPintor.color)}]}>Motorista</Text>
          <Image
            style={[styles.imagemPedreiroIcon, styles.imagemIconPosition]}
            resizeMode="cover"
            source={require("../assets/imagem-motorista.png")}
          />
        </Pressable>

        <Pressable style={[styles.medicoPosition, styles.pintorPosition]} onPress={() => pressionou("voluntario")}>
          <View style={[styles.botaoPintor, styles.botaoPosition, {backgroundColor: (areas["voluntario"][0] ? Color.skyblue : Color.whitesmoke_200)}]} />
          <Text style={[styles.textoPintor, styles.textoTypo, {color:(areas["voluntario"][0] ? Color.skyblue : styles.textoPintor.color)}]}>
            Trabalho Voluntário
          </Text>
          <Image
            style={[styles.imagemArquitetoIcon, styles.imagemIconLayout]}
            resizeMode="cover"
            source={require("../assets/imagem-trabalho-voluntario.png")}
          />
        </Pressable>
        
        <Pressable style={[styles.medicoPosition, styles.medicoPosition1]} onPress={() => pressionou("medico")}>
          <View style={[styles.botaoPintor, styles.botaoPosition, {backgroundColor: (areas["medico"][0] ? Color.skyblue : Color.whitesmoke_200)}]} />
          <Text style={[styles.textoPintor, styles.textoTypo, {color:(areas["medico"][0] ? Color.skyblue : styles.textoPintor.color)}]}>Médico</Text>
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
    borderRadius: Border.br_md,
    top: "0%",
    position: "absolute",
  },
  textoTypo: {
    textAlign: "center",
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
  textoAreasDeAtuacao: {
    top: 128,
    left: 69,
    fontSize: FontSize.size_lg-3,//FontSize.size_lg,
    color: Color.black,
    textAlign: "left",
    width: 238,
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
    backgroundColor: Color.whitesmoke_200,
  },
  textoDesenvolvedor: {
    height: "40.05%", //"17.05%",
    top: "82.95%",
    color: Color.gray,
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
    backgroundColor: Color.whitesmoke_200,
  },
  textoPintor: {
    height: "40.14%",//"17.14%",
    top: "82.86%",
    color: Color.gray,
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
  telaAutonomoAreasDeAtuacao: {
    backgroundColor: Color.white,
    flex: 1,
    height: 667,
    overflow: "hidden",
    width: "100%",
  },
});

export default TelaAutonomoAreasDeAtuacao;

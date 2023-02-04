import * as React from "react";
import { Image, StyleSheet, View, Text, Pressable, Alert } from "react-native";
import { FontSize, FontFamily, Border, Color } from "../GlobalStyles";


//Nome da areas reais
const nomeAreas  = {
  "professor" : "Professor", 
  "desenvolvedor" : "Desenvolvedor", 
  "pintor" : "Pintor", 
  "diarista" : "Diarista", 
  "pedreiro" : "Pedreiro", 
  "montador" : "Montador", 
  "manutencao": "Manutenção", 
  "engenheiro" : "Engenheiro", 
  "arquiteto" : "Arquiteto", 
  "medico" : "Médico",
  "motorista" : "Motorista", 
  "voluntario" : "Trabalho Voluntário",
}

const imagens ={
  professor: require("../assets/imagem-professor.png"),
  desenvolvedor: require("../assets/imagem-desenvolvedor.png"),
  pintor: require("../assets/imagem-pintor.png"),
  diarista: require("../assets/imagem-diarista.png"),
  pedreiro: require("../assets/imagem-pedreiro.png"),
  montador: require("../assets/imagem-montador.png"),
  manutencao: require("../assets/imagem-manutencao.png"),
  engenheiro: require("../assets/imagem-engenheiro.png"),
  arquiteto: require("../assets/imagem-arquiteto.png"),
  medico: require("../assets/imagem-medico.png"),
  motorista: require("../assets/imagem-motorista.png"),
  voluntario: require("../assets/imagem-trabalho-voluntario.png")
 
}


const areaDeAtuacao = ["professor", "desenvolvedor", "pintor", "diarista", "pedreiro", "montador", "manutencao", "engenheiro", "arquiteto", "medico","motorista", "voluntario"]


const TelaAutonomoFiltragem2 = ({route, navigation}) => {

  const {telefone} = route.params;

  let areas = {}

  for(const area of areaDeAtuacao)
  {
    areas[area] = React.useState(true);
  }

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

  function renderizaAreas()
  {
    let componentes = []

    let i =0;
    for(const area of areaDeAtuacao)
    {
      componentes.push(
        <Pressable key={i}
          style={styles.pintorPosition1}
          onPress={() => pressionou(area)}
        >
          <View  style={[styles.botaoPintor, styles.botaoPosition, {backgroundColor: (areas[area][0] ? Color.skyblue : Color.whitesmoke_200)}]} />
          <Text style={[styles.textoPintor, styles.textoTypo, {color:(areas[area][0] ? Color.skyblue : styles.textoTypo.color)}]}> {nomeAreas[area]} </Text>
          <Image
            style={[styles.imagemPintorIcon, styles.imagemIconPosition]}
            resizeMode="cover"
            source={imagens[area]}
            
          />
        </Pressable>
      )

      i++;
    }

    return componentes;
  }

  return (
    <View style={styles.telaAutonomoFiltragem1}>
      <Image
        style={styles.logomarcaAutonomosIcon}
        resizeMode="cover"
        source={require("../assets/logomarca-autonomos1.png")}
      />
      <View style={[styles.linhaSuperior, styles.voltarPosition]} />
      <Text style={styles.textoFiltrarServicos}>Filtrar - Áreas de Atuação </Text>
      <Pressable
        style={[styles.voltar, styles.voltarPosition]}
        onPress={() =>
          navigation.goBack()
        }
      >
        <Image
          style={styles.iconLayout}
          resizeMode="cover"
          source={require("../assets/voltar.png")}
        />
      </Pressable>
      
      <View style={styles.areasFiltragem}>
          {renderizaAreas()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  areasFiltragem:{
    position:"absolute",
    top: "26.9%",
    width:"100%",
    height:"100%",
    //backgroundColor:"red",
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',

  },

  pintorPosition1: {
    width: "26%", //"28.48%",
    height: "11%", //"21.33%",
    //backgroundColor: "blue",
    marginRight: "5.11%",
    marginBottom: "9.11%",
    marginLeft: "2%",
    left: "1%",
  },


  botaoPintor: {
    height: "77.14%",
    width: "72%",//"89.36%",
    right: "5.32%",
    bottom: "22.86%",
    left: "13%", //"5.32%",
  },
  textoTypo: {
    textAlign: "center",
    color: Color.gray,
    fontSize: FontSize.size_xs-3,//FontSize.size_xs,
    left: "0%",
    paddingRight: 3,
    fontFamily: FontFamily.roboto,
    position: "absolute",
    width: "100%",
  },
  textoPintor: {
    height: "100.14%",//"17.14%",
    top: "82.86%",
  },
  botaoPosition: {
    backgroundColor: Color.whitesmoke_200,
    borderRadius: Border.br_md,
    top: "0%",
    position: "absolute",
  },
  
  voltarPosition: {
    left: 0,
    position: "absolute",
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  textoTypo1: {
    fontSize: FontSize.size_base -1 ,//FontSize.size_base,
    textAlign: "left",
    fontFamily: FontFamily.roboto,
    position: "absolute",
  },
  onlineLayout: {
    height: 88,
    width: 96,
    top: 283,
    position: "absolute",
  },
  botaoLayout: {
    height: 68,
    width: 86,
    borderRadius: Border.br_md,
    left: 5,
    top: 0,
    position: "absolute",
  },

  imagemIconPosition: {
    width: 62,
    top: 8,
    position: "absolute",
    left: 19,
  },
  recentesPosition: {
    top: 402,
    height: 88,
    width: 96,
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
  textoFiltrarServicos: {
    top: 128,
    left: 0, //86,
    fontSize: FontSize.size_lg-4,//FontSize.size_lg,
    color: Color.black,
    width: "100%",//203,
    height: 40, //34,
    textAlign: "center",//"left",
    fontFamily: FontFamily.roboto,
    position: "absolute",
  },
  voltar: {
    width: 48,
    height: 48,
    top: 0,
  },
  botaoAreas: {
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: Border.br_lg,
    backgroundColor: Color.skyblue,
    position: "absolute",
  },
  textoAreas: {
    height: "54.55%",
    width: "24.11%",
    top: "20.45%",
    left: "37.95%",
    color: Color.snow,
  },
  areas: {
    top: 583,
    left: 76,
    width: 224,
    height: 44,
    position: "absolute",
  },
  textoServico: {
    top: 214,
    left: 59,
    color: Color.darkslategray_100,
    width: 297,
    height: 30, //27,
  },
  botaoOnline: {
    backgroundColor: Color.whitesmoke_200,
  },
  textoOnline: {
    color: Color.gray,
  },
  imagemOnlineIcon: {
    left: 18,
    height: 60,
  },
  online: {
    left: 45,
  },
  botaoPresencial: {
    backgroundColor: Color.whitesmoke_200,
  },
  textoPresencial: {
    color: Color.gray,
  },
  imagemPresencialIcon: {
    left: 16,
    height: 51,
  },
  presencial: {
    left: 222,
  },
  recentes: {
    left: 50,
  },
  proximos: {
    left: 227,
  },
  telaAutonomoFiltragem1: {
    backgroundColor: Color.white,
    flex: 1,
    height: 667,
    overflow: "hidden",
    width: "100%",
  },
});

export default TelaAutonomoFiltragem2;

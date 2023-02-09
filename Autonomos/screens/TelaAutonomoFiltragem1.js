import * as React from "react";
import { Image, StyleSheet, View, Text, Pressable } from "react-native";
import { FontSize, FontFamily, Border, Color } from "../GlobalStyles";
import { Api } from "../Api";

const TelaAutonomoFiltragem1 = ({route, navigation}) => {

  const {telefone} = route.params;

  const filtros  = ["online", "presencial", "recentes", "proximos"]

  let areas = {}

  for(const filtro of filtros)
  {
    areas[filtro] = React.useState(false);
  }

  React.useEffect(()=>{
    
    Api.post("/areas/", {telefone:telefone}).then(res=>{
      
      let bdAreas = res.data.filtros;
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
      if(area === "recentes")
      {
        areas["proximos"][1](false);
      }
      else if(area == "proximos")
      {
        areas["recentes"][1](false);
      }


      areas[area][1](true);
    }
    else
    {
      areas[area][1](false);
    }
  }

  function voltar()
  {
    let novosFiltros = [];

    for(let nome of filtros)
    {
      if(areas[nome][0])
      {
        novosFiltros.push(nome)
      }
    }
    Api.post("/areas/setFiltros", {telefone:telefone, novosFiltros: novosFiltros}).then(res=>{
    }).catch(error=>{
      Alert.alert("Alerta !", "erro")//error.response.data.error)
    })
    navigation.goBack();
  }

  return (
    <View style={styles.telaAutonomoFiltragem1}>

      <Pressable
        style={[styles.voltar, styles.voltarPosition]}
        onPress={voltar
        }
      >
        <Image
          style={styles.iconLayout}
          resizeMode="cover"
          source={require("../assets/voltar.png")}
        />
      </Pressable>

      <Image
        style={styles.logomarcaAutonomosIcon}
        resizeMode="cover"
        source={require("../assets/logomarca-autonomos1.png")}
      />

      <Text style={styles.textoFiltrarServicos}>Filtrar Serviços</Text>

      <View style={[styles.linhaSuperior, styles.voltarPosition]} />
        
      <Text style={[styles.textoServico, styles.textoTypo1]}>Serviço:</Text>

      <Pressable style={[styles.online, styles.onlineLayout]} onPress={() => pressionou("online")}>
        <View style={[styles.botaoOnline, styles.botaoLayout,{backgroundColor: (areas["online"][0] ? Color.skyblue : Color.whitesmoke_200)}]} />
        <Text style={[styles.textoOnline, styles.textoTypo, {color:(areas["online"][0] ? Color.skyblue : styles.textoOnline.color)}]}>Online</Text>
        <Image
          style={[styles.imagemOnlineIcon, styles.imagemIconPosition]}
          resizeMode="cover"
          source={require("../assets/imagem-online.png")}
        />
      </Pressable>

      <Pressable style={[styles.presencial, styles.onlineLayout]} onPress={() => pressionou("presencial")}>
        <View style={[styles.botaoPresencial, styles.botaoLayout, {backgroundColor: (areas["presencial"][0] ? Color.skyblue : Color.whitesmoke_200)}]} />
        <Text style={[styles.textoPresencial, styles.textoTypo, {color:(areas["presencial"][0] ? Color.skyblue : styles.textoOnline.color)}]}>
          Presencial
        </Text>
        <Image
          style={[styles.imagemPresencialIcon, styles.imagemIconPosition]}
          resizeMode="cover"
          source={require("../assets/imagem-presencial.png")}
        />
      </Pressable>

      <Pressable style={[styles.recentes, styles.recentesPosition]} onPress={() => pressionou("recentes")}>
        <View style={[styles.botaoOnline, styles.botaoLayout, {backgroundColor: (areas["recentes"][0] ? Color.skyblue : Color.whitesmoke_200)}]} />
        <Text style={[styles.textoOnline, styles.textoTypo, {color:(areas["recentes"][0] ? Color.skyblue : styles.textoOnline.color)}]}>Recentes</Text>
        <Image
          style={[styles.imagemOnlineIcon, styles.imagemIconPosition]}
          resizeMode="cover"
          source={require("../assets/imagem-recentes.png")}
        />
      </Pressable>
      
      <Pressable style={[styles.proximos, styles.recentesPosition]} onPress={() => pressionou("proximos")}>
        <View style={[styles.botaoOnline, styles.botaoLayout, {backgroundColor: (areas["proximos"][0] ? Color.skyblue : Color.whitesmoke_200)}]} />
        <Text style={[styles.textoOnline, styles.textoTypo, {color:(areas["proximos"][0] ? Color.skyblue : styles.textoOnline.color)}]}>Próximos</Text>
        <Image
          style={[styles.imagemPresencialIcon, styles.imagemIconPosition]}
          resizeMode="cover"
          source={require("../assets/imagem-proximos.png")}
        />
      </Pressable>

      
    </View>
  );
};

/*
<Pressable 
        style={styles.areas}
        onPress={filtrarAreas}
      >
        <View style={[styles.botaoAreas, styles.iconLayout]} />
        <Text style={[styles.textoAreas, styles.textoTypo1]}>Áreas</Text>
      </Pressable>

*/
const styles = StyleSheet.create({
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
  textoTypo: {
    height: 20, //15,
    textAlign: "center",
    fontSize: FontSize.size_xs,
    top: 73,
    width: 96,
    fontFamily: FontFamily.roboto,
    left: 0,
    position: "absolute",
  },
  imagemIconPosition: {
    width: 62,
    top: 8,
    position: "absolute",
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
    left: 86,
    fontSize: FontSize.size_lg-4,//FontSize.size_lg,
    color: Color.black,
    width: 203,
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

export default TelaAutonomoFiltragem1;

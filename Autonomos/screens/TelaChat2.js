import * as React from "react";
import { Image, StyleSheet, View, Text, Pressable, FlatList, TextInput, Alert} from "react-native";
import { max } from "react-native-reanimated";
import { FontSize, FontFamily, Color, Margin, Border } from "../GlobalStyles";


//Nome
const nome = "João da Silva";

//Inicializar conversas
const conversas = [
  {  "id": 1,
    "enviou": "02",
    "menssagem": "Olá, tudo bem?"
  },
  {  "id": 2,
  "enviou": "01",
  "menssagem": "Tudo e com você?"
  },
  {  "id": 3,
  "enviou": "02",
  "menssagem": "Está precisando de um programador?\n Eu posso ser a pessoa certa para você !"
  },

  {  "id": 4,
  "enviou": "02",
  "menssagem": "Estou sim! Me passa seu whatsapp."
  },

  {  "id": 5,
  "enviou": "02",
  "menssagem": "Estou sim! Me passa seu whatsapp."
  },
  {  "id": 6,
  "enviou": "02",
  "menssagem": "Estou sim! Me passa seu whatsapp."
  },
  {  "id": 7,
  "enviou": "02",
  "menssagem": "Estou sim! Me passa seu whatsapp."
  },
  {  "id": 8,
  "enviou": "02",
  "menssagem": "Estou sim! Me passa seu whatsapp."
  },

]


const TelaChat2= ({route, navigation}) => {
  const {telefone} = route.params;


  //Inicializar servicos

  const [items, setItems] = React.useState(conversas);
  const [menssagem, setMenssagem] = React.useState("");


  function enviarMenssagem()
  {
    if(menssagem != "" && menssagem != " " && menssagem != "   ")
    {   

        let menssagemPronta = {
            "id": [...items].sort((a, b) => b.id- a.id)[0].id+1,
            "enviou" : "01",
            "menssagem": menssagem
        }

        setMenssagem("");

        setItems([...items,  menssagemPronta]);
    }
  }

  function renderizar(item)
  {
    // Se o item tive enviou 1 eh branco caso contrario eh azul
    let estilo;
    if(item.item.enviou === "01")
    {
        estilo = styles.contornoConversa1;
    }
    else
    {
        estilo = styles.contornoConversa2;
    }
    return(
      <View 
        style={{
        marginVertical: 1,
        marginHorizontal: 1,
        padding: 1 }}
      >

        <Text style={estilo}>
            {item.item.menssagem}
        </Text>


    </View>
    );
  }

  return (
    <View style={styles.telaChat1}>
      <Image
        style={[
          styles.logomarcaAutonomosIcon,
          styles.botaoExcluirServicoPosition,
        ]}
        resizeMode="cover"
        source={require("../assets/logomarca-autonomos1.png")}
      />
      <View style={[styles.linhaSuperior, styles.linhaLayout]} />
      <Text style={styles.textoConversas}> {nome} </Text>
      <Pressable
        style={styles.voltar}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/voltar.png")}
        />
      </Pressable>
 
      <FlatList 
        style={styles.lista}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderizar}
      />

        <TextInput 
                style={styles.entrada}
                value = {menssagem}
                keyboardType="default"
                onChangeText = {text => setMenssagem(text)}
                onFocus = {() => setMenssagem("")}
                maxLength = {1000}
        />

        <Pressable style={styles.botaoEnviar} onPress={enviarMenssagem}>
            <Image source={require("../assets/enviarMenssagem.png")}>

            </Image>
        </Pressable>
    </View>
    
  );
};

const styles = StyleSheet.create({

  lista:{
    left: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
    height: "63%",//500,
    top: "27.59%",
    
  },

  botaoEnviar:
  {
    width: "12%", //"94.4%",
    top: "91.45%",
    right: "2.67%",
    bottom: "1.95%",
    left: "87.93%",
    height: "6.6%",
    position: "absolute",
  },

  entrada: {
    width: "100%", //"94.4%",
    top: "91.45%",
    right: "2.67%",
    bottom: "1.95%",
    left: 0, //"2.93%",
    backgroundColor: Color.whitesmoke_200,
    height: "6.6%",
    position: "absolute",
    color: Color.darkslategray_100,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.roboto,
  },

  contornoConversa1:{
    backgroundColor: Color.whitesmoke_100,
    color: Color.darkslategray_100,
    fontSize: FontSize.size_base,
    textAlign: "center",
    fontFamily: FontFamily.roboto,
    borderRadius: Border.br_lg,
    width: "50%"
  },
  contornoConversa2:{
    backgroundColor: Color.skyblue,
    color: Color.darkslategray_100,
    fontSize: FontSize.size_base,
    textAlign: "center",
    left: "50%",
    fontFamily: FontFamily.roboto,
    borderRadius: Border.br_lg,
    width: "50%"
  },

  botaoConversa2: {
    top: "31.48%",
    right: "0%",
    bottom: "61.92%",
    left: "44.53%",
    backgroundColor: Color.skyblue,
  },
  textoConversa2: {
    width: "100%",//"46.67%",
    top: "33.13%",
    left: "50.4%",
  },

  botaoLayout: {
    borderRadius: Border.br_lg,
    width: "55.47%",
    height: "6.6%",
    position: "absolute",
  },

  textoTypo: {
    color: Color.darkslategray_100,
    fontSize: FontSize.size_base,
    height: "100%",//"7.35%",
    textAlign: "left",
    fontFamily: FontFamily.roboto,
    position: "absolute",
  },

  botaoExcluirServicoPosition: {
    top: 5,//0,
    position: "absolute",
  },
  linhaLayout: {
    height: 1,
    width: "100%",//376,
    borderTopWidth: 1,
    borderColor: "#3f3f3f",
    borderStyle: "solid",
    left: 0,
    position: "absolute",
  },

  linha: {
    height: 1,
    width: "100%",//376,
    borderTopWidth: 1,
    borderColor: "#3f3f3f",
    borderStyle: "solid",
    left: 0,
    position: "absolute",
    top: "100%"
  },
  pintorPosition: {
    left: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
    top: "5%"
  },
 
  logomarcaAutonomosIcon: {
    left: 100,
    width: 175,
    height: 161,
  },
  linhaSuperior: {
    top: 173,
  },
  textoConversas: {
    top: 128,
    left: 0,//52,
    fontSize: FontSize.size_lg-3,//FontSize.size_lg,
    color: Color.black,
    width: "100%",//272,
    height: 40,//34,
    textAlign: "center",
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
    left: 0,
    top: 0,
    position: "absolute",
  },
  

  textoArea:{
  
    fontWeight: "500",
    color: Color.gray,
    fontSize: FontSize.size_sm -3,//FontSize.size_sm,
    fontFamily: FontFamily.roboto,
  },

  pintorPosition1: {
    left: "0%",
    right: "0%",
    width: "100%",
  },

  telaChat1: {
    backgroundColor: Color.white,
    flex: 1,
    height: 667,
    overflow: "hidden",
    width: "100%",
  },

  textoExcluir: {
    height: "100%",//"1.64%",
    width: "100%",//"14.89%",
    top: 0,//"39.43%",
    left: 0, //"79.73%",
    color: Color.white,
    textAlign: "center",
  },

  botaoExcluir: {
    height: "25%", //"4.2%",
    width: "14%",//"16.8%",
    top: "65%", //"38.98%",
    right: "4.53%",
    bottom: "56.82%",
    left: "80.15%",//"78.67%",
    borderRadius: Border.br_sm,
    backgroundColor: Color.indianred,
    position: "absolute",
  },

  imagemPintorIcon: {
    top: "18.52%",
    right: "16.67%",
    bottom: "14.81%",
    left: "80%",//"19.05%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
    borderRadius: Border.br_md-7,//Border.br_md,
    backgroundColor: Color.whitesmoke_200,
  },
});

export default TelaChat2;
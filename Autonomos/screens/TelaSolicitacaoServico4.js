import * as React from "react";
import { Image, StyleSheet, View, Text, Pressable, TextInput,Alert } from "react-native";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";
import {Api} from "../Api"
import Local from "@react-native-community/geolocation"

const TelaSolicitacaoServico4 = ({route, navigation}) => {


  const {telefone, area, quantidade_autonomos, tipo_de_servico, data} = route.params;
  
  const [detalhes, setDetalhes] = React.useState("");
  const [finalizou, setFinalizou] = React.useState(false);

  //obter local
  const obterLocal = ()=>{
    
  }

  obterLocal();

  function finalizar()
  {
    if(detalhes === "" || detalhes === " ")
    {
      Alert.alert("Alerta", "Por favor, preencha os dados corretamente.");
    }
    else
    {
    
      //Salvar dados no banco de dados  
      async function cadastrarServico()
      {

        
        Local.getCurrentPosition((pos)=>{

          Api.post("/servicos/create", {telefone:telefone,
            area: area,
            qntAutonomos: quantidade_autonomos,
            qntDesbloqueada: "0",
            tipo: tipo_de_servico,
            data: new Date(data), 
            detalhes: detalhes,
            latitude: pos.coords.latitude.toString(), 
            longitude: pos.coords.longitude.toString()}).then(res =>{

            navigation.navigate("TelaInicialCliente", {"telefone":telefone})

            }).catch(error =>{
                Alert.alert("Alerta", error.response.data.error);
            return undefined;
            })}, (erro) =>{

              Api.post("/servicos/create", {telefone:telefone,
                area: area,
                qntAutonomos: quantidade_autonomos,
                qntDesbloqueada: "0",
                tipo: tipo_de_servico,
                data: new Date(data), 
                detalhes: detalhes,
                latitude: "0", 
                longitude: "0"}).then(res =>{
    
                navigation.navigate("TelaInicialCliente", {"telefone":telefone})
    
                }).catch(error =>{
                    Alert.alert("Alerta", error.response.data.error);
                return undefined;
                })
          
                  Alert.alert("Alerta !", "Erro ao obter localização.")
          }, 
          {enableHighAccuracy: true, timeout:120000, maximumAge:1000})
     
       
      }

      if(! finalizou)
      {
        setFinalizou(true);
        cadastrarServico(); 
      }
       
    }
    
  }
  return (
    <View style={styles.telaSolicitacaoServicoClien}>

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

      <Image
        style={styles.logomarcaAutonomosIcon}
        resizeMode="cover"
        source={require("../assets/logomarca-autonomos1.png")}
      />

      <Text style={styles.textoSoliciteServico}>Solicite um serviço</Text>

      <View style={[styles.linhaSuperior, styles.voltarPosition]} />

      <Text style={[styles.textoDetalhesDoServico, styles.textoTypo]}>
        Descreva os detalhes do serviço:
      </Text>
      
      <View style={styles.detalhesCampo}>
        <View style={[styles.campoDetalhes, styles.campoDetalhesPosition]}>
          <TextInput 
            style={[styles.textoDetalhes, styles.textoTypo ]}
            value = {detalhes}
            keyboardType="default"
            onChangeText = {text => setDetalhes(text)}
            onFocus = {() => setDetalhes("")}
            maxLength = {1000}
            placeholder="Detalhes"
            placeholderTextColor={styles.textoTypo.color}
            multiline={true}
            enablesReturnKeyAutomatically = {false}
          />
        </View>
      </View>

      <Pressable
        style={styles.finalizar}
        onPress={finalizar}
      >
        <View style={[styles.botaoFinalizar, styles.campoDetalhesPosition]} />
        <Text style={styles.textoFinalizar}>Finalizar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  voltarPosition: {
    left: 0,
    position: "absolute",
  },
  campoDetalhesPosition: {
    borderRadius: Border.br_lg,
    left: "0%",
    bottom: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  textoTypo: {
    color: Color.darkslategray_100,
    fontSize: FontSize.size_base,
    textAlign: "left",
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
  textoSoliciteServico: {
    top: 128,
    left: 57,
    fontSize: FontSize.size_lg-2,//FontSize.size_lg,
    color: Color.black,
    width: 261,
    height: 40,//34,
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
  botaoFinalizar: {
    top: "0%",
    backgroundColor: Color.skyblue,
    height: "100%",
  },
  textoFinalizar: {
    height: "54.55%",
    width: "33.93%",
    top: "22.73%",
    left: "33.04%",
    color: Color.snow,
    fontSize: FontSize.size_base-2,//FontSize.size_base,
    textAlign: "left",
    fontFamily: FontFamily.roboto,
    position: "absolute",
  },
  finalizar: {
    top: 606,
    left: 76,
    width: 224,
    height: 44,
    position: "absolute",
  },
  campoDetalhes: {
    height: "90.5%",
    top: "9.5%",
    backgroundColor: Color.whitesmoke_100,
  },
  textoDetalhes: {
    top: 0,//43,
    left: 22,
    width: "90%",//129,
    height: "90%", //49,
  },
  detalhesCampo: {
    top: 225,
    left: 24,
    width: "84%",//328,
    height: 337,
    position: "absolute",
  },
  textoDetalhesDoServico: {
    height: "4.05%",
    width: "79.2%",
    top: "30%",//"32.08%",
    left: "8.53%",
  },
  telaSolicitacaoServicoClien: {
    backgroundColor: Color.white,
    flex: 1,
    height: 667,
    overflow: "hidden",
    width: "100%",
  },
});

export default TelaSolicitacaoServico4;

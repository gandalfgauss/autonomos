import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable, Alert, TextInput } from "react-native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import {Api} from "../Api"


const TelaConfirmacaoTelefone = ({route, navigation}) => {

  const {tipo_de_usuario, tipo_de_acesso, telefone, nome} = route.params;
  
  const [codigo, setCodigo] = React.useState("");

  // Enviar sms
  const [hasBeenCalled, setHasBeenCalled] = React.useState(false);
  const [codigoEnviado, setCodigoEnviado] = React.useState(Math.floor(Math.random()*10**6).toString());

  React.useEffect(() => {
    if (!hasBeenCalled) {
      Api.post("/sms", {telefone: telefone, codigoEnviado: codigoEnviado}).then(res =>{
        Alert.alert("SMS", "SMS enviado com sucesso !");

      }).catch(error =>{
          Alert.alert("Alerta", "Erro ao enviar o código de verificação !");
          navigation.goBack();
          return error;
        })
      setHasBeenCalled(true);
    }
  }, []);
    
  //Confirmar
  function confirmar()
  {
      // Se nao tiver digitado codigo retorna um alerta
      if(codigo === "" || codigo === " ")
      {
        Alert.alert("Alerta", "Por favor, digite o código !")
      }
      else
      {

        if(codigo !== codigoEnviado)
        {
          Alert.alert("Alerta", "Por favor, digite o código corretamente!")
        }
        else
        {
          if(tipo_de_acesso == "cadastro")
          {
              Api.post("/users/create", {telefone: telefone, tipo: tipo_de_usuario, nome:nome}).then(res =>{
                if(tipo_de_usuario == "cliente")
                {      
                  navigation.navigate("TelaInicialCliente", {"telefone":telefone});
                }
                else
                {
                  //
                  Api.post("/areas/create", {telefone: telefone}).then(res=>{
                    navigation.navigate("TelaInicialAutonomo", {"telefone":telefone});
                  }).catch(error=>{
                    Alert.alert("Alerta !", error.response.data.error)
                  })
                  navigation.navigate("TelaInicialAutonomo", {"telefone":telefone});
                }
            
              }).catch(error =>{

                Alert.alert("Alerta", error.response.data.error);
                return undefined;
              })
          }
          else
          {
            if(tipo_de_usuario == "cliente")
            {      
              navigation.navigate("TelaInicialCliente", {"telefone":telefone});
            }
            else
            {
              navigation.navigate("TelaInicialAutonomo", {"telefone":telefone});
            }
          }         
        }      
      }
  }

  return (
    <View style={styles.telaConfirmacaoTelefone}>
      
      <Pressable
        onPress={() => navigation.goBack()}
      >
        <Image
          style={[styles.voltarIcon, styles.voltarIconPosition]}
          resizeMode="cover"
          source={require("../assets/voltar.png")}
        />
      </Pressable>

      <Image
        style={styles.logomarcaAutonomosIcon}
        resizeMode="cover"
        source={require("../assets/logomarca-autonomos1.png")}
      />

      <Text
        style={[styles.textoConfirmacao, styles.textoTypo, styles.textoTypo2]}
      >
        Confirmação
      </Text>

      <View style={[styles.linhaSuperior, styles.voltarIconPosition]} />

      <View style={styles.confirmacaoDosDigitos}>
        <Text
          style={[
            styles.textoDigiteOsDigitos,
            styles.textoTypo,
            styles.textoTypo1,
          ]}
        >
          Digite o código enviado para você:
        </Text>
        <View style={styles.codigo}>
          <View style={[styles.botaoTelefone, styles.botaoPosition]} />
          <TextInput
            style={[styles.textoTypo, styles.textoTypo1, {width:"100%"}]}
            value = {codigo}
            keyboardType="phone-pad"
            onChangeText = {text => setCodigo(text)}
            onFocus = {() => setCodigo("")}
            maxLength = {20}
            placeholder="Código"
            placeholderTextColor={styles.textoTypo1.color}
          >
          </TextInput>
        </View>
      </View>

      <Pressable
        style={styles.confirmar}
        onPress={confirmar}
      >
        <View style={[styles.botaoConfirmar, styles.botaoPosition]} />
        <Text
          style={[styles.textoConfirmar, styles.textoTypo, styles.textoTypo2]}
        >
          Confirmar
        </Text>
      </Pressable>
      
    </View>
  );
};

const styles = StyleSheet.create({
  textoTypo: {
    textAlign: "left",
    fontFamily: FontFamily.roboto,
    position: "absolute",
  },
  textoTypo1: {
    color: Color.darkslategray_100,
    textAlign: "left",
    fontFamily: FontFamily.roboto,
    fontSize: FontSize.size_base -2,//FontSize.size_base,
  },
  botaoPosition: {
    borderRadius: Border.br_lg,
    left: "0%",
    right: "0%",
    top: "0%",
    position: "absolute",
    width: "100%",
  },
  textoTypo2: {
    textAlign: "left",
    fontFamily: FontFamily.roboto,
  },
  voltarIconPosition: {
    left: 0,
    position: "absolute",
  },
  logomarcaAutonomosIcon: {
    left: 100,
    width: 175,
    height: 161,
    top: 0,
    position: "absolute",
  },
  textoDigiteOsDigitos: {
    height: "21.87%",//"20.87%",
    width: "88.25%",
    left: "6.02%",
    top: "0%",
    color: Color.darkslategray_100,
  },
  botaoTelefone: {
    height: "75.86%",
    bottom: "24.14%",
    backgroundColor: Color.whitesmoke_100,
  },
  textoTelefone: {
    height: "50.48%",//"34.48%",
    width: "26.17%",
    top: "15.52%",
    left: "4.36%",
  },
  codigo: {
    top: 86,
    left: 26,
    width: 298,
    height: 58,
    position: "absolute",
  },
  confirmacaoDosDigitos: {
    top: 282,
    left: 13,
    width: 349,
    height: 115,
    position: "absolute",
  },
  botaoConfirmar: {
    height: "97.78%",
    bottom: "2.22%",
    backgroundColor: Color.skyblue,
  },
  textoConfirmar: {
    height: "77.78%",
    width: "35.86%",
    top: "22.22%",
    left: "32.27%",
    color: Color.snow,
    fontSize: FontSize.size_base -2,//FontSize.size_base,
    textAlign: "left",
    fontFamily: FontFamily.roboto,
  },
  confirmar: {
    top: 519,
    left: 62,
    width: 251,
    height: 45,
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
  textoConfirmacao: {
    top: 128,
    left: 101,
    fontSize: FontSize.size_lg -3, //FontSize.size_lg,
    color: Color.black,
    width: 173,
    height: 40,//34,
  },
  voltarIcon: {
    width: 48,
    height: 48,
    top: 0,
  },
  telaConfirmacaoTelefone: {
    backgroundColor: Color.white,
    flex: 1,
    height: 667,
    overflow: "hidden",
    width: "100%",
  },
});

export default TelaConfirmacaoTelefone;

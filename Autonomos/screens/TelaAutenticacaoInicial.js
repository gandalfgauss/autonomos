import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Border, FontSize, Color } from "../GlobalStyles";

const TelaAutenticacaoInicial = () => {
  const navigation = useNavigation();

  // Mudar as cores do botao de profissional e cliente ao clicar
  const [cor_botao_profissional, setCorBotaoProfissional] = React.useState(false);
  const [cor_botao_cliente, setCorBotaoCliente] = React.useState(false);

  function apertou_botao_profissional(){
    if(cor_botao_profissional === false){
      setCorBotaoProfissional(true);
      setCorBotaoCliente(false);
    }
    else{
      setCorBotaoProfissional(false);
    }
  }

  function apertou_botao_cliente(){
    if(cor_botao_cliente === false){
      setCorBotaoCliente(true);
      setCorBotaoProfissional(false);
    }
    else{
      setCorBotaoCliente(false)
    }
  }
  //--------------------------------------------------------------------------------------------

  //Trabalhar com telefone
  const [telefone, setTelefone] = React.useState("");


  //Clicou acessar
  function clicou_acessar()
  {
    // Se estiver vazio ou nao tiver marcado uma opcao retorna um alerta
    if(telefone === "" || telefone === " " || (! cor_botao_cliente && !cor_botao_profissional))
    {
      Alert.alert("Alerta", "Por favor, preencha os dados corretamente");
    }
    else
    {
      //Caso contrario navega ate a tela de confirmacao de telefone
      // Passar como parametro se eh um profissional ou um cliente
      const tipo_de_usuario = cor_botao_cliente ? "cliente" : "profissional";
      navigation.navigate("TelaConfirmacaoTelefone", 
        {"tipo_de_usuario" : tipo_de_usuario, "tipo_de_acesso": "login"});
    }
    
  }

  return (
    <View style={styles.telaAutenticacaoInicial}>
      <Image
        style={styles.logomarcaAutonomosIcon}
        resizeMode="cover"
        source={require("../assets/logomarca-autonomos22.png")}
      />
      <Text style={[styles.textoDeLogin, styles.textoTypo2]}>Login</Text>
      <Pressable 
        style={[styles.acessarAConta, styles.acessarAContaPosition]}
        onPress = {clicou_acessar}
      >
        <View style={[styles.botaoAcessar, styles.botaoPosition1]} />
        <Text
          style={[styles.textoAcessar, styles.textoTypo1, styles.textoTypo2]}
        >
          Acessar
        </Text>
      </Pressable>
      <Pressable
        style={styles.textoBotaoCriarConta}
        onPress={() => navigation.navigate("TelaDeCadastro")}
      >
        <Text style={[styles.noTemUmaContaToquePara, styles.textoTypo]}>
          Não tem uma conta? Toque para criar uma agora.
        </Text>
      </Pressable>
      <View style={styles.linhaInferior} />
      <View style={styles.identificacao}>
        <Pressable 
          style={[styles.profissional, styles.clientePosition1]}
          onPress={apertou_botao_profissional}
        >
          <Text
            style={[
              styles.textoProfissional,
              styles.textoTypo,
              styles.textoTypo1,
            ]}
          >
            Profissional
          </Text>
          <View
            style={[
              styles.botaoProfissional,
              styles.botaoPosition,
              styles.profissionalPosition,
              {backgroundColor: (cor_botao_profissional ? Color.skyblue : Color.whitesmoke_200)}
            ]}
          />
          <Image
            style={[
              styles.imagemProfissionalIcon,
              styles.imagemIconLayout,
              styles.profissionalPosition,
            ]}
            resizeMode="cover"
            source={require("../assets/imagem-profissional.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.cliente, styles.clientePosition1]}
          onPress={apertou_botao_cliente}
        >
          <View
            style={[
              styles.botaoCliente,
              styles.clientePosition,
              styles.botaoPosition,,
              {backgroundColor:(cor_botao_cliente ? Color.skyblue : Color.whitesmoke_200)}
            ]}
          />
          <Text
            style={[styles.textoCliente, styles.textoTypo, styles.textoTypo1]}
          >
            Cliente
          </Text>
          <Image
            style={[
              styles.imagemClienteIcon,
              styles.clientePosition,
              styles.imagemIconLayout,
            ]}
            resizeMode="cover"
            source={require("../assets/imagem-cliente.png")}
          />
        </Pressable>
        <Text style={[styles.textoEuSou, styles.textoTypo, styles.textoTypo1]}>
          Eu sou:
        </Text>
      </View>
      <View style={[styles.telefoneUsuario, styles.acessarAContaPosition]}>
        <View style={[styles.botaoTelefone, styles.botaoPosition1]} />
        <TextInput
          style={[styles.textoTypo, styles.textoTypo1, {width:"100%"}]}
          value = {telefone}
          keyboardType="phone-pad"
          onChangeText = {text => setTelefone(text)}
          onFocus = {() => setTelefone("")}
          maxLength = {20}
          placeholder="Telefone"
          placeholderTextColor={styles.textoTypo.color}
        >
        </TextInput>
          
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textoTypo2: {
    textAlign: "left",
    fontFamily: FontFamily.roboto,
  },
  acessarAContaPosition: {
    width: 298,
    left: 38,
    position: "absolute",
  },
  botaoPosition1: {
    borderRadius: Border.br_lg,
    top: "0%",
    left: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  textoTypo1: {
    fontSize: FontSize.size_base -4,//FontSize.size_base,
    position: "absolute",
  },
  textoTypo: {
    color: Color.darkslategray_100,
    textAlign: "left",
    fontFamily: FontFamily.roboto,
  },
  clientePosition1: {
    top: "43.52%",
    position: "absolute",
  },
  botaoPosition: {
    backgroundColor: Color.whitesmoke_200,
    borderRadius: Border.br_lg,
    left: "0%",
    top: "0%",
  },
  profissionalPosition: {
    bottom: "29.17%",
    position: "absolute",
  },
  imagemIconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  clientePosition: {
    bottom: "27.14%",
    position: "absolute",
  },
  logomarcaAutonomosIcon: {
    top: 0,
    left: 47,
    width: 282,
    height: 258,
    position: "absolute",
  },
  textoDeLogin: {
    top: 221,
    left: 134,
    fontSize: FontSize.size_xl -1,//FontSize.size_xl,
    color: Color.black,
    width: 106,
    height: 78,
    position: "absolute",
  },
  botaoAcessar: {
    height: "77.19%",
    bottom: "22.81%",
    backgroundColor: Color.skyblue,
  },
  textoAcessar: {
    height: "33.33%",
    width: "24.83%",
    top: "17.54%",
    left: "37.58%",
    color: Color.snow,
  },
  acessarAConta: {
    top: 547,
    height: 57,
  },
  noTemUmaContaToquePara: {
    fontSize: FontSize.size_xs -2, //FontSize.size_xs,
    width: 353,
    height: 31,
  },
  textoBotaoCriarConta: {
    left: 11,
    top: 636,
    position: "absolute",
  },
  linhaInferior: {
    top: 628,
    left: 0,
    borderStyle: "solid",
    borderColor: "#3f3f3f",
    borderTopWidth: 1,
    width: "100%",//376,
    height: 1,
    position: "absolute",
  },
  textoProfissional: {
    height: "29.17%",
    top: "70.83%",
    left: "0%",
    width: "100%",
  },
  botaoProfissional: {
    height: "70.83%",
    width: "87.93%",
    right: "12.07%",
  },
  imagemProfissionalIcon: {
    width: "41.38%",
    top: "4.17%",
    right: "29.31%",
    left: "29.31%",
    height: "66.67%",
  },
  profissional: {
    width: "42.49%",
    right: "57.51%",
    bottom: "-10.19%",
    height: "66.67%",
    left: "0%",
  },
  botaoCliente: {
    height: "72.86%",
    right: "0%",
    width: "100%",
  },
  textoCliente: {
    height: "30%",
    width: "69.61%",
    top: "70%",
    left: "22.55%",
  },
  imagemClienteIcon: {
    height: "68.57%",
    width: "47.06%",
    top: "4.29%",
    right: "19.61%",
    left: "33.33%",
  },
  cliente: {
    height: "64.81%",
    width: "37.36%",
    bottom: "-8.33%",
    left: "62.64%",
    right: "0%",
  },
  textoEuSou: {
    height: "19.44%",
    width: "26.01%",
    top: "3.7%",
    left: "4.03%",
  },
  identificacao: {
    top: 388,
    left: 50,
    width: 273,
    height: 108,
    position: "absolute",
  },
  botaoTelefone: {
    height: "75.86%",
    bottom: "24.14%",
    backgroundColor: Color.whitesmoke_100,
  },
  textoTelefone: {
    height: "34.48%",
    width: "26.17%",
    top: "15.52%",
    left: "4.36%",
  },
  telefoneUsuario: {
    top: 318,
    height: 58,
  },
  telaAutenticacaoInicial: {
    backgroundColor: Color.white,
    flex: 1,
    height: 667,
    overflow: "hidden",
    width: "100%",
  },
});

export default TelaAutenticacaoInicial;

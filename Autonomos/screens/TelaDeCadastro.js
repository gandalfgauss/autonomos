import * as React from "react";
import { Image, StyleSheet, View, Text, Pressable, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Border, FontFamily, Color, FontSize } from "../GlobalStyles";

const TelaDeCadastro = () => {
  const navigation = useNavigation();


  // Nome do usuario
  const [nome, setNome] = React.useState("");

  // Telefone do usuario
  const [telefone, setTelefone] = React.useState("");

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
  
  // Cadastrar
  function cadastrar()
  {
    // Se telefone ou nome estiver vazio, ou nao tiver marcado uma opcao retorna um alerta
    if(telefone === "" || telefone === " " || nome === "" ||nome === " " || (! cor_botao_cliente && !cor_botao_profissional))
    {
      Alert.alert("Alerta", "Por favor, preencha os dados corretamente.");
    }
    else
    {
          
      const tipo = cor_botao_cliente ? "cliente" : "profissional";


      navigation.navigate("TelaConfirmacaoTelefone", 
      {"tipo_de_usuario" : tipo, 
        "tipo_de_acesso": "cadastro",
        "telefone": telefone,
        "nome" : nome});

    }
  }

  return (
    <View style={styles.telaDeCadastro}>

      <Pressable
        style={[styles.voltar, styles.voltarPosition]}
        onPress={() => navigation.navigate("TelaAutenticacaoInicial")}
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

      <Text
        style={[styles.textoMeFaleMais, styles.textoTypo, styles.textoTypo2]}
      >
        Me fale mais sobre você
      </Text>

      <View style={[styles.linhaSuperior, styles.voltarPosition]} />

      <View style={[styles.nome, styles.nomeLayout]}>
        <Text
          style={[
            styles.textoQualSeuNome,
            styles.textoTypo,
            styles.textoTypo1,
            styles.textoPosition, 
          ]}
        >
          Qual é o seu nome?
        </Text>
        <View style={styles.campoNome}>
          <View style={[styles.botaoNome, styles.botaoPosition1]} />
          <TextInput 
            style={[styles.textoTypo, styles.textoTypo1, {width:"100%"}]}
            value = {nome}
            keyboardType="default"
            onChangeText = {text => setNome(text)}
            onFocus = {() => setNome("")}
            maxLength = {40}
            placeholder="Nome"
            placeholderTextColor={styles.textoTypo1.color}
            autoCapitalize="words"
          />
        </View>      
      </View>
      
      <View style={[styles.telefone, styles.nomeLayout]}>
        <Text
          style={[
            styles.textoQualSeuNome,
            styles.textoTypo,
            styles.textoTypo1,
            styles.textoPosition,
          ]}
        >
          Telefone:
        </Text>
        <View style={styles.campoNome} >
          <View style={[styles.botaoNome, styles.botaoPosition1]} />
          <TextInput 
            style={[styles.textoTypo, styles.textoTypo1, {width:"100%"}]}
            value = {telefone}
            keyboardType="phone-pad"
            onChangeText = {text => setTelefone(text)}
            onFocus = {() => setTelefone("")}
            maxLength = {20}
            placeholder="Telefone"
            placeholderTextColor={styles.textoTypo1.color}
          />
        </View>   
      </View>
      
      <View style={styles.caracteristica}>
        <Text
          style={[
            styles.textoEuSou,
            styles.textoTypo,
            styles.textoTypo1,
            styles.textoPosition,
          ]}
        >
          Eu sou:
        </Text>
        <Pressable 
          style={[styles.profissional, styles.clientePosition1]}
          onPress={apertou_botao_profissional}
        >
          <Text
            style={[
              styles.textoProfissional,
              styles.textoTypo,
              styles.textoTypo1,
              {color:(cor_botao_profissional ? Color.skyblue : styles.textoTypo1.color)}
            ]}
          >
            Profissional
          </Text>
          <View
            style={[
              styles.botaoProfissional,
              styles.botaoPosition,
              styles.profissionalPosition,
              {backgroundColor:(cor_botao_profissional ? Color.skyblue : Color.whitesmoke_200)}
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
              styles.botaoPosition,
              {backgroundColor:(cor_botao_cliente ? Color.skyblue : Color.whitesmoke_200)}
            ]}
          />
          <Text
            style={[styles.textoCliente, styles.textoTypo, styles.textoTypo1,
              {color:(cor_botao_cliente ? Color.skyblue : styles.textoTypo1.color)}]}
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
      </View>

      <Pressable 
        style={styles.cadastrar}
        onPress={cadastrar}
      >
        <View
          style={[
            styles.botaoCadastrar,
            styles.iconLayout,
            styles.botaoPosition1,
          ]}
        />
        <Text
          style={[styles.textoCadastrar, styles.textoTypo, styles.textoTypo2]}
        >
          Cadastrar
        </Text>
      </Pressable>

    </View>
  );
};

const styles = StyleSheet.create({
  nomeLayout: {
    height: 95,
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
  },
  textoTypo: {
    textAlign: "left",
    fontFamily: FontFamily.roboto,
    position: "absolute",
  },
  textoTypo1: {
    color: Color.darkslategray_100,
    textAlign: "left",
    fontFamily: FontFamily.roboto,
    fontSize: FontSize.size_base-2,
  },
  textoPosition: {
    top: "0%",
    color: Color.darkslategray_100,
    left: "0%",
  },
  voltarPosition: {
    left: 0,
    position: "absolute",
  },
  textoTypo2: {
    fontFamily: FontFamily.roboto,
    textAlign: "left",
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  clientePosition1: {
    top: "37.39%",
    position: "absolute",
  },
  botaoPosition: {
    backgroundColor: Color.whitesmoke_200,
    borderRadius: Border.br_lg,
    top: "0%",
    left: "0%",
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
    left: 100,
    width: 175,
    height: 161,
    top: 0,
    position: "absolute",
  },
  botaoNome: {
    height: "75.86%",
    bottom: "24.14%",
    backgroundColor: Color.whitesmoke_100,
    width: "100%",
  },
  textoNome: {
    height: "84.48%",
    width: "43.29%",
    top: "15.52%",
    left: "6.71%",
  },
  campoNome: {
    height: "61.05%",
    top: "38.95%",
    left: "0%",
    bottom: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  textoQualSeuNome: {
    height: "51.58%",
    width: "59.73%",
  },
  nome: {
    top: 218,
  },
  telefone: {
    top: 331,
  },
  linhaSuperior: {
    top: 173,
    borderStyle: "solid",
    borderColor: "#3f3f3f",
    borderTopWidth: 1,
    width: "100%",
    height: 1,
  },
  textoMeFaleMais: {
    top: 130,
    left: 23,
    fontSize: FontSize.size_lg,
    color: Color.black,
    width: 328,
    height: 35,
  },
  botaoCadastrar: {
    backgroundColor: Color.skyblue,
    bottom: "0%",
  },
  textoCadastrar: {
    height: "79.55%",
    width: "35.06%",
    top: "20.45%",
    left: "32.27%",
    color: Color.snow,
    fontSize: FontSize.size_base-2,
    fontFamily: FontFamily.roboto,
  },
  cadastrar: {
    top: 587,
    left: 62,
    width: 251,
    height: 44,
    position: "absolute",
  },
  voltar: {
    width: 48,
    height: 48,
    top: 0,
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
    height: "66.67%",
    width: "41.38%",
    top: "4.17%",
    right: "29.31%",
    left: "29.31%",
  },
  profissional: {
    height: "62.61%",
    width: "42.49%",
    right: "57.51%",
    left: "0%",
    bottom: "0%",
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
    height: "60.87%",
    width: "37.36%",
    bottom: "1.74%",
    left: "62.64%",
    right: "0%",
  },
  textoEuSou: {
    height: "18.26%",
    width: "26.01%",
  },
  caracteristica: {
    top: 434,
    left: 40,
    width: 273,
    height: 115,
    position: "absolute",
  },
  telaDeCadastro: {
    backgroundColor: Color.white,
    flex: 1,
    height: 667,
    overflow: "hidden",
    width: "100%",
  },
});

export default TelaDeCadastro;

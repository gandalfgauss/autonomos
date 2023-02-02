import * as React from "react";
import { Image, StyleSheet, View, Text, Pressable, TextInput, Alert } from "react-native";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";

const TelaSolicitacaoServico2 = ({route, navigation}) => {
  
  const {telefone, area} = route.params;
  const titulos ={
    professor: "Professor",
    desenvolvedor: "Desenvolvedor",
    pintor: "Pintor",
    diarista: "Diarista",
    pedreiro: "Pedreiro",
    montador: "Montador",
    manutencao: "Manutenção",
    engenheiro: "Engenheiro",
    arquiteto: "Arquiteto",
    medico: "Médico",
    motorista: "Motorista",
    voluntario: "Trabalho Voluntário"
   
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

  const [qtdAutonomos, setQtdAutonomos] = React.useState("");


   // Mudar as cores dos botoes online e presencial ao clicar
   const [cor_botao_presencial, setCorBotaoPresencial] = React.useState(false);
   const [cor_botao_online, setCorBotaoOnline] = React.useState(false);
 
   function apertou_botao_presencial(){
     if(cor_botao_presencial === false){
       setCorBotaoPresencial(true);
       setCorBotaoOnline(false);
     }
     else{
       setCorBotaoPresencial(false);
     }
   }
 
   function apertou_botao_online(){
     if(cor_botao_online === false){
       setCorBotaoOnline(true);
       setCorBotaoPresencial(false);
     }
     else{
       setCorBotaoOnline(false)
     }
   }
   //--------------------------------------------------------------------------------------------
 
   function apertou_proximo()
   {
      
      const quantidade = Number.parseInt(qtdAutonomos);

      // Verificar se a quantidade de autonomos eh maior que 0 e se marcou alguma opcao
      if(quantidade > 0 && (cor_botao_online || cor_botao_presencial))
      {
        const tipo_de_servico = cor_botao_online ? "online" : "presencial";
        navigation.navigate("TelaSolicitacaoServico3", 
        {"telefone" : telefone, 
        "area": area,
        "quantidade_autonomos": quantidade,
        "tipo_de_servico": tipo_de_servico
        });
      }
      else
      {
        Alert.alert("Alerta", "Por favor, preencha os dados corretamente.");
      }
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
      <Pressable
        style={styles.proximo}
        onPress={apertou_proximo}
      >
        <View
          style={[
            styles.botaoProximo,
            styles.botaoPosition1,
            styles.pintorPosition,
          ]}
        />
        <Text style={styles.textoProximo}>Próximo</Text>
      </Pressable>
      <View style={[styles.quantidadeDeAutonomos, styles.tipoServicoPosition]}>
        <Text
          style={[
            styles.textoQuantidadeDeAutonomos,
            styles.textoTypo1,
            styles.textoLayout,
          ]}
        >
          Quantos Autônomos podem lhe contatar?
        </Text>
        <View
          style={[styles.botaoQuantidadeDeAutonomos, styles.botaoPosition1]}
        >
          <TextInput
            style={styles.textoTypo1}
            value = {qtdAutonomos}
            keyboardType="number-pad"
            onChangeText = {text => {setQtdAutonomos(text)}}
            onFocus = {() => setQtdAutonomos("")}
            maxLength = {3}
            placeholder="Quantidade"
            placeholderTextColor={styles.textoTypo1.color}>
          </TextInput>
        </View>
      </View>
      <View style={[styles.tipoServico, styles.tipoServicoPosition]}>
        <Text
          style={[
            styles.textoTipoServico,
            styles.textoTypo1,
            styles.textoLayout,
          ]}
        >
          Tipo do Serviço:
        </Text>
        <Pressable 
          style={[styles.online, styles.onlinePosition]}
          onPress={apertou_botao_online}
        >
          <View 
            style={[styles.botaoOnline, 
                    styles.botaoPosition, 
                    {backgroundColor:(cor_botao_online ? Color.skyblue : Color.whitesmoke_200)}]
                  } 
          />
          <Text 
            style={[styles.textoOnline, 
                    styles.textoTypo, 
                    {color:(cor_botao_online ? Color.skyblue : styles.textoOnline.color)}]}
          >
            Online
          </Text>
          <Image
            style={[styles.imagemOnlineIcon, styles.imagemIconLayout]}
            resizeMode="cover"
            source={require("../assets/imagem-online.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.presencial, styles.onlinePosition]}
          onPress={apertou_botao_presencial}
        >
          <View 
            style={[styles.botaoPresencial, 
                    styles.botaoPosition,
                    {backgroundColor:(cor_botao_presencial ? Color.skyblue : Color.whitesmoke_200)}]}
          />
          <Text 
            style={[styles.textoPresencial, 
                    styles.textoTypo,
                    {color:(cor_botao_presencial ? Color.skyblue : styles.textoPresencial.color)}]}
            
          >
            Presencial
          </Text>
          <Image
            style={[styles.imagemPresencialIcon, styles.imagemIconLayout]}
            resizeMode="cover"
            source={require("../assets/imagem-presencial.png")}
          />
        </Pressable>
      </View>
      <View style={styles.servicoSolicitado}>
        <Text style={[styles.textoServicoSolicitado, styles.textoTypo1]}>
          Serviço Solicitado:
        </Text>
        <View style={[styles.pintor, styles.pintorPosition]}>
          <View style={[styles.botaoOnline, styles.botaoPosition]} />
          <Text style={[styles.textoOnline, styles.textoTypo]}>{titulos[area]}</Text>
          <Image
            style={[styles.imagemPintorIcon, styles.imagemIconLayout]}
            resizeMode="cover"
            source={imagens[area]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  voltarPosition: {
    left: 0,
    position: "absolute",
  },
  botaoPosition1: {
    borderRadius: Border.br_lg,
    left: "0%",
    position: "absolute",
  },
  pintorPosition: {
    right: "0%",
    top: "0%",
  },
  tipoServicoPosition: {
    width: 309,
    left: 33,
    position: "absolute",
  },
  textoTypo1: {
    color: Color.darkslategray_100,
    fontSize: FontSize.size_base-4,//FontSize.size_base,
    textAlign: "left",
    fontFamily: FontFamily.roboto,
    position: "absolute",
    width:"100%",
    height:"100%",
  },
  textoLayout: {
    width: "96.12%",
    color: Color.darkslategray_100,
    top: "0%",
  },
  onlinePosition: {
    bottom: "0%",
    top: "29.7%",
    width: "31.07%",
    height: "70.3%",
    position: "absolute",
  },
  botaoPosition: {
    borderRadius: Border.br_md,
    left: "5.32%",
    bottom: "22.86%",
    right: "5.32%",
    width: "89.36%",
    height: "77.14%",
    top: "0%",
    position: "absolute",
  },
  textoTypo: {
    textAlign: "center",
    fontSize: FontSize.size_xs-2,//FontSize.size_xs,
    top: "82.86%",
    height: "40.14%",//"17.14%",
    left: "0%",
    fontFamily: FontFamily.roboto,
    position: "absolute",
    width: "100%",
  },
  imagemIconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
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
  botaoProximo: {
    height: "75.86%",
    bottom: "24.14%",
    backgroundColor: Color.skyblue,
    width: "100%",
  },
  textoProximo: {
    height: "41.38%",
    width: "33.93%",
    top: "15.52%",
    left: "33.04%",
    color: Color.snow,
    fontSize: FontSize.size_base-2,//FontSize.size_base,
    textAlign: "left",
    fontFamily: FontFamily.roboto,
    position: "absolute",
  },
  proximo: {
    top: 605,
    left: 76,
    width: 224,
    height: 58,
    position: "absolute",
  },
  textoQuantidadeDeAutonomos: {
    left: "2.59%",
    height: "42.98%",
  },
  botaoQuantidadeDeAutonomos: {
    height: "38.6%",
    width: "96.44%",
    top: "47.37%",
    right: "3.56%",
    bottom: "14.04%",
    backgroundColor: Color.whitesmoke_100,
  },
  textoBotaoQuantidadeDeAuto: {
    width: "41.75%",
    top: "57.02%",
    left: "7.12%",
    height: "42.98%",
  },
  quantidadeDeAutonomos: {
    top: 298,
    height: 114,
  },
  textoTipoServico: {
    height: "21.67%",
    left: "3.88%",
  },
  botaoOnline: {
    backgroundColor: Color.whitesmoke_200,
  },
  textoOnline: {
    color: Color.gray,
  },
  imagemOnlineIcon: {
    height: "68.5%",
    width: "64.59%",
    top: "9.13%",
    right: "16.66%",
    bottom: "22.37%",
    left: "18.75%",
  },
  online: {
    right: "68.93%",
    left: "0%",
  },
  botaoPresencial: {
    backgroundColor: Color.whitesmoke_200,
  },
  textoPresencial: {
    color: Color.gray,
  },
  imagemPresencialIcon: {
    height: "58.1%",
    width: "64.89%",
    top: "8.57%",
    right: "18.09%",
    bottom: "33.33%",
    left: "17.02%",
  },
  presencial: {
    right: "11.65%",
    left: "57.28%",
  },
  tipoServico: {
    top: 438,
    height: 125,
  },
  textoServicoSolicitado: {
    height: "55.68%",
    width: "62.37%",
    top: "44.32%",
    left: "0%",
  },
  imagemPintorIcon: {
    height: "51.43%",
    width: "57.45%",
    top: "14.29%",
    right: "20.21%",
    bottom: "34.29%",
    left: "22.34%",
  },
  pintor: {
    height: "99.54%",
    width: "34.8%",//"32.54%",
    bottom: "0.46%",
    left: "67.46%",
    position: "absolute",
  },
  servicoSolicitado: {
    top: 184,
    left: 40,
    width: 295,
    height: 88,
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

export default TelaSolicitacaoServico2;

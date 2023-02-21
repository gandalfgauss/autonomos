import * as React from "react";
import { Image, StyleSheet, View, Text, Pressable, ScrollView, Alert} from "react-native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";
import { Api } from "../Api";

//Nome da areas reais
const areas  = {
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

//Tipo de servico
const tipo_de_servico  = {
  "online": "Online",
  "presencial":"Presencial"
}

// Meses do ano
const meses = {
  "01": "Janeiro",
  "02": "Fevereiro",
  "03": "Março",
  "04": "Abril",
  "05": "Maio",
  "06": "Junho",
  "07": "Julho",
  "08": "Agosto",
  "09": "Setembro",
  "10": "Outubro",
  "11": "Novembro",
  "12": "Dezembro",
}

//Converter data americana para brasileira no formato de impressao
function converteDataString(data_americana)
{
  let data_brasileira = data_americana.substring(0,10).split('-').reverse().join('/');
  let data_str = `Até ${data_brasileira.substring(0,2)} de ${meses[data_brasileira.substring(3,5)]} de ${data_brasileira.substring(6,10)}`


  return data_str;
}

//Imagens
const imagens ={
  "professor": require("../assets/imagem-professor.png"),
  "desenvolvedor": require("../assets/imagem-desenvolvedor.png"),
  "pintor": require("../assets/imagem-pintor.png"),
  "diarista": require("../assets/imagem-diarista.png"),
  "pedreiro": require("../assets/imagem-pedreiro.png"),
  "montador": require("../assets/imagem-montador.png"),
  "manutencao": require("../assets/imagem-manutencao.png"),
  "engenheiro": require("../assets/imagem-engenheiro.png"),
  "arquiteto": require("../assets/imagem-arquiteto.png"),
  "medico": require("../assets/imagem-medico.png"),
  "motorista": require("../assets/imagem-motorista.png"),
  "voluntario": require("../assets/imagem-trabalho-voluntario.png")
 
}

//Inicializar servicos
const servicoAux =
  {  "id": "XX",
    "nome": "XXXX XXXX",
    "area": "voluntario",
    "qntAutonomos": 0,
    "qntDesbloqueada": 0,
    "tipo": "XXXXx",
    "detalhes": "0",
    "data": "2022-02-22"
}


const TelaAutonomoAnalisarProposta= ({route, navigation}) => {
  const {id, km, telefone} = route.params;
  const [servico, setServico] = React.useState(servicoAux);
  const [nome, setNome] = React.useState(servicoAux.nome);
  React.useEffect(()=>{
    Api.post("/servicos/id", {id:id}).then(res =>{
      let objeto=res.data;

      Api.post("/Users/auth", {telefone: objeto["telefone"], tipo:"cliente"}).then(res2 =>{
        setNome(res2.data.nome)
      }).catch((error)=>{

      })

      setServico(objeto);

    }).catch(error =>{
          Alert.alert("Alerta", error.response.data.error);
      return [];
  }) 
  }, [])

  function desbloquearChat()
  {

    
    
    Api.post("/conversas/create", {telefoneCliente: servico.telefone,
      telefoneProfissional: telefone,
      area : servico.area, 
      qntAutonomos : servico.qntAutonomos, 
      tipo: servico.tipo, 
      data: new Date(servico.data),
     detalhes: servico.detalhes}).then(res=>{

      //Acrescentar 1 no contador
      Api.post("/servicos/desbloqueou", {id:id}).then(res2=>{}).catch(error=>{Alert.alert("Alerta ! Erro ao acrescentar 1 no contador !")})

     }).catch(error=>{Alert.alert("Alerta ! Usuário já desbloqueado !")});

    navigation.navigate("TelaInicialAutonomo", {"telefone": telefone});
  }

  return (
    <View style={styles.telaChat1}>

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

      <Image
        style={[
          styles.logomarcaAutonomosIcon,
          styles.botaoExcluirServicoPosition,
        ]}
        resizeMode="cover"
        source={require("../assets/logomarca-autonomos1.png")}
      />

      <Text style={styles.textoConversas}> Analisar Proposta </Text>
    
      <View style={[styles.linhaSuperior, styles.linhaLayout]} />
       
      <ScrollView
        style={styles.lista}
      >
        <View 
          style={{
          marginVertical: 1,
          marginHorizontal: 1,
          padding: 0 }}
        >
          <Pressable> 
            <Text style={styles.textoArea }>
              <Text style={{ fontWeight: 'bold' }}>{areas[servico.area]}.{"\n\n\n\n"} </Text>
              Cliente {nome}.{"\n\n"}
              {servico.qntAutonomos} Autônomos.{"\n"}
              Desbloquearam: {servico.qntDesbloqueada}{"\n\n"}
              {tipo_de_servico[servico.tipo]}. {km}{"\n\n"}
              {servico.detalhes}.{"\n"}
              {converteDataString(servico.data)}.
            </Text>

            <View style={[styles.pintor1, styles.pintorPosition]}>
              <Image
                style={styles.imagemPintorIcon}
                resizeMode="cover"
                source={imagens[servico.area]}
              />
            </View>
          </Pressable>      
        </View>
      </ScrollView>

      <Pressable
        style={styles.filtrar}
        onPress={desbloquearChat}
      >
        <View style={[styles.botaoFiltrar, styles.botaoPosition]} />
        <Text style={[styles.textoFiltrar, styles.textoTypo1]}> Desbloquear Chat </Text>
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
    height: "55%",
    top: "27.59%",
  },

  botaoPintor: {
    bottom: "0%",
    borderRadius: Border.br_md,
    backgroundColor: Color.whitesmoke_200,
    height: "100%",
  },

  textoTypo1: {
    textAlign: "left",
    fontFamily: FontFamily.roboto,
    position: "absolute",
  },

  botaoPosition: {
    bottom: "0%",
    height: "100%",
    top: "0%",
    left: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },

  botaoFiltrar: {
    borderRadius: Border.br_lg,
    backgroundColor: Color.skyblue,
  },
  textoFiltrar: {
    height: "54.55%",
    width: "100%", //"24.11%",
    top: "21%",//"20.45%",
    left:"15%", //"37.95%",
    fontSize: FontSize.size_base-2,//FontSize.size_base,
    color: Color.snow,
  },
  
  filtrar: {
    top: "87%",//588,
    left: 76,
    width: 224,
    height: 44,
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
    top: "10%"
  },
  textoTypo: {
    fontSize: FontSize.size_sm -3,//FontSize.size_sm,
    fontFamily: FontFamily.roboto,
    position: "absolute",
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
    left: 52,
    fontSize: FontSize.size_lg-4,//FontSize.size_lg,
    color: Color.black,
    width: 272,
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

export default TelaAutonomoAnalisarProposta;

import * as React from "react";
import { Image, StyleSheet, View, Text, Pressable, FlatList} from "react-native";
import { FontSize, FontFamily, Color, Margin, Border } from "../GlobalStyles";


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
  let data_brasileira = data_americana.split('-').reverse().join('/');
  let data_str = `Até ${data_brasileira.substring(0,2)} de ${meses[data_brasileira.substring(3,5)]} de ${data_brasileira.substring(6,10)}`


  return data_str;
}

//Inicializar servicos
const servicos = [
  {  "id": "01",
    "area": "pintor",
    "qtd_autonomos": 5,
    "tipo_de_servico": "presencial",
    "descricao": "Pintar somente uma parede",
    "data": "2022-02-22"
  },
  { "id": "02",
    "area": "diarista",
    "qtd_autonomos": 2,
    "tipo_de_servico": "presencial",
    "descricao": "Limpar minha casa de 3 andares",
    "data": "2022-09-28"
  },
  { "id": "03",
    "area": "desenvolvedor",
    "qtd_autonomos": 10,
    "tipo_de_servico": "online",
    "descricao": "Desenvolver um aplicativo freelancer",
    "data": "2022-11-01"
  },
  { "id": "04",
    "area": "desenvolvedor",
    "qtd_autonomos": 10,
    "tipo_de_servico": "online",
    "descricao": "Desenvolver um aplicativo freelancer",
    "data": "2022-11-01"
  },
  { "id": "05",
    "area": "desenvolvedor",
    "qtd_autonomos": 10,
    "tipo_de_servico": "online",
    "descricao": "Desenvolver um aplicativo freelancer",
    "data": "2022-11-01"
  },
  { "id": "06",
    "area": "desenvolvedor",
    "qtd_autonomos": 10,
    "tipo_de_servico": "online",
    "descricao": "Desenvolver um aplicativo freelancer",
    "data": "2022-11-01"
  },
  { "id": "07",
    "area": "desenvolvedor",
    "qtd_autonomos": 10,
    "tipo_de_servico": "online",
    "descricao": "Desenvolver um aplicativo freelancer",
    "data": "2022-11-01"
  }
]


const TelaVerificacaoServico= ({route, navigation}) => {
  const {telefone} = route.params;


  //Inicializar servicos

  const [items, setItems] = React.useState(servicos);

  //prevState nao eh declarado eh como se fosse um closure
  const removeItem = (key) =>{
    setItems((prevState) => prevState.filter((item) => item.id !== key));
  }

  function renderizar(item)
  {
    return(
      <View 
        style={{
        marginVertical: 1,
        marginHorizontal: 1,
        padding: 0 }}
      >
        <Text style={styles.textoArea}>
          {areas[item.item.area]}.{"\n"}
          {item.item.qtd_autonomos} Autônomos. {"\n"}
          {tipo_de_servico[item.item.tipo_de_servico]}.{"\n"}
          {item.item.descricao}.{"\n"}
          {converteDataString(item.item.data)}.
        </Text>
        
        <Pressable
          style={[
            styles.botaoExcluirServico,
            styles.botaoExcluirServicoPosition,
          ]}

          onPress={() => removeItem(item.item.id)}
        >
          <View style={[styles.botaoExcluirServico1, styles.pintorPosition]} />
          <Text style={[styles.textoExcluirServico1, styles.textoTypo]}>
            Excluir Serviço
          </Text>
        </Pressable>
        
        <View style={styles.linha} />
    </View>
    );
  }

  return (
    <View style={styles.telaVerificacaoServicoClien}>
      
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

      <Text style={styles.textoServicosSolicitados}>Serviços Solicitados</Text>

      <View style={[styles.linhaSuperior, styles.linhaLayout]} />
      
      <FlatList 
        style={styles.lista}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderizar}
      />
    </View>
    
  );
};

const styles = StyleSheet.create({

  lista:{
    left: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
    height: 500,
    top: "27.59%",
    
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
  textoServicosSolicitados: {
    top: 128,
    left: 52,
    fontSize: FontSize.size_lg-3,//FontSize.size_lg,
    color: Color.black,
    width: 272,
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
    left: 0,
    top: 0,
    position: "absolute",
  },
  
  botaoExcluirServico1: {
    top: "0%",
    bottom: "0%",
    borderRadius: Border.br_sm,
    backgroundColor: Color.indianred,
    height: "100%",
  },
  textoExcluirServico1: {
    height: "39.13%",
    width: "88.64%",
    top: "28.26%",
    left: "6.06%",
    color: Color.white,
    textAlign: "center",
  },
  botaoExcluirServico: {
    left: 231,
    width: 132,
    height: 46,
  },

  textoArea:{
  
    fontWeight: "500",
    color: Color.gray,
    fontSize: FontSize.size_sm -3,//FontSize.size_sm,
    fontFamily: FontFamily.roboto,
  },

  telaVerificacaoServicoClien: {
    backgroundColor: Color.white,
    flex: 1,
    height: 667,
    overflow: "hidden",
    width: "100%",
  },
});

export default TelaVerificacaoServico;

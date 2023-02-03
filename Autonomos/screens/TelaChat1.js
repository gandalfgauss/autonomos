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


const TelaChat1= ({route, navigation}) => {
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
        <Pressable> 
          <Text style={styles.textoArea}>
            {areas[item.item.area]}.{"\n"}
            {item.item.qtd_autonomos} Autônomos. {"\n"}
            {tipo_de_servico[item.item.tipo_de_servico]}.{"\n"}
            {item.item.descricao}.{"\n"}
            {converteDataString(item.item.data)}.
          </Text>

          <View style={[styles.pintor1, styles.pintorPosition]}>
            <View
              style={[
                styles.botaoPintor,
                styles.pintorPosition,
                styles.pintorPosition1,
              ]}
              
            />
            <Image
              style={styles.imagemPintorIcon}
              resizeMode="cover"
              source={imagens[item.item.area]}
            />
          </View>
        </Pressable>
        <Pressable style={styles.botaoExcluir}
          onPress={() => removeItem(item.item.id)}
        >
          <Text style={[styles.textoExcluir, styles.textoTypo]}>Excluir</Text>
        </Pressable>
        
        <View style={styles.linha} />
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
      <Text style={styles.textoConversas}> Conversas </Text>
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
  textoConversas: {
    top: 128,
    left: 52,
    fontSize: FontSize.size_lg-3,//FontSize.size_lg,
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
  },
});

export default TelaChat1;

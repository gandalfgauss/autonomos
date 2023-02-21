import * as React from "react";
import { Image, StyleSheet, View, Text, Pressable, FlatList, Alert} from "react-native";
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


const TelaChat1= ({route, navigation}) => {
  const {telefone, tipoDeLogin} = route.params;


  /*Api.post("/conversas/create", {telefoneCliente: telefone,
                                   telefoneProfissional: Math.random().toString(),
                                   area : "pintor", 
                                   qntAutonomos : "5", 
                                   tipo:"online", 
                                   data: new Date(),
                                  detalhes: "Ok"});*/

  //Inicializar conversas
  const [items, setItems] = React.useState([]);

  React.useEffect(()=>{
    Api.post("/conversas/"+tipoDeLogin, {telefone:telefone}).then(res =>{
      
      let conversas = res.data;
      let minhasConversas = []
      //console.log(servicos)
      for(let objeto of conversas)
      {
        minhasConversas.push(
        {
          "id": objeto["_id"],
          "area": objeto["area"],
          "qtd_autonomos": objeto["qntAutonomos"],
          "tipo_de_servico": objeto["tipo"],
          "descricao": objeto["detalhes"],
          "data": objeto["data"],
        }
      )        
      }
      setItems(minhasConversas); 
    }).catch(error =>{
          Alert.alert("Alerta", error.response.data.error);
      return [];
  }) 
  }, [])
  

  //prevState nao eh declarado eh como se fosse um closure
  const removeItem = (key) =>{
    //setItems((prevState) => prevState.filter((item) => item.id !== key));
    //Remover do banco de dados
    Api.post("/conversas/delete/"+tipoDeLogin, {id:key, telefone:telefone}).then(res =>{
      
      conversas = res.data;
      minhasConversas = []
      //console.log(servicos)
      for(let objeto of conversas)
      {
        minhasConversas.push(
        {
          "id": objeto["_id"],
          "area": objeto["area"],
          "qtd_autonomos": objeto["qntAutonomos"],
          "tipo_de_servico": objeto["tipo"],
          "descricao": objeto["detalhes"],
          "data": objeto["data"],
        }
      )        
      }
      setItems(minhasConversas);
    }).catch(error =>{
        Alert.alert("Alerta", error.response.data.error);
      return [];
      }) 
  }

  function conversaPrivada(id)
  {
    
    navigation.navigate("TelaChat2", {"telefone": telefone, "id" : id, "tipoDeLogin": tipoDeLogin})
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
        <Pressable
          onPress={() => conversaPrivada(item.item.id)}
        > 
          <Text style={styles.textoArea}>
            {areas[item.item.area]}.{"\n"}
            {item.item.qtd_autonomos} Autônomos. {"\n"}
            {tipo_de_servico[item.item.tipo_de_servico]}.{"\n"}
            {item.item.descricao}.{"\n"}
            {converteDataString(item.item.data)}.
          </Text>

          <View style={[styles.pintor1, styles.pintorPosition]}>
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

      <Text style={styles.textoConversas}> Conversas </Text>

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
    top: "5%"
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
    borderRadius: Border.br_md-7,//Border.br_md,
    backgroundColor: Color.whitesmoke_200,
  },
});

export default TelaChat1;

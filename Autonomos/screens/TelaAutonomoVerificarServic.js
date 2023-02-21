import * as React from "react";
import { Image, StyleSheet, View, Text, Pressable, FlatList, Alert, RefreshControl} from "react-native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";
import { Api } from "../Api";
import Local from "@react-native-community/geolocation"


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


function toRadians(degrees) {
  return degrees * (Math.PI/180);
}

function distance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371; // Raio da Terra em km
  const dLat = toRadians(lat2-lat1);
  const dLon = toRadians(lon2-lon1);
  lat1 = toRadians(lat1);
  lat2 = toRadians(lat2);

  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return earthRadius * c;
}



const TelaAutonomoVerificarServic= ({route, navigation}) => {
  const {telefone} = route.params;

  //Inicializar servicos
  const [items, setItems] = React.useState([]);
  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);
  const [atualizando, setAtualizando] = React.useState(false);

  function aoAtualizar()
  {
        setAtualizando(true);
        // Rotina de atualizacao
        acoes();
        setTimeout(() => {setAtualizando(false)}, 3000);

  }

  function acoes()
  {
    Local.getCurrentPosition((pos)=>{

      setLatitude(pos.coords.latitude.toString());
      setLongitude(pos.coords.longitude.toString());}, (erro) =>{
        setLatitude(0);
        setLongitude(0);
       }, 
    {enableHighAccuracy: true, timeout:120000, maximumAge:1000})

    Api.post("/servicos/autonomo").then(res =>{
      
      let servicos = res.data;

      let meusServicos = []
      //console.log(servicos)
      for(let objeto of servicos)
      {

        let km = "";

        if(objeto["tipo"] !== "online")
        {
          km = distance(Number.parseFloat(latitude), Number.parseFloat(longitude), Number.parseFloat(objeto["latitude"]), Number.parseFloat(objeto["longitude"]))
          km = km.toFixed(1).toString()+" km.";
        }

        meusServicos.push(
        {
          "id": objeto["_id"],
          "area": objeto["area"],
          "qtd_autonomos": objeto["qntAutonomos"],
          "tipo_de_servico": objeto["tipo"],
          "descricao": objeto["detalhes"],
          "data": objeto["data"],
          "km" : km,
          "created": objeto["created"]
        }
      )        
      }
      //Fitrar
      
      Api.post("/areas/", {telefone:telefone}).then(res=>{
      
      let filtros = res.data.filtros;
      let areasFiltro = res.data.areas;
      //console.log(meusServicos)
      
      if(filtros.includes("online") && !filtros.includes("presencial") )
      {
        meusServicos = meusServicos.filter((valor)=>{ return valor["tipo_de_servico"] ==="online"});
      }

      if(!filtros.includes("online") && filtros.includes("presencial") )
      {
        meusServicos = meusServicos.filter((valor)=>{ return valor.tipo_de_servico ==="presencial"});
      }

      meusServicos = meusServicos.filter((valor)=>{ return areasFiltro.includes(valor.area)});

      if(filtros.includes("proximos"))
      {
        meusServicos.sort(function(a, b) {
          var valorA = parseFloat(a.km.replace(" km.", ""));
          var valorB = parseFloat(b.km.replace(" km.", ""));
        
          if (valorA < valorB) {
            return -1;
          }
          if (valorA > valorB) {
            return 1;
          }
          return 0;
        });  
      }

      if(filtros.includes("recentes"))
      {
        meusServicos.sort(function(a, b) {
          var dataA = new Date(a.created);
          var dataB = new Date(b.created);
        
          if (dataA < dataB) {
            return -1;
          }
          if (dataA > dataB) {
            return 1;
          }
          return 0;
        });
      }

      setItems(meusServicos);

      }).catch(error=>{
      console.log("erro cat 1", error)
      Alert.alert("Alerta !", error.response.data.error)
    })  
    }).catch(error =>{
          Alert.alert("Alerta", error.response.data.error);
      return [];
    }) 
  }
  
  React.useEffect(()=> {acoes()}, [])

  function renderizar(item)
  {

    function verificarServicoClicado(id, km)
    {
      navigation.navigate("TelaAutonomoAnalisarProposta" , {"id":id, "km":km, "telefone": telefone})
    }

    return(
      <View 
        style={{
        marginVertical: 1,
        marginHorizontal: 1,
        padding: 0 }}
      >
        <Pressable onPress={() => verificarServicoClicado(item.item.id, item.item.km)}> 
          <Text style={styles.textoArea}>
            {areas[item.item.area]}.{"\n"}
            {item.item.qtd_autonomos} Autônomos. {"\n"}
            {tipo_de_servico[item.item.tipo_de_servico]}. {item.item.km}{"\n"}
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

      <Text style={styles.textoConversas}> Serviços Disponíveis </Text>

      <View style={[styles.linhaSuperior, styles.linhaLayout]} />
      
      <FlatList 
        style={styles.lista}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderizar}
        refreshControl={<RefreshControl
          refreshing={atualizando}
          onRefresh = {aoAtualizar}
        />}
      />

      <Pressable
        style={styles.filtrar}
        onPress={() => navigation.navigate("TelaAutonomoFiltragem1", {"telefone":telefone})}
      >
        <View style={[styles.botaoFiltrar, styles.botaoPosition]} />
        <Text style={[styles.textoFiltrar, styles.textoTypo1]}>Filtrar</Text>
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
    width: "24.11%",
    top: "20.45%",
    left: "37.95%",
    fontSize: FontSize.size_base-1,//FontSize.size_base,
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

export default TelaAutonomoVerificarServic;

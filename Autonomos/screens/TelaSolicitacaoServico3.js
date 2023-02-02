import * as React from "react";
import { Image, StyleSheet, View, Text, Pressable, Alert } from "react-native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";
import { LocaleConfig, Calendar } from 'react-native-calendars';


//Configurando Portugues no Calendario

LocaleConfig.locales["br"] = {
  monthNames: [
    "Janeiro",
   "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
 ],
  monthNamesShort: ["Jan.", "Fev.", "Mar", "Abr", "Mai", "Jun", "Jul.", "Ago", "Set.", "Out.", 
 "Nov.", "Dez."],
 dayNames: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
 dayNamesShort: ["S.", "T.", "Q.", "Q.", "S.", "S.", "D."],
  today: "Hoje",
  };

LocaleConfig.defaultLocale = "br";


const TelaSolicitacaoServico3 = ({route, navigation}) => {
  const {telefone, area, quantidade_autonomos, tipo_de_servico} = route.params;

  const [data, setData] = React.useState("");

  function proximo()
  {
    if(data === "")
    {
      Alert.alert("Alerta", "Por favor, preencha os dados corretamente.");
    }
    else
    {
      navigation.navigate("TelaSolicitacaoServico4",
      {"telefone" : telefone, 
        "area": area,
        "quantidade_autonomos": quantidade_autonomos,
        "tipo_de_servico": tipo_de_servico,
        "data": data
      })
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
        onPress={proximo}
      >
        <View style={[styles.botaoProximo, styles.botaoProximoPosition]} />
        <Text style={[styles.textoProximo, styles.textoTypo]}>Próximo</Text>
      </Pressable>
      <View style={styles.calendarioData} onPress={()=>setShow(true)}>
        <Text style={[styles.textoData, styles.textoTypo]}>
          Até quando deseja receber solicitações?
        </Text>

        <View style={{height:50}}>
          <Calendar 
            theme={{
              calendarContainer: {
                height: 30,
                width: 30,
              },
            }}
            style={{top:"20%", left:"5%", height:50}}
            locale="pt-br"
            initialDate = {(new Date()).toISOString().substring(0, 10)}
            minDate = {(new Date()).toISOString().substring(0, 10)} 
            maxDate = {(new Date(2024, 0, 0)).toISOString().substring(0, 10)} 
            disableAllTouchEventsForDisabledDays ={ true }
            onDayPress={(day) => {setData(day.dateString)}}
            markedDates={{
              [data]: { selected: true },
            }}
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
  botaoProximoPosition: {
    left: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  textoTypo: {
    fontSize: FontSize.size_base-2,//FontSize.size_base,
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
    fontSize: FontSize.size_lg -2,//FontSize.size_lg,
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
    top: "0%",
    bottom: "24.14%",
    borderRadius: Border.br_lg,
    backgroundColor: Color.skyblue,
  },
  textoProximo: {
    height: "41.38%",
    width: "33.93%",
    top: "15.52%",
    left: "33.04%",
    color: Color.snow,
  },
  proximo: {
    top: 605,
    left: 76,
    width: 224,
    height: 58,
    position: "absolute",
  },
  calendarioIcon: {
    height: "81.31%",
    top: "18.69%",
    bottom: "0%",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
  },
  textoData: {
    height: "15.26%",
    width: "67.21%",
    top: "-13%",//"-1.56%",
    left: "7.32%",
    color: Color.darkslategray_100,
  },
  calendarioData: {
    top: 220,
    left: 3,
    width: 369,
    height: 321,
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

export default TelaSolicitacaoServico3;

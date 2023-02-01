// Imports necessários
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Telas
import TelaDeCarregamento from "./screens/TelaDeCarregamento";
import TelaAutenticacaoInicial from "./screens/TelaAutenticacaoInicial";
import TelaDeCadastro from "./screens/TelaDeCadastro";
import TelaConfirmacaoTelefone from "./screens/TelaConfirmacaoTelefone";
import TelaInicialCliente from "./screens/TelaInicialCliente";
import TelaInicialAutonomo from "./screens/TelaInicialAutonomo";


//Código App Inicial
const Stack = createNativeStackNavigator();

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  return (
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="TelaDeCarregamento"
              component={TelaDeCarregamento}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TelaAutenticacaoInicial"
              component={TelaAutenticacaoInicial}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TelaDeCadastro"
              component={TelaDeCadastro}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="TelaConfirmacaoTelefone"
              component={TelaConfirmacaoTelefone}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TelaInicialCliente"
              component={TelaInicialCliente}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TelaInicialAutonomo"
              component={TelaInicialAutonomo}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </>
  );
};

export default App;

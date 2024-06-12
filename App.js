import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux"; // Importando o Provider do Redux
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Importando GestureHandlerRootView
import store from './src/redux/store'
import Home from "./src/pages/Home";
import Register from "./src/pages/Register";
import Login from "./src/pages/Login";
import Bebidas from "./src/pages/Menu/bebidas";
import Entradas from "./src/pages/Menu/entradas";
import Pratos from "./src/pages/Menu/pratos";
import Sobremesas from "./src/pages/Menu/sobremesas";

const Stack = createStackNavigator();

const commonHeaderOptions = {
  headerTitle: "MenuVoz",
  headerStyle: {
    backgroundColor: "#ffffff",
  },
  headerTitleStyle: {
    fontSize: 30,
    color: "#000000",
  },
};

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={commonHeaderOptions}
            />
            <Stack.Screen
              name="Bebidas"
              component={Bebidas}
              options={commonHeaderOptions}
            />
            <Stack.Screen
              name="Entradas"
              component={Entradas}
              options={commonHeaderOptions}
            />
            <Stack.Screen
              name="Pratos"
              component={Pratos}
              options={commonHeaderOptions}
            />
            <Stack.Screen
              name="Sobremesas"
              component={Sobremesas}
              options={commonHeaderOptions}
            />
             <Stack.Screen
              name="Register"
              component={Register}
              options={commonHeaderOptions}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={commonHeaderOptions}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;

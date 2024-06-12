import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  PanResponder,
  Touchable,
} from "react-native";
import { SearchBar } from "react-native-elements";
import * as Speech from "expo-speech";
import { useNavigation } from "@react-navigation/native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { useSelector } from "react-redux";
import AudioControl from "../../components/AudioControl";
import Sheet from "../../components/Sheet";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Home = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastPress, setLastPress] = useState(0);
  const [spokenWelcomeMessage, setSpokenWelcomeMessage] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const pressTimeout = useRef(null);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const { width, height } = Dimensions.get("window");
  const { isPlaying } = useSelector((state) => state.audio);

  const speakWelcomeMessage = () => {
    const welcomeMessage =
      "Olá, Bem Vindo ao MenuVoz. Este aplicativo te ajudará a encontrar as opções de Menu do Restaurante XXX. Para isso basta escolher entre as categorias: bebidas, entradas, pratos principais e sobremesas. Para selecionar a opção toque 2 vezes na tela e para ler a opção toque 1 vez na tela. Caso queira navegar entre as opções arraste a tela para o lado.";
    if (isPlaying) {
      Speech.speak(welcomeMessage, { language: "pt-BR" });
    }
  };

  const menuItems = [
    {
      id: 1,
      name: "Bebidas",
      description: "Menu de bebidas",
      image: require("../../../assets/home/bebidas.jpg"),
    },
    {
      id: 2,
      name: "Entradas",
      description: "Menu de entradas",
      image: require("../../../assets/home/entradas.jpeg"),
    },
    {
      id: 3,
      name: "Pratos\n Principais",
      description: "Menu de Pratos Principais",
      image: require("../../../assets/home/pratos.jpeg"),
    },
    {
      id: 4,
      name: "Sobremesas",
      description: "Menu de Sobremesas.",
      image: require("../../../assets/home/sobremesas.jpeg"),
    },
  ];

  const readMenuItem = (menuItem) => {
    const textToRead = `${menuItem.description}`;
    if (isPlaying) {
      Speech.speak(textToRead, { language: "pt-BR" });
    }
  };

  const redirectToMenu = (categoria) => {
    let redirectTo = "Home";

    switch (categoria.id) {
      case 1:
        redirectTo = "Register";
        break;
      case 2:
        redirectTo = "Login";
        break;
      case 3:
        redirectTo = "Pratos";
        break;
      case 4:
        redirectTo = "Sobremesas";
        break;
      default:
        break;
    }

    navigation.navigate(redirectTo, { categoriaId: categoria.id });
  };

  const handlePress = (menuItem) => {
    const now = new Date().getTime();
    const DOUBLE_PRESS_DELAY = 300;

    if (now - lastPress < DOUBLE_PRESS_DELAY) {
      redirectToMenu(menuItem);
      Speech.stop();
    } else {
      readMenuItem(menuItem);
    }

    setLastPress(now);
  };

  const longPressIn = () => {
    const navigationMessage =
      "Para navegar pelo cardápio você usará movimentos simples. Toque uma vez na tela para ler a opção que está sendo mostrada. Toque duas vezes na tela para acessar o cardápio que deseja ou, se já estiver em um cardápio, to que duas vezes para voltar as opções de cardápios. Para navegar pelas opções, arraste a tela para o lado esquerdo. Caso queira houvir os comandos de navegação novamente pressione e segure a tela.";
    Speech.speak(navigationMessage, { language: "pt-BR" });
  };

  useEffect(() => {
    if (!spokenWelcomeMessage && isPlaying) {
      speakWelcomeMessage();
      setSpokenWelcomeMessage(true);
    }
  }, [isPlaying]);

  const panY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Adjust the threshold for swipe up
        return gestureState.dy < -50;
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy < -50) {
          setIsOpen(true);
        }
      },
      onPanResponderTerminate: () => {
        Animated.spring(panY, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: panY }] }]}
      {...panResponder.panHandlers}
    >
      {!isOpen && (
        <SwiperFlatList
          index={currentIndex}
          onChangeIndex={({ index }) => setCurrentIndex(index)}
          style={styles.swiper}
        >
          {menuItems.map((menuItem) => (
            <View key={menuItem.id}>
              <TouchableOpacity
                style={[
                  styles.menuItem,
                  { height: windowHeight * 0.8 },
                  { width: windowWidth * 0.9 },
                ]}
                onPress={() => handlePress(menuItem)}
                onLongPress={longPressIn}
              >
                <Text style={styles.menuItemTitle}>{menuItem.name}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </SwiperFlatList>
      )}
      {isOpen && <Sheet onClose={() => setIsOpen(false)} />}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  menuItem: {
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    margin: 100 * 0.2,
  },
  menuItemTitle: {
    fontSize: 60,
    color: "#fff",
    textAlign: "center",
  },

  swiper: {
    flex: 1,
    width: "100%",
  },
});

export default Home;

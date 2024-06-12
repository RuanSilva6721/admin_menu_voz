import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  PanResponder,
} from "react-native";
import { SearchBar } from "react-native-elements";
import * as Speech from "expo-speech";
import { useNavigation } from "@react-navigation/native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { useSelector } from "react-redux";
import Sheet from "../../components/Sheet";

const Sobremesas = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastPress, setLastPress] = useState(0);
  const [spokenWelcomeMessage, setSpokenWelcomeMessage] = useState(false);
  const { isPlaying } = useSelector((state) => state.audio);
  const [isOpen, setIsOpen] = useState(false);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  /*
  const speakWelcomeMessage = () => {
    const welcomeMessage =
      "Ótima escolha para iniciar! Agora vamos listar as opções!";
    Speech.speak(welcomeMessage, { language: "pt-BR" });
    setSpokenWelcomeMessage(true);
  };
*/
  const menuItems = [
    {
      id: 1,
      name: "Bolo de Chocolate",
      description: "Fatia de bolo de chocolate. Aprox. 250 g.",
      price: "R$ 10,00",
      image: require("../../../assets/Bolo.png"),
      fala: "Fatia de bolo de chocolate. Aprox. 250 g. O preço é 10,00",
    },
    {
      id: 2,
      name: "Pudim",
      description: "Pudim de leite, 300 gramas.",
      price: "R$ 12,99",
      image: require("../../../assets/Pudim.png"),
      fala: "Pudim de leite, 300 gramas. O preço é 12,99.",
    },
    {
      id: 3,
      name: "Picolé",
      description: "Picolé sabores variados.",
      price: "R$ 7,50",
      image: require("../../../assets/Picole.png"),
      fala: "Picolé sabores variados. O preço é 7,50",
    },
  ];

  const readMenuItem = (menuItem) => {
    const textToRead = `${menuItem.fala}`;
    if (isPlaying) {
      Speech.speak(textToRead, { language: "pt-BR" });
    }
  };

  const redirectToMenu = () => {
    let redirectTo = "Home";

    navigation.navigate(redirectTo, { Home: "src/pages/Home/index.js" });
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
  /*
  useEffect(() => {
    if (!spokenWelcomeMessage && isPlaying) {
      speakWelcomeMessage();
    }
  }, []);
*/
  const panY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
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
            <View key={menuItem.id} style={styles.menuItem}>
              <TouchableOpacity
                onPress={() => handlePress(menuItem)}
                style={
                  (styles.carosuel,
                  { height: windowHeight * 0.8 },
                  { width: windowWidth * 0.85 })
                }
              >
                <Image source={menuItem.image} style={styles.menuItemImage} />
                <Text style={styles.menuItemTitle}>{menuItem.name}</Text>
                <Text style={styles.menuItemDescription}>
                  {menuItem.description}
                </Text>
                <Text style={styles.menuItemPrice}>{menuItem.price}</Text>
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
    margin: 100 * 0.212,
    padding: 100 * 0.1,
  },
  menuItemTitle: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginBottom: 5,
  },
  menuItemDescription: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 5,
  },
  menuItemPrice: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  swiper: {
    flex: 1,
    width: "100%",
  },
  menuItemImage: {
    resizeMode: "cover",
    width: 100 * 3.5,
    height: 100 * 3.5 * (16 / 9),
    marginBottom: 10,
    marginRight: 5,
  },
  carosuel: {},
});

export default Sobremesas;

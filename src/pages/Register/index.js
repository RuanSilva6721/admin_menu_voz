import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import { Picker } from '@react-native-picker/picker';

const categories = {
  default: "Selecione uma categoria",
  beverages: "Bebidas",
  food: "Comidas",
  desserts: "Sobremesas",
  dishes: "Pratos"
};

const Register = () => {
  const [nomeProduto, setNomeProduto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState(categories.default);

  const handleCadastro = () => {
    if (!nomeProduto) {
      Alert.alert("Erro", "Por favor, preencha o nome do produto!");
      return;
    }
    if (!descricao) {
      Alert.alert("Erro", "Por favor, preencha a descrição!");
      return;
    }
    if (!preco) {
      Alert.alert("Erro", "Por favor, preencha o preço!");
      return;
    }
    if (categoria === categories.default) {
      Alert.alert("Erro", "Por favor, selecione uma categoria!");
      return;
    }

    Alert.alert("Sucesso", "Produto cadastrado com sucesso!");
    setNomeProduto("");
    setDescricao("");
    setPreco("");
    setCategoria(categories.default);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Produtos</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        placeholderTextColor="#888"
        value={nomeProduto}
        onChangeText={setNomeProduto}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        placeholderTextColor="#888"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço"
        placeholderTextColor="#888"
        value={preco}
        onChangeText={text => setPreco(text.replace(/[^0-9.]/g, ''))}
        keyboardType="numeric"
      />
      <Picker
        selectedValue={categoria}
        style={styles.picker}
        onValueChange={(itemValue) => setCategoria(itemValue)}
      >
        {Object.keys(categories).map((key) => (
          <Picker.Item key={key} label={categories[key]} value={categories[key]} color="#fff"/>
        ))}
      </Picker>
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 5,
    marginBottom: 10,
    color: "#fff",
    backgroundColor: "#111",
  },
  picker: {
    width: "100%",
    height: 50,
    borderColor: "#333",
    borderRadius: 5,
    marginBottom: 20,
    color: "#fff",
    backgroundColor: "#111",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Register;

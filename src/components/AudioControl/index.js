import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { play, pause, selectAudio } from "../../redux/audioSlice";
import { MaterialIcons } from "@expo/vector-icons"
import { Pressable, StyleSheet,Text, View } from "react-native";


export default function AudioControl () {
  
  const { isPlaying } = useSelector(state => state.audio);
  const dispatch = useDispatch();
  const [recording, setRecording] = useState(true);

  const toggleAudio = () => {
    if (isPlaying) {
      dispatch(pause());
    } else {
      dispatch(play());
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={[styles.button, isPlaying && styles.recording]} onPress={toggleAudio}>
        <MaterialIcons
        name="audiotrack"
        size={24}
        color="#000"
        />
      </Pressable>
      {isPlaying ? 
      <Text style={styles.label}>
        Áudio Ligado
      </Text> 
      : <Text style={styles.label}>
          Áudio Desligado
        </Text>
      }
      
    </View>
    
  );
  
};
const styles = StyleSheet.create({
  container: {   
    alignItems: 'center',
    justifyContent:'center'
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 47,
    backgroundColor: '#b3b3b3',
    alignItems: 'center',
    justifyContent:'center',
    marginBottom: 15,
    marginTop: 5
  },
  label:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10
  }, 
  recording: {
    backgroundColor: '#1db954'
  }
});
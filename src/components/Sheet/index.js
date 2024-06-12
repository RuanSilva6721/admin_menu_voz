import React, { useRef } from 'react';
import { Text, View, StyleSheet, Dimensions, Animated, PanResponder } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AudioControl from '../AudioControl';

const { height } = Dimensions.get('window');

const Sheet = ({ onClose }) => {
  const offset = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dy: offset }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < (height - 100) / 3) {
          Animated.spring(offset, {
            toValue: 0,
            useNativeDriver: false
          }).start();
        } else {
          Animated.timing(offset, {
            toValue: height,
            duration: 300,
            useNativeDriver: false
          }).start(onClose);
        }
      },
    })
  ).current;

  const translateY = offset;

  return (
    <View style={styles.container}>
      <View style={styles.dragIconContainer}>
        <MaterialCommunityIcons
          name="drag-horizontal"
          color="#999"
          size={24}
          style={styles.dragIcon}
        />
      </View>
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.sheet, { transform: [{ translateY }] }]}
      >
        <AudioControl />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  dragIconContainer: {
    alignSelf: 'center',
    marginTop: 16,
  },
  sheet: {
    height: 320,
    width: '100%',
    backgroundColor: '#1E1F23',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
  },
});

export default Sheet;

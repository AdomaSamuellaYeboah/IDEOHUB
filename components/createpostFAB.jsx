import React from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import { Plus } from 'lucide-react-native';
import COLORS from '../constants/colors';

import PropTypes from 'prop-types';

export default function CreatePostFAB({ onPress }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={onPress}
      >
        <Plus size={24} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.orange,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonPressed: {
    opacity: 0.8,
  },
});

CreatePostFAB.propTypes = {
  onPress: PropTypes.func.isRequired,
};
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
/*import CreateBoardModal from '../../components/createboardmodal';*/
import { useRouter } from 'expo-router';

export default function CreateScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.createButton}
        onPress={() => router.push('../../components/createboardmodal')}
      >
        <MaterialIcons name="add-circle" size={48} color="#f4a526" />
        <Text style={styles.createText}>Create Board</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  createButton: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4a526',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  createText: {
    marginTop: 8,
    fontSize: 16,
    color: '#f4a526',
    fontWeight: '600',
  },
});

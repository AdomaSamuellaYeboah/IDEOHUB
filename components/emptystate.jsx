import { StyleSheet, Text, View } from 'react-native';
import { FolderPlus } from 'lucide-react-native';
import COLORS from '../constants/colors';


export default function EmptyState({ 
  title, 
  message, 
  icon = <FolderPlus size={48} color={COLORS.light.textSecondary} /> 
}) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.light.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: COLORS.light.textSecondary,
    textAlign: 'center',
    maxWidth: 300,
  },
});
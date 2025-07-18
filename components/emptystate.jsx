import { StyleSheet, Text, View } from 'react-native';
import { FolderPlus } from 'lucide-react-native';
import COLORS from '../constants/colors';
import { useUserStore } from '../store/userstore';
import { useColorScheme } from 'react-native';

export default function EmptyState({ 
  title, 
  message, 
  icon 
}) {
  const { getThemeColors } = useUserStore();
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);

  const defaultIcon = <FolderPlus size={48} color={colors.textSecondary} />;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {icon || defaultIcon}
      </View>
      <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text>
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
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    maxWidth: 300,
  },
});
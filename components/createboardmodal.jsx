import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Modal,
  ScrollView,
  Switch,
  TouchableOpacity,
  Image
} from "react-native";
import {
  X,
  Grid,
  ListFilter,
  Clock,
  MapPin,
  Layout,
} from "lucide-react-native";
import COLORS from "../constants/colors";
import { useUserStore } from "../store/userstore";
import { useColorScheme } from "react-native";
import * as ImagePicker from 'expo-image-picker';

const layoutOptions = [
  {
    value: "grid",
    label: "Grid View",
    icon: <Grid size={24} color={COLORS.lightBlue} />,
    description: "Pinterest-like layout",
  },
  {
    value: "stream",
    label: "Stream View",
    icon: <ListFilter size={24} color={COLORS.lightBlue} />,
    description: "Vertical feed",
  },
  {
    value: "timeline",
    label: "Timeline View",
    icon: <Clock size={24} color={COLORS.lightBlue} />,
    description: "Horizontal chronological layout",
  },
  {
    value: "freeform",
    label: "Freeform",
    icon: <Layout size={24} color={COLORS.lightBlue} />,
    description: "Drag-anywhere layout",
  },
  {
    value: "map",
    label: "Map",
    icon: <MapPin size={24} color={COLORS.lightBlue} />,
    description: "Geolocation-based post tagging",
  },
];

export default function CreateBoardModal({ visible, onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [layout, setLayout] = useState("grid");
  const [isPublic, setIsPublic] = useState(true);
  const [image, setImage] = useState(null);

  const { getThemeColors } = useUserStore();
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleCreate = () => {
    if (!title.trim()) {
      // Optionally show error UI here
      return;
    }

    const newBoard = {
      title: title.trim(),
      description: description.trim(),
      layout,
      isPublic,
      coverImage: image,
    };
    if (typeof onCreate === 'function') {
      onCreate(newBoard);
    }

    // Reset form
    setTitle("");
    setDescription("");
    setImage(null);
    setLayout("grid");
    setIsPublic(true);


    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Create New Board</Text>
            <Pressable onPress={handleClose} style={styles.closeButton}>
              <X size={24} color={colors.textSecondary} />
            </Pressable>
          </View>

          <ScrollView style={styles.form}>
          <Text style={[styles.label, { color: colors.textPrimary }]}>Image Of The Board</Text>
          <View style={styles.addImage}>
              <TouchableOpacity onPress={pickImage}>
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 300, height: 80, borderRadius: 8 }}
                  />
                ) : (
                  <Text>+ Add Image</Text>
                )}
              </TouchableOpacity>
            </View>
            <Text style={[styles.label, { color: colors.textPrimary }]}>Board Title</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.cardBackground, borderColor: colors.border, color: colors.textPrimary }]}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter board title"
              placeholderTextColor={colors.textSecondary}
            />

            <Text style={[styles.label, { color: colors.textPrimary }]}>Description (Optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea, { backgroundColor: colors.cardBackground, borderColor: colors.border, color: colors.textPrimary }]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter board description"
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={3}
            />
           



            <Text style={[styles.label, { color: colors.textPrimary }]}>Layout</Text>
            <View style={styles.layoutOptions}>
              {layoutOptions.map((option) => (
                <Pressable
                  key={option.value}
                  style={[
                    styles.layoutOption,
                    { borderColor: colors.border },
                    layout === option.value && [styles.layoutOptionSelected, { borderColor: COLORS.lightBlue, backgroundColor: "rgba(62, 156, 255, 0.1)" }],
                  ]}
                  onPress={() => setLayout(option.value)}
                >
                  <View style={styles.layoutIconContainer}>{option.icon}</View>
                  <Text style={[styles.layoutLabel, { color: colors.textPrimary }]}>{option.label}</Text>
                  <Text style={[styles.layoutDescription, { color: colors.textSecondary }]}>
                    {option.description}
                  </Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.switchContainer}>
              <Text style={[styles.label, { color: colors.textPrimary }]}>Public Board</Text>
              <Switch
                value={isPublic}
                onValueChange={setIsPublic}
                trackColor={{ false: colors.border, true: COLORS.orange }}
                thumbColor="#FFFFFF"
              />
            </View>
            <Text style={[styles.helperText, { color: colors.textSecondary }]}>
              {isPublic
                ? "Anyone with the link can view this board"
                : "Only you and collaborators can access this board"}
            </Text>
          </ScrollView>

          <View style={[styles.footer, { borderTopColor: colors.border }]}>
            <Pressable
              style={[styles.button, styles.cancelButton, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
              onPress={handleClose}
            >
              <Text style={[styles.cancelButtonText, { color: colors.textPrimary }]}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[
                styles.button,
                styles.createButton,
                !title.trim() && styles.createButtonDisabled,
              ]}
              onPress={handleCreate}
              disabled={!title.trim()}
            >
              <Text style={styles.createButtonText}>Create Board</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    borderRadius: 16,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 4,
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  layoutOptions: {
    marginBottom: 16,
  },
  layoutOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  layoutOptionSelected: {
    // Theme colors applied inline
  },
  layoutIconContainer: {
    marginRight: 12,
  },
  layoutLabel: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  layoutDescription: {
    fontSize: 14,
    flex: 1,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  helperText: {
    fontSize: 14,
    marginBottom: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
    borderTopWidth: 1,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 8,
  },
  cancelButton: {
    borderWidth: 1,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  createButton: {
    backgroundColor: COLORS.orange,
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  addImage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    height: 90,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
    color: COLORS.textPrimary,
  }
});

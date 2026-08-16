import { useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../styles/colors";
import { radius } from "../styles/radius";
import { spacing } from "../styles/spacing";
import { fonts } from "../styles/typography";
import { Icon } from "./Icon";
import { PrimaryButton } from "./PrimaryButton";
import { TextField } from "./TextField";

export type NewVehicle = {
  name: string;
  plate: string;
  color: string;
  notes?: string;
};

type AddVehicleModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (vehicle: NewVehicle) => void;
};

export function AddVehicleModal({ visible, onClose, onSubmit }: AddVehicleModalProps) {
  const [name, setName] = useState("");
  const [plate, setPlate] = useState("");
  const [color, setColor] = useState("");
  const [notes, setNotes] = useState("");

  const canSubmit = name.trim().length > 0 && plate.trim().length > 0 && color.trim().length > 0;

  const reset = () => {
    setName("");
    setPlate("");
    setColor("");
    setNotes("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit({ name: name.trim(), plate: plate.trim(), color: color.trim(), notes: notes.trim() || undefined });
    reset();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <Pressable style={styles.backdrop} onPress={handleClose} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.sheetWrapper}
        pointerEvents="box-none"
      >
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Ajouter un véhicule</Text>
            <Pressable style={styles.closeButton} onPress={handleClose}>
              <View style={styles.closeIcon}>
                <Icon name="plus" size={16} color={colors.textPrimary} />
              </View>
            </Pressable>
          </View>

          <View style={styles.form}>
            <TextField placeholder="Nom du véhicule" value={name} onChangeText={setName} />
            <TextField
              placeholder="Plaque d'immatriculation"
              autoCapitalize="characters"
              value={plate}
              onChangeText={setPlate}
            />
            <TextField placeholder="Couleur" value={color} onChangeText={setColor} />
            <TextField
              placeholder="Infos complémentaires (optionnel)"
              value={notes}
              onChangeText={setNotes}
              multiline
              style={styles.notesInput}
            />
          </View>

          <PrimaryButton label="Ajouter le véhicule" onPress={handleSubmit} disabled={!canSubmit} />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  sheetWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: colors.surface,
    borderColor: colors.surfaceBorder,
    borderWidth: 1,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.textPrimary,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.iconCircle,
    alignItems: "center",
    justifyContent: "center",
  },
  closeIcon: {
    transform: [{ rotate: "45deg" }],
  },
  form: {
    gap: spacing.md,
  },
  notesInput: {
    minHeight: 80,
    textAlignVertical: "top",
    paddingTop: 16,
  },
});

import { useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { getErrorMessage } from "../services/errors";
import { createVehicle } from "../services/vehiclesApi";
import { FUEL_TYPE_OPTIONS, type FuelType, type Vehicle, type VehicleBrand, type VehicleType } from "../schemas/vehicles";
import { colors } from "../styles/colors";
import { radius } from "../styles/radius";
import { shared } from "../styles/shared";
import { spacing } from "../styles/spacing";
import { fonts } from "../styles/typography";
import { Icon } from "./Icon";
import { PrimaryButton } from "./PrimaryButton";
import { SelectField } from "./SelectField";
import { TextField } from "./TextField";

type AddVehicleModalProps = {
  visible: boolean;
  vehicleTypes: VehicleType[];
  brands: VehicleBrand[];
  onClose: () => void;
  onCreated: (vehicle: Vehicle) => void;
};

export function AddVehicleModal({ visible, vehicleTypes, brands, onClose, onCreated }: AddVehicleModalProps) {
  const [vehicleTypeId, setVehicleTypeId] = useState<number | null>(null);
  const [brandId, setBrandId] = useState<number | null>(null);
  const [modelId, setModelId] = useState<number | null>(null);
  const [registration, setRegistration] = useState("");
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [fuelType, setFuelType] = useState<FuelType | null>(null);
  const [seats, setSeats] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedBrand = brands.find((brand) => brand.id === brandId) ?? null;

  const canSubmit =
    vehicleTypeId !== null &&
    brandId !== null &&
    modelId !== null &&
    registration.trim().length > 0 &&
    color.trim().length > 0 &&
    /^\d{4}$/.test(year) &&
    fuelType !== null &&
    /^\d+$/.test(seats);

  const reset = () => {
    setVehicleTypeId(null);
    setBrandId(null);
    setModelId(null);
    setRegistration("");
    setColor("");
    setYear("");
    setFuelType(null);
    setSeats("");
    setErrorMessage(null);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async () => {
    if (!canSubmit || vehicleTypeId === null || brandId === null || modelId === null || fuelType === null) return;

    setErrorMessage(null);
    setSubmitting(true);
    try {
      const vehicle = await createVehicle({
        vehicle_type_id: vehicleTypeId,
        brand_id: brandId,
        model_id: modelId,
        registration: registration.trim().toUpperCase(),
        color: color.trim(),
        year: Number(year),
        fuel_type: fuelType,
        seats: Number(seats),
      });
      reset();
      onCreated(vehicle);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
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

          <ScrollView contentContainerStyle={styles.form} showsVerticalScrollIndicator={false}>
            <SelectField
              label="Type de véhicule"
              placeholder="Type de véhicule"
              value={vehicleTypeId}
              options={vehicleTypes.map((type) => ({ label: type.name, value: type.id }))}
              onChange={setVehicleTypeId}
            />

            <SelectField
              label="Marque"
              placeholder="Marque"
              value={brandId}
              options={brands.map((brand) => ({ label: brand.name, value: brand.id }))}
              onChange={(id) => {
                setBrandId(id);
                setModelId(null);
              }}
            />

            <SelectField
              label="Modèle"
              placeholder={selectedBrand ? "Modèle" : "Choisissez d'abord une marque"}
              value={modelId}
              options={(selectedBrand?.models ?? []).map((model) => ({ label: model.name, value: model.id }))}
              onChange={setModelId}
              disabled={!selectedBrand}
            />

            <TextField
              placeholder="Plaque d'immatriculation"
              autoCapitalize="characters"
              value={registration}
              onChangeText={setRegistration}
            />
            <TextField placeholder="Couleur" value={color} onChangeText={setColor} />

            <View style={shared.inputRow}>
              <TextField
                placeholder="Année"
                keyboardType="number-pad"
                maxLength={4}
                style={styles.halfInput}
                value={year}
                onChangeText={setYear}
              />
              <TextField
                placeholder="Places"
                keyboardType="number-pad"
                maxLength={1}
                style={styles.halfInput}
                value={seats}
                onChangeText={setSeats}
              />
            </View>

            <SelectField
              label="Carburant"
              placeholder="Carburant"
              value={fuelType}
              options={FUEL_TYPE_OPTIONS}
              onChange={setFuelType}
            />
          </ScrollView>

          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <PrimaryButton
            label={submitting ? "Ajout en cours..." : "Ajouter le véhicule"}
            onPress={handleSubmit}
            disabled={!canSubmit || submitting}
          />
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
    maxHeight: "88%",
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
  halfInput: {
    flex: 1,
  },
  errorText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.brandRed,
    textAlign: "center",
  },
});

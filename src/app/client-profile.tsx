import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Icon } from "../components/Icon";
import { BottomNavBar } from "../components/BottomNavBar";
import { ProfileMenuRow } from "../components/ProfileMenuRow";
import { logout as logoutRequest } from "../services/authApi";
import { getErrorMessage } from "../services/errors";
import { uploadAvatar } from "../services/profileApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout as clearCredentials, updateUser } from "../store/slices/authSlice";
import { colors } from "../styles/colors";
import { spacing } from "../styles/spacing";
import { fonts } from "../styles/typography";

const MENU_ITEMS = [
  "Gérer mes informations",
  "Gérer mes moyens de paiement",
  "Modifier mon mot de passe",
  "Gérer les notifications",
  "Modifier le thème",
  "Aide & support",
  "Historique",
];

export default function ClientProfile() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [uploading, setUploading] = useState(false);

  // Photo provisoire générée via pravatar.cc (API gratuite, sans clé) tant que
  // l'utilisateur n'a pas encore uploadé de vraie photo de profil.
  const avatarUrl = user?.avatar_url ?? `https://i.pravatar.cc/300?u=${user?.uuid ?? "guest"}`;

  const handleLogout = async () => {
    try {
      await logoutRequest();
    } catch {
      // Le token est peut-être déjà expiré côté serveur : on déconnecte quand même localement.
    }
    dispatch(clearCredentials());
    router.replace("/");
  };

  const handleChangeAvatar = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Autorisation requise", "Autorise l'accès à tes photos pour changer ta photo de profil.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    const asset = result.assets?.[0];
    if (result.canceled || !asset) return;

    setUploading(true);
    try {
      const updatedUser = await uploadAvatar({
        uri: asset.uri,
        name: asset.fileName ?? "avatar.jpg",
        type: asset.mimeType ?? "image/jpeg",
      });
      dispatch(updateUser(updatedUser));
    } catch (error) {
      Alert.alert("Erreur", getErrorMessage(error));
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Mon profil</Text>

          <View style={styles.identity}>
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: avatarUrl }} style={styles.avatar} />

              {uploading ? (
                <View style={styles.avatarOverlay}>
                  <ActivityIndicator color={colors.textPrimary} />
                </View>
              ) : null}

              <Pressable style={styles.editBadge} onPress={handleChangeAvatar} disabled={uploading}>
                <Icon name="pencil" size={16} color={colors.textPrimary} />
              </Pressable>
            </View>
            <Text style={styles.name}>
              {user ? `${user.firstname} ${user.lastname}` : "Utilisateur"}
            </Text>
          </View>

          <View style={styles.menu}>
            {MENU_ITEMS.map((label) => (
              <ProfileMenuRow key={label} label={label} onPress={() => {}} />
            ))}
            <ProfileMenuRow label="Devenir chauffeur" onPress={() => router.push("/driver-login")} />
          </View>

          <Pressable onPress={handleLogout}>
            <Text style={styles.logoutLink}>Se déconnecter</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>

      <BottomNavBar
        active="profile"
        onTabPress={(tab) => {
          if (tab === "home") router.push("/client-home");
          if (tab === "vehicles") router.push("/client-vehicles");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: 110,
    alignItems: "center",
    gap: spacing.xl,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.textPrimary,
  },
  identity: {
    alignItems: "center",
    gap: spacing.md,
  },
  avatarWrapper: {
    width: 130,
    height: 130,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: colors.iconCircle,
  },
  avatarOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 65,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accent,
    borderWidth: 3,
    borderColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontFamily: fonts.medium,
    fontSize: 17,
    color: colors.textPrimary,
  },
  menu: {
    alignSelf: "stretch",
  },
  logoutLink: {
    fontFamily: fonts.semiBold,
    fontSize: 15,
    color: colors.brandRed,
  },
});

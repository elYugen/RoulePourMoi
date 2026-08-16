import { useRouter } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomNavBar } from "../components/BottomNavBar";
import { ProfileMenuRow } from "../components/ProfileMenuRow";
import { colors } from "../styles/colors";
import { spacing } from "../styles/spacing";
import { fonts } from "../styles/typography";

const USER = {
  name: "Jean Michel",
  // Photo provisoire générée via pravatar.cc (API gratuite, sans clé) en attendant
  // la vraie photo de profil de l'utilisateur.
  avatarUrl: "https://i.pravatar.cc/300?u=jean.michel",
};

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

  return (
    <View style={styles.screen}>
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Mon profil</Text>

          <View style={styles.identity}>
            <Image source={{ uri: USER.avatarUrl }} style={styles.avatar} />
            <Text style={styles.name}>{USER.name}</Text>
          </View>

          <View style={styles.menu}>
            {MENU_ITEMS.map((label) => (
              <ProfileMenuRow key={label} label={label} onPress={() => {}} />
            ))}
            <ProfileMenuRow label="Devenir chauffeur" onPress={() => router.push("/driver-login")} />
          </View>

          <Pressable onPress={() => router.replace("/")}>
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
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: colors.iconCircle,
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

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import HorizontalLine from "@/components/HorizontalLines";
import VerticalLine from "@/components/VerticalLines";
import { ExtendedTheme } from "@/constants/CustomTheme";
import { CustomButton } from "@/components/custom/CustomButton";

const LandingPage = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const handleSignin = () => {
    router.push("/signin")
  };

  const handleRegister = () => {
    router.push("/signup")
  };

  const handleGoogleSingin = () => {
    router.push("/signin")
  };

  const handleSkip = () => {
    router.replace("/authenticated/(tabs)/homePage")
  };

  return (
    <SafeAreaView style={styles.container}>

      <HorizontalLine animation={true} />
      <VerticalLine animation={true} />
      <View style={styles.innerContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>SecureStore</Text>
        </View>

        <View style={styles.buttonGroup}>
          <CustomButton
            borderColor={colors.blue}
            onPress={handleGoogleSingin}
            style={{ marginBottom: 16 }} >
            <AntDesign name="google" size={20} color={colors.blue} style={styles.iconSpacing} />
            <Text style={styles.googleText}>Continue with Google</Text>
          </CustomButton>

          <CustomButton borderColor={colors.muted} onPress={handleSkip}>
            <Feather name="smartphone" size={20} color={colors.text + "80"} style={styles.iconSpacing} />
            <Text style={styles.mobileText}>Just Skip for Now</Text>
          </CustomButton>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={handleSignin}>
            <Text style={styles.footerText}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.footerText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView >
  );
};

export default LandingPage;

const createStyles = (colors: ExtendedTheme['colors']) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    innerContainer: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 80,
      paddingHorizontal: 24,
    },
    logoContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    logoText: {
      color: colors.text,
      fontSize: 30,
      fontFamily: "GroteskBold"
    },
    buttonGroup: {
      width: "100%",
      marginBottom: 40,
    },
    googleText: {
      color: colors.blue,
      fontFamily: "GroteskBold",
      fontSize: 16,
    },
    mobileText: {
      color: colors.text + "80",
      fontFamily: "GroteskBold",
      fontSize: 16,
    },
    iconSpacing: {
      marginRight: 8,
    },
    footer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
    },
    footerText: {
      fontSize: 16,
      color: colors.muted,
      fontFamily: "Grotesk",
      paddingHorizontal: 16,
    },
    divider: {
      width: 1,
      height: 20,
      backgroundColor: colors.muted,
    },
  });

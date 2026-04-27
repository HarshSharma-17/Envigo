import { View, Text, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setTimeout(() => {
        if (user) {
          // ✅ User already logged in
          router.replace("/(tabs)");
        } else {
          // ❌ Not logged in
          router.replace("/(auth)/onboard");
        }
      }, 2000);       // keep splash delay
    }); 

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoCircle}>
        <Text style={styles.logoText}>EnviGo</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
    alignItems: "center",
  },
  logoCircle: {
    backgroundColor: "#7CFC00",
    paddingVertical: 20,
    paddingHorizontal: 35,
    borderRadius: 50,
  },
  logoText: {
    fontSize: 28,
    fontWeight: "600",
    color: "#000",
  },
});
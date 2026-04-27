import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

export default function OnboardScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      {/* Car Image */}
      <Image
        source={require("../../assets/images/getstart.png")} // use your image
        style={styles.image}
        resizeMode="contain"
      />

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(auth)/login")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 60,
  },
  image: {
    width: "100%",
    height: 500,
    marginTop: 50,
  },
  button: {
    backgroundColor: "#9EF01A",
    paddingVertical: 12,
    paddingHorizontal: 120,
    borderRadius: 14,
    borderColor: "#000",
    borderWidth:1,
    
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    color: "#000",
    textAlign: "center",
  },
});
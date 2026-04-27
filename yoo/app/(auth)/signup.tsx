import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

// Firebase
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../../config/firebase";

// Google Auth
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const SignupScreen: React.FC = () => {
  const router = useRouter();

  // State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // Google Auth
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "858931539426-0i6a05biq1tq97pu3unq22nmtmuacbbk.apps.googleusercontent.com",
  });

  // Handle Google Response
  useEffect(() => {
    if (response?.type === "success") {
      const id_token = response.authentication?.idToken;

      if (!id_token) return;

      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then(() => {
          alert("Google Login Successful 🚀");
          router.replace("/(tabs)");
        })
        .catch((error) => {
          console.log(error);
          alert("Google login failed");
        });
    }
  }, [response]);

  // Email Signup
  const handleSignup = async () => {
  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  try {
    // 🔐 Create user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // 🔥 Save user data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      firstName,
      lastName,
      email,
      phone,
      dob,
      createdAt: new Date(),
    });

    alert("Signup successful 🚀");

    // 🚀 Navigate to main app
    router.replace("/(tabs)");
  } catch (error: any) {
    alert(error.message);
  }
};

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Image */}
        <Image
          source={require("../../assets/images/carev3.png")}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>Sign up</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>First name</Text>
          <TextInput
            placeholder="Enter your first name"
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
          />

          <Text style={styles.label}>Last name</Text>
          <TextInput
            placeholder="Enter your last name"
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            placeholder="Enter your date of birth"
            style={styles.input}
            value={dob}
            onChangeText={setDob}
          />

          <Text style={styles.label}>Phone number</Text>
          <View style={styles.phoneContainer}>
            <Text style={styles.countryCode}>🇮🇳 +91</Text>
            <TextInput
              style={styles.phoneInput}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Enter password"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Continue */}
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.or}>Or</Text>
          <View style={styles.line} />
        </View>

        {/* Google */}
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => promptAsync()}
        >
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Gmail (UI only) */}
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialText}>Continue with G-Mail</Text>
        </TouchableOpacity>

        {/* Login */}
        <Text style={styles.loginText}>
          Already have an account?{" "}
          <Text
            style={styles.loginLink}
            onPress={() => router.push("/(auth)/login")}
          >
            Login
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
};

export default SignupScreen;

// ================= STYLES =================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  image: {
    width: "100%",
    height: 160,
    marginTop: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontFamily: "Poppins_400Regular",
    marginBottom: 10,
    marginHorizontal: 20,
    color: "#000",
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    color: "#000",
    fontFamily: "Poppins_400Regular",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#999",
    paddingVertical: 6,
    marginBottom: 10,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#999",
    paddingVertical: 6,
  },
  countryCode: {
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
  },
  button: {
    backgroundColor: "#A3E635",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
    borderColor: "#000",
    borderWidth: 1,
  },
  buttonText: {
    fontFamily: "Poppins_600SemiBold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#999",
  },
  or: {
    marginHorizontal: 10,
    color: "#ccc",
  },
  socialButton: {
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  socialText: {
    fontFamily: "Poppins_400Regular",
  },
  loginText: {
    textAlign: "center",
    marginTop: 10,
    color: "#ccc",
  },
  loginLink: {
    color: "#A3E635",
    fontFamily: "Poppins_400Regular",
  },
});
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../config/firebase";

const ProfileScreen: React.FC = () => {
  const router = useRouter();

  const [userData, setUserData] = useState<any>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
  
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const snap = await getDoc(docRef);
  
        if (snap.exists()) {
          setUserData(snap.data());
        }
      }
    };
  
    fetchUser();
  }, []);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) return null;

  // ✅ Logout function (correct place)
  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/(auth)/login");
  };

  const handleMenuPress = (title: string) => {
    switch (title) {
      case "Your Vehicle":
        router.push("/vehicle");
        break;

      case "EnviCoins":
        router.push("/(tabs)/coins");
        break;

      case "Logout":
        handleLogout(); // ✅ FIXED
        break;
      
      case "Your Vehicle":
        router.push("../addVehicle");
        break;

      default:
        break;
    }
  };

  const menuItems = [
    {
      title: "Account",
      subtitle: "Email, change number",
      icon: require("../../assets/images/accounts.png"),
    },
    {
      title: "History",
      subtitle: "Check your activity",
      icon: require("../../assets/images/history.png"),
    },
    {
      title: "Your Vehicle",
      subtitle: "your own vehicles",
      icon: require("../../assets/images/vehicle.png"),
    },
    {
      title: "EnviCoins",
      subtitle: "your envicoins inventory",
      icon: require("../../assets/images/ecoin.png"),
    },
    {
      title: "Notifications",
      subtitle: "Allow us to remind",
      icon: require("../../assets/images/bell.png"),
    },
    {
      title: "Help & Support",
      subtitle: "Help center, contact us",
      icon: require("../../assets/images/help.png"),
    },
    {
      title: "Logout",
      subtitle: "logout your account",
      icon: require("../../assets/images/log.png"),
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>

        <View style={styles.logoWrap}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>Envi</Text>
          </View>
          <Text style={styles.logoText2}>Go</Text>
        </View>
      </View>

      {/* Profile */}
      <View style={styles.profileSection}>
        <Image
          source={require("../../assets/images/profile.png")}
          style={styles.profileImage}
        />
        <Text style={styles.name}>
          {userData
            ? `${userData.firstName} ${userData.lastName}`
            : "Loading..."}
        </Text>
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => handleMenuPress(item.title)}
          >
            <Image source={item.icon} style={styles.icon} />

            <View style={styles.textContainer}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSub}>{item.subtitle}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Image
        source={require("../../assets/images/profile-footer.png")}
        style={styles.footerImage}
      />
    </ScrollView>
  );
};

export default ProfileScreen;

// ================= STYLES =================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEDE8",
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },

  back: {
    fontSize: 20,
  },

  logoWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },

  logoCircle: {
    backgroundColor: "#A3E635",
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  logoText: {
    fontFamily: "Poppins_600SemiBold",
  },

  logoText2: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginLeft: 4,
  },

  profileSection: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 30,
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },

  name: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
  },

  menu: {
    marginTop: 10,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },

  icon: {
    width: 24,
    height: 24,
    marginRight: 14,
    marginLeft: 20,
    resizeMode: "contain",
  },

  textContainer: {
    flex: 1,
  },

  menuTitle: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
  },

  menuSub: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Poppins_400Regular",
    marginTop: 2,
  },

  footerImage: {
    width: "100%",
    height: 180,
    resizeMode: "contain",
    marginTop: 30,
    marginBottom: -50,
  },
});
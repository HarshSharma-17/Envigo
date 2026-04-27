import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { auth, db } from "../config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useRouter } from "expo-router";

export default function VehicleScreen() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<any[]>([]);

  // 🔥 FETCH VEHICLES
  useEffect(() => {
    const fetchVehicles = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const snapshot = await getDocs(
        collection(db, "users", user.uid, "vehicles")
      );

      const list: any[] = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });

      setVehicles(list);
    };

    fetchVehicles();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>

        <View style={styles.logo}>
          <Text style={styles.logoText}>Envi</Text>
          <Text style={styles.logoTextWhite}>Go</Text>
        </View>
      </View>

      {/* TITLE */}
      <Text style={styles.title}>Your Vehicles</Text>

      {/* ADD BUTTON */}
      <TouchableOpacity
        style={styles.addBtnTop}
        onPress={() => router.push("/(tabs)/addVehicle")}
      >
        <Text style={{ fontSize: 16 }}>+ Add Vehicle</Text>
      </TouchableOpacity>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search your vehicles"
          placeholderTextColor="#888"
          style={styles.input}
        />
      </View>

      {/* 🔥 DYNAMIC VEHICLE LIST */}
      {vehicles.map((item) => (
        <VehicleCard key={item.id} {...item} />
      ))}

      {/* IF NO VEHICLE */}
      {vehicles.length === 0 && (
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          No vehicles added yet 🚗
        </Text>
      )}
    </ScrollView>
  );
}

/* ================= VEHICLE CARD ================= */

const VehicleCard = ({
  name,
  charging,
  battery,
  power,
  type,
}: any) => {
  return (
    <View style={styles.cardWrapper}>
      
      {/* IMAGE (default for now) */}
      <Image
        source={require("../assets/images/be6.png")}
        style={styles.vehicleImage}
      />

      <View style={styles.card}>
        <Text style={styles.vehicleName}>{name}</Text>

        <View style={styles.featuresRow}>
          <FeatureItem title="Charging" value={charging} />
          <FeatureItem title="Battery" value={battery} />
        </View>

        <View style={styles.featuresRow}>
          <FeatureItem title="Power" value={power} />
          <FeatureItem title="Type" value={type} />
        </View>
      </View>
    </View>
  );
};

/* ================= FEATURE ITEM ================= */

const FeatureItem = ({ title, value }: any) => {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureValue}>{value}</Text>
    </View>
  );
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEFEA",
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  backText: {
    fontSize: 18,
  },

  logo: {
    flexDirection: "row",
    backgroundColor: "#A6F14A",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },

  logoText: {
    color: "#fff",
    fontWeight: "bold",
  },

  logoTextWhite: {
    color: "#000",
    fontWeight: "bold",
  },

  title: {
    fontSize: 26,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 15,
  },

  addBtnTop: {
    backgroundColor: "#A6F14A",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 15,
  },

  searchBox: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 36,
    paddingHorizontal: 15,
    paddingVertical: 6,
    marginBottom: 40,
  },

  input: {
    fontSize: 14,
  },

  cardWrapper: {
    marginBottom: 70,
    alignItems: "center",
  },

  vehicleImage: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    position: "absolute",
    top: -70,
  },

  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 15,
    elevation: 5,
  },

  vehicleName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },

  featuresRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  featureItem: {
    width: "48%",
  },

  featureTitle: {
    fontSize: 12,
    fontWeight: "600",
  },

  featureValue: {
    fontSize: 13,
  },
});
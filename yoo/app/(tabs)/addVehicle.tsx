import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { auth, db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "expo-router";

const AddVehicle = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [battery, setBattery] = useState("");
  const [range, setRange] = useState("");

  const handleAddVehicle = async () => {
    const user = auth.currentUser;

    if (!user) return;

    try {
      await addDoc(
        collection(db, "users", user.uid, "vehicles"),
        {
          name,
          battery,
          range,
          createdAt: new Date(),
        }
      );

      alert("Vehicle added 🚗");

      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Vehicle</Text>

      <TextInput
        placeholder="Vehicle Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Battery %"
        style={styles.input}
        value={battery}
        onChangeText={setBattery}
      />

      <TextInput
        placeholder="Range (km)"
        style={styles.input}
        value={range}
        onChangeText={setRange}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddVehicle}>
        <Text>Add Vehicle</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddVehicle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: "#A3E635",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
  },
});
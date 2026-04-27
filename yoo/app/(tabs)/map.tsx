import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  TextInput,
  Keyboard,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function MapScreen() {
  const [selectedStation, setSelectedStation] = useState<any>(null);
  const [stations, setStations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const sheetHeight = useRef(new Animated.Value(140)).current;
  const mapRef = useRef<MapView>(null);

  const defaultRegion = {
    latitude: 28.6139,
    longitude: 77.2090,
    latitudeDelta: 0.3,
    longitudeDelta: 0.3,
  };

  // 🔥 Fetch EV stations (CITY LEVEL)
  const fetchStations = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://api.openchargemap.io/v3/poi/?output=json&latitude=${lat}&longitude=${lng}&distance=50&maxresults=50`
      );

      const data = await response.json();

      const formatted = data
        .filter((item: any) => item?.AddressInfo)
        .map((item: any, index: number) => ({
          id: index,
          name: item.AddressInfo.Title || "EV Station",
          lat: item.AddressInfo.Latitude,
          lng: item.AddressInfo.Longitude,
          address: item.AddressInfo.AddressLine1 || "No address",
        }));

      setStations(formatted);
    } catch (err) {
      console.log("API error:", err);
    }
  };

  // 🔍 Search city → show stations
  const searchLocation = async () => {
    try {
      if (!search.trim()) return;

      setLoading(true);
      setStations([]); // clear old
      Keyboard.dismiss();

      const result = await Location.geocodeAsync(search);

      if (result.length > 0) {
        const { latitude, longitude } = result[0];

        // Zoom out for full city
        mapRef.current?.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        });

        await fetchStations(latitude, longitude);
        setSelectedStation(null);
        setSearch("");
      }
    } catch (err) {
      console.log("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🎬 Bottom sheet animation
  useEffect(() => {
    Animated.timing(sheetHeight, {
      toValue: selectedStation ? 260 : 140,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [selectedStation]);

  // 🧭 Navigation
  const openNavigation = (lat: number, lng: number) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      
      {/* 🔍 Search Bar */}
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search city (e.g. Delhi, Mumbai)"
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={searchLocation}
          style={styles.input}
        />
      </View>

      {/* ⏳ Loader */}
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#00FF00" />
        </View>
      )}

      {/* 🗺️ Map */}
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={defaultRegion}
      >
        {/* ⚡ EV Stations */}
        {stations.map((station) => (
          <Marker
            key={station.id}
            coordinate={{
              latitude: station.lat,
              longitude: station.lng,
            }}
            title={station.name}
            description={station.address}
            onPress={() => setSelectedStation(station)}
          />
        ))}
      </MapView>

      {/* 📦 Bottom Sheet */}
      <Animated.View style={[styles.overlay, { height: sheetHeight }]}>
        <View style={styles.handle} />

        {!selectedStation ? (
          <Text style={styles.text}>
            {stations.length > 0
              ? `${stations.length} EV Stations Found`
              : "Search a city to find EV stations"}
          </Text>
        ) : (
          <>
            <Text style={styles.title}>{selectedStation.name}</Text>
            <Text style={styles.info}>{selectedStation.address}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                openNavigation(
                  selectedStation.lat,
                  selectedStation.lng
                )
              }
            >
              <Text style={styles.buttonText}>Navigate</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setSelectedStation(null)}>
              <Text style={styles.close}>Close</Text>
            </TouchableOpacity>
          </>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  searchBox: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: "#000",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    zIndex: 10,
  },

  input: {
    color: "#fff",
  },

  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
    zIndex: 10,
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#000",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
  },

  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#555",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 10,
  },

  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

  info: {
    color: "#aaa",
    marginTop: 6,
  },

  button: {
    marginTop: 15,
    backgroundColor: "#1DB954",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#000",
    fontWeight: "600",
  },

  close: {
    color: "#aaa",
    marginTop: 10,
    textAlign: "center",
  },
});
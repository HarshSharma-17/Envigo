import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { useRouter } from "expo-router";

const HomeScreen: React.FC = () => {
  // 🔥 Ripple animation
  const scale1 = useRef(new Animated.Value(0)).current;
  const scale2 = useRef(new Animated.Value(0)).current;
  const opacity1 = useRef(new Animated.Value(1)).current;
  const opacity2 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animate = (scale: any, opacity: any, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.timing(scale, {
              toValue: 2,
              duration: 2000,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 2000,
              useNativeDriver: true,
            }),
          ]),
          Animated.timing(scale, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );
    };

    animate(scale1, opacity1, 0).start();
    animate(scale2, opacity2, 800).start();
  }, []);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });
  
  if (!fontsLoaded) return null;
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.logoWrap}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>Envi</Text>
          </View>
          <Text style={styles.logoText2}>Go</Text>
        </View>

        <TouchableOpacity 
        style={styles.profileCircle}
        onPress={() => router.push("/(tabs)/profile")}
        >
          <Text style={{ fontWeight: "600" }}>H</Text>
        </TouchableOpacity>
      </View>

      {/* BIKE + RIPPLE */}
      <View style={styles.bikeContainer}>
        <View style={styles.rippleContainer}>
          <Animated.View
            style={[
              styles.circle,
              { transform: [{ scale: scale1 }], opacity: opacity1 },
            ]}
          />
          <Animated.View
            style={[
              styles.circle,
              { transform: [{ scale: scale2 }], opacity: opacity2 },
            ]}
          />
        </View>

        <Image
          source={require("../../assets/images/ather.png")}
          style={styles.bike}
          resizeMode="contain"
        />

        <Text style={styles.bikeText}>Ather 450X Gen 3</Text>
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Text style={{ marginRight: 8 }}>🔍</Text>
        <TextInput
          placeholder="Where you want to go"
          style={{ flex: 1 }}
        />
      </View>

      <View style={styles.grid}>
        {/* LEFT COLUMN */}
        <View style={styles.leftColumn}>
          
          <TouchableOpacity 
          style={styles.cardLarge}
          onPress={() => router.push("/(tabs)/map")}
          >
            
            <Image source={require("../../assets/images/charging.png")} style={styles.cardImage}/>

            <View style={styles.overlay}>
              <Text style={styles.cardTitle}>Charging Stations</Text>
            </View>
          </TouchableOpacity>
        
          <TouchableOpacity style={styles.cardLarge}>
            
            <Image source={require("../../assets/images/hotel.png")} style={styles.cardImage}/>
            <View style={styles.overlay}>
              <Text style={styles.cardTitle}>Hotels with Charging Stations</Text>
            </View>
          </TouchableOpacity>
        
        </View>
        <View style={{ height: 10 }} />   
      
        {/* RIGHT COLUMN */}
        <View style={styles.rightColumn}>
      
          <TouchableOpacity style={styles.batteryCard}>
            <Text style={styles.cardTitle}>Battery</Text>
            <Image source={require("../../assets/images/battery.png")} style={styles.cardImageSmall}/>
            <Text style={styles.bigText}>95%</Text>
            <Text style={styles.smallText}>123.5 km left</Text>
          </TouchableOpacity>
      
        </View>
      </View>
    
    
      {/* SECOND GRID */}
      <View style={styles.grid2}>
      
        <TouchableOpacity style={styles.stepsCard}>
          <Text style={styles.bigText}>2314</Text>
          <Text style={styles.smallText}>Steps</Text>
        </TouchableOpacity>
      
        <TouchableOpacity 
        style={styles.coinsCard}
        onPress={() => router.push("/(tabs)/coins")}>
          <Text style={styles.cardTitle}>Envi Coins</Text>
          <Image source={require("../../assets/images/coins.png")} style={styles.cardImage}/>
        </TouchableOpacity>
      
      </View>
    
      {/* THIRD ROW */}
      <View style={styles.grid3}>
        <TouchableOpacity 
        style={styles.addVehicle}
        onPress={() => router.push("/vehicle")}>
          <Text>Add your vehicle +</Text>
        </TouchableOpacity>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.hash}>#GoGreen</Text>
        <Text style={styles.sub}>
          Build a better world with small steps
        </Text>

        <Image
          source={require("../../assets/images/world.png")}
          style={styles.footerImage}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEDE8",
    padding: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },

  logoWrap: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  logoCircle: {
    backgroundColor: "#A3E635",
    borderRadius: 50,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },

  logoText: {
    fontWeight: "700",
  },

  logoText2: {
    fontSize: 22,
    fontWeight: "700",
    marginLeft: 6,
  },

  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  bikeContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },

  bike: {
    width: 260,
    height: 180,
  },

  rippleContainer: {
    position: "absolute",
    bottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  circle: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#4ADE80",
  },

  bikeText: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "400",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 20,
    elevation: 3,
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  leftColumn: {
    width: "62%",
    justifyContent: "space-between",
  },
  
  rightColumn: {
    width: "35%",
    justifyContent: "space-between",
  },
  
  

  cardLarge: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    height:143,
    marginBottom: 10,
    elevation: 3,
  },
  batteryCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    height: 296, // 🔥 taller like design
    elevation: 4,
  },
  grid2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  
  stepsCard: {
    width: "32%",
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    elevation:4,
  },
  
  coinsCard: {
    width: "65%",
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    elevation: 3,
  },

  grid3: {
    marginBottom: 20,
  },
  
  addVehicle: {
    width:"100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    elevation: 3,
  },
  overlay: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
  },
  cardTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize:14,
  },

  bigText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
  },

  smallText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#555",
  },

  cardImage: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
    marginTop: 6,
  },

  cardImageSmall: {
    width: 100,
    height: 180,
    alignSelf: "center",
    marginVertical: 5,
  },

  

  footer: {
    marginTop: 30,
    alignItems: "flex-start",
  },

  hash: {
    fontSize: 36,
    fontWeight: "400",
  },

  sub: {
    color: "#555",
    marginTop: 5,
  },

  footerImage: {
    width: 440,
    height: 200,
    marginLeft: -45,
    resizeMode: "contain",
    marginTop: 20,
    marginBottom: -30,
  },
});
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
export default function LocationScreen() {
  const router = useRouter();
  return (
    
    <View style={styles.container}>

      <Image
        source={require("../assets/images/carev2.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Enter Your Location</Text>
      
    
      <Text style={styles.label}>Enter Your City</Text>
      <TextInput
        style={styles.input}
        placeholder="   City"
      />

     
      <Text style={styles.label}>Enter Your Locality</Text>
      <TextInput
        style={styles.input}
        placeholder="   Locality"
      />

      <Text style={styles.label}>Enter Your Pin Code</Text>
      <TextInput
        style={styles.input}
        placeholder="   Pincode" keyboardType="numeric"
      />

      <TouchableOpacity 
       style={styles.Button}
       onPress={() => router.replace("/(tabs)")}>
          <Text style={styles.ButtonText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.or}>OR</Text>
        <View style={styles.line} />
      </View>


      <TouchableOpacity style={styles.mapButton}>
          <Text style={styles.mapText}>Select on map</Text>
      </TouchableOpacity>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  image: {
  width: "100%",
  height: 180,
  marginTop: 70,
  marginBottom: 20,
  },
  title:{
    fontSize: 24,
    marginBottom: 15,
    fontFamily: 'Poppins_400Regular',
  },
  label:{
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    fontFamily: 'Poppins_400Regular',
  },
  input:{
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingVertical: 10,
    fontFamily: 'Poppins_400Regular',
  },
  Button:{
    backgroundColor: '#A3E635',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 15,
    borderColor: "#000",
    borderWidth: 1,
  },
  ButtonText:{
    fontFamily: 'Poppins_500Medium',
  },
  dividerContainer:{
      flexDirection:'row',
      alignItems:'center',
      marginVertical:16,
  },
  line:{
      flex:1,
      height:1,
      backgroundColor:'#ccc',
  },
  or:{
      marginHorizontal:10,
      color:'#888',
      fontFamily:'Poppins_400Regular',
  },
  mapButton:{
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    borderColor: "#000",
    borderWidth: 1,
  },
  mapText:{
    fontFamily: 'Poppins_500Medium',
  },
});
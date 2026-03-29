import{View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { useState } from "react"
import { useRouter } from "expo-router";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

export default function LoginScreen() {
    const [phone, setPhone] = useState('');
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/carev1.png')} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>Login</Text>

            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.countryCode}>+91</Text>
                <TextInput
                style={styles.input}
                placeholder=" Enter phone number"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                />

            </View>
                
            <TouchableOpacity 
              style={styles.buttom}
              onPress={() => router.push('/location')}>
                <Text style={styles.buttomText}>Continue</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
                <View style={styles.line} />
                <Text style={styles.or}>OR</Text>
                <View style={styles.line} />
            </View>

            <TouchableOpacity style={styles.socialButton}>
              <View style={styles.socialContent}>
                <AntDesign name="google" size={20} color="#DB4437" />
                <Text style={styles.googleText}>Continue with Google</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <View style={styles.socialContent}>
                <MaterialIcons name="email" size={20} color="#EA4335" />
                <Text style={styles.googleText}>Continue with G-Mail</Text>
              </View>
            </TouchableOpacity>

            <Text style={styles.footer}>Don't have an account?{" "}
                <Text style={styles.link}
                onPress={() => router.push("/signup")}>Create account</Text>
            </Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    image:{
        marginTop: 80,
        width: "100%",
        height: 150,
        marginBottom: 50,

    },
    title:{
        fontSize:28,
        //fontWeight:'bold',
        marginBottom: 30,
        fontFamily:'Poppins_400Regular',
    },
    label:{
        fontSize:14,
        marginBottom:6,
        color:'#333',
        fontFamily:'Poppins_400Regular',
    },
    inputContainer:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#f9f9f9',
        borderWidth:1,
        borderColor:'#ddd',
        borderRadius:12,
        paddingHorizontal:10,
        marginBottom:20,
        
    },
    countryCode:{
        fontSize:14,
        marginRight:8,
        fontFamily:'Poppins_400Regular',
    },
    input:{
        flex:1,
        paddingVertical:12,
        fontFamily:'Poppins_400Regular',
    },
    buttom:{
        backgroundColor:"#A3E635",
        padding:15,
        borderRadius:10,
        alignItems:'center',
        borderColor:'#000',
        borderWidth:1,
    },
    buttomText:{
        //fontWeight:'light',
        fontSize:16,
        fontFamily:'Poppins_400Regular',
    },
    dividerContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:20,
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
    socialContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10, // spacing between icon & text
    },

    
    socialButton:{
        borderWidth: 1,
        borderColor:'#000',
        padding:15,
        borderRadius:12,
        alignItems:'center',
        marginBottom:10,
        backgroundColor:'#f9f9f9',

        

    },
    
    footer:{
        marginTop:"auto",
        marginBottom:20,
        textAlign:'center',
        color:'#666',
        fontFamily:'Poppins_400Regular',   
    },
    link:{
        fontWeight:'bold',
        color:'#A3E635',
    },
    googleText:{
        fontSize:14,
        fontFamily:'Poppins_400Regular',
    },



    
    });
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Animated,
  Easing
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { userStore } from '../utils/authData';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [glowAnim] = useState(new Animated.Value(0));

  // Create pulsing glow effect
  React.useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        })
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  const glowInterpolation = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2]
  });

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1]
  });

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('AUTHENTICATION ERROR', 'CREDENTIALS REQUIRED', [
        { text: 'ACKNOWLEDGE', style: 'destructive' }
      ]);
      return;
    }

    try {
      setLoading(true);

      if (username === userStore.email && password === userStore.password) {
        Alert.alert('ACCESS GRANTED', 'WELCOME TO NERV HQ', [
          { text: 'PROCEED', style: 'default' }
        ]);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        Alert.alert('ACCESS DENIED', 'INVALID CREDENTIALS', [
          { text: 'RETRY', style: 'destructive' }
        ]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('SYSTEM ERROR', 'CONTACT NERV TECHNICAL SUPPORT', [
        { text: 'ACKNOWLEDGE', style: 'destructive' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* NERV Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/nerv.png')} // Replace with your local NERV logo
          style={styles.nervLogo}
        />
        <Text style={styles.headerText}>MAGI SYSTEM TERMINAL</Text>
      </View>

      {/* Evangelion Unit-01 Silhouette */}
      <Image
        source={require('../assets/silh.webp')} // Replace with local image
        style={styles.unitSilhouette}
      />

      {/* Main Content */}
      <View style={styles.content}>

        {/* Login Form */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>OPERATOR LOGIN</Text>
          
          <Text style={styles.inputLabel}>OPERATOR ID</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="ENTER NERV ID"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              placeholderTextColor="#ff0033"
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.inputLabel}>SECURITY CODE</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="ENTER MAGI PASSCODE"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              placeholderTextColor="#ff0033"
            />
          </View>

          <View style={styles.checkboxContainer}>
            <Checkbox
              value={rememberMe}
              onValueChange={() => setRememberMe(!rememberMe)}
              color={rememberMe ? '#ff0033' : undefined}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxText}>MAINTAIN SESSION</Text>
          </View>

          <TouchableOpacity
            style={[styles.loginButton, loading && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? 'AUTHENTICATING...' : 'INITIATE LOGIN'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.signupButton}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.signupText}>REQUEST ACCESS CLEARANCE</Text>
        </TouchableOpacity>
      </View>

      {/* Footer with blood-stripe */}
      <View style={styles.footer}>
        <View style={styles.bloodStripe} />
        <Text style={styles.footerText}>NERV SECURITY SYSTEM v3.33</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderBottomWidth: 1,
    borderBottomColor: '#ff0033',
  },
  nervLogo: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
    textShadowColor: '#ff0033',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  unitSilhouette: {
    position: 'absolute',
    width: '100%',
    height: '40%',
    opacity: 0.15,
    top: '15%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    zIndex: 1,
  },
  glowContainer: {
    position: 'absolute',
    top: '10%',
  },
  glowLogo: {
    width: 200,
    height: 200,
    opacity: 0.3,
  },
  formContainer: {
    width: '100%',
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
    padding: 30,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ff0033',
  },
  sectionTitle: {
    color: '#ff0033',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    letterSpacing: 1,
  },
  inputLabel: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 5,
    letterSpacing: 1,
  },
  inputContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ff0033',
  },
  input: {
    color: '#fff',
    padding: 10,
    fontSize: 14,
    letterSpacing: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10,
  },
  checkbox: {
    marginRight: 10,
    borderColor: '#ff0033',
  },
  checkboxText: {
    color: '#fff',
    fontSize: 12,
    letterSpacing: 1,
  },
  loginButton: {
    backgroundColor: '#ff0033',
    padding: 15,
    borderRadius: 2,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  signupButton: {
    marginTop: 20,
    padding: 10,
  },
  signupText: {
    color: '#ff0033',
    fontSize: 12,
    letterSpacing: 1,
    textDecorationLine: 'underline',
  },
  footer: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  bloodStripe: {
    height: 3,
    width: '100%',
    backgroundColor: '#ff0033',
    marginBottom: 10,
  },
  footerText: {
    color: '#fff',
    fontSize: 10,
    letterSpacing: 1,
  },
});

export default LoginScreen;
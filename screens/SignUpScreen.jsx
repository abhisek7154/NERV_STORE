import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Animated, Easing } from 'react-native';
import { Formik } from 'formik';
import Checkbox from 'expo-checkbox';
import { signupValidationSchema } from '../utils/validation';
import { userStore } from '../utils/authData';

const SignupScreen = ({ navigation }) => {
  const [glowAnim] = React.useState(new Animated.Value(0));

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
    outputRange: [1, 1.05]
  });

  const handleSignup = (values) => {
    console.log('Registered:', values);
    userStore.fullName = values.fullName;
    userStore.email = values.email;
    userStore.password = values.password;

    Alert.alert('ACCESS GRANTED', 'PROFILE SYNCHRONIZATION COMPLETE', [
      { text: 'PROCEED TO LOGIN', onPress: () => navigation.navigate('Login') }
    ]);
  };

  return (
    <Formik
      initialValues={{
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
      }}
      validationSchema={signupValidationSchema}
      onSubmit={handleSignup}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>NERV SECURITY TERMINAL</Text>
            <Text style={styles.headerSubtext}>PERSONNEL REGISTRATION</Text>
          </View>

          <Animated.View style={[styles.content, { transform: [{ scale: glowInterpolation }] }]}>
            <Text style={styles.sectionTitle}>NEW OPERATOR REGISTRATION</Text>

            <Text style={styles.inputLabel}>FULL DESIGNATION</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="ENTER FULL NAME"
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                value={values.fullName}
                style={styles.input}
                placeholderTextColor="#ff0033"
              />
            </View>
            {touched.fullName && errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}

            <Text style={styles.inputLabel}>NERV IDENTIFICATION</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="ENTER AUTHORIZED EMAIL"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                style={styles.input}
                placeholderTextColor="#ff0033"
              />
            </View>
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <Text style={styles.inputLabel}>SECURITY PASSCODE</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="ENTER MAGI-ENCRYPTED PASSCODE"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                style={styles.input}
                placeholderTextColor="#ff0033"
              />
            </View>
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <Text style={styles.inputLabel}>PASSCODE VERIFICATION</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="RE-ENTER PASSCODE"
                secureTextEntry
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                style={styles.input}
                placeholderTextColor="#ff0033"
              />
            </View>
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            )}

            <View style={styles.checkboxContainer}>
              <Checkbox
                value={values.acceptTerms}
                onValueChange={() => setFieldValue('acceptTerms', !values.acceptTerms)}
                color={values.acceptTerms ? '#ff0033' : undefined}
                style={styles.checkbox}
              />
              <Text style={styles.checkboxText}>ACKNOWLEDGE SECURITY PROTOCOLS</Text>
            </View>

            <TouchableOpacity 
              style={styles.signupButton} 
              onPress={handleSubmit}
            >
              <Text style={styles.signupButtonText}>INITIATE REGISTRATION</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.loginButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginButtonText}>EXISTING OPERATOR LOGIN</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.bloodStripe} />
            <Text style={styles.footerText}>NERV SECURITY SYSTEM v3.33</Text>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-between',
  },
  header: {
    padding: 25,
    paddingTop: 50,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ff0033',
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
  headerSubtext: {
    color: '#ff0033',
    fontSize: 12,
    letterSpacing: 3,
    marginTop: 5,
  },
  content: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
  },
  sectionTitle: {
    color: '#ff0033',
    fontSize: 16,
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
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ff0033',
  },
  input: {
    color: '#fff',
    padding: 10,
    fontSize: 14,
    letterSpacing: 1,
  },
  error: {
    color: '#ff0033',
    fontSize: 11,
    marginBottom: 15,
    letterSpacing: 0.5,
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
    flex: 1,
  },
  signupButton: {
    backgroundColor: '#ff0033',
    padding: 15,
    borderRadius: 2,
    alignItems: 'center',
    marginTop: 10,
  },
  signupButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  loginButton: {
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
  },
  loginButtonText: {
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
};

export default SignupScreen;
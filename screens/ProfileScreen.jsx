import React from 'react';
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { userStore } from '../utils/authData';

const ProfileScreen = ({ navigation }) => {
  const { fullName, email } = userStore;
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
    outputRange: [1, 1.03]
  });

  const handleLogout = () => {
    userStore.fullName = '';
    userStore.email = '';
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>NERV OPERATOR PROFILE</Text>
        <Text style={styles.headerSubtext}>SECURITY CLEARANCE LEVEL: {fullName ? 'A' : 'N/A'}</Text>
      </View>

      <Animated.View style={[styles.content, { transform: [{ scale: glowInterpolation }] }]}>
        {/* Profile Silhouette Placeholder */}
        <View style={styles.profileSilhouette}>
          <Text style={styles.silhouetteText}>OPERATOR</Text>
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.sectionTitle}>OPERATOR DATA</Text>
          
          <Text style={styles.infoLabel}>DESIGNATION</Text>
          <Text style={styles.infoValue}>
            {fullName || 'NOT REGISTERED'}
          </Text>

          <Text style={styles.infoLabel}>NERV ID</Text>
          <Text style={styles.infoValue}>
            {email || 'NOT AUTHORIZED'}
          </Text>

          <Text style={styles.infoLabel}>SECURITY STATUS</Text>
          <Text style={styles.infoValue}>
            {fullName ? 'ACTIVE' : 'INACTIVE'}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>TERMINATE SESSION</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>RETURN TO HQ</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.bloodStripe} />
        <Text style={styles.footerText}>NERV SECURITY SYSTEM v3.33</Text>
      </View>
    </View>
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
  profileSilhouette: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#ff0033',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30,
  },
  silhouetteText: {
    color: '#ff0033',
    fontSize: 14,
    letterSpacing: 1,
  },
  profileInfo: {
    alignSelf: 'stretch',
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#ff0033',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    letterSpacing: 1,
  },
  infoLabel: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 5,
    letterSpacing: 1,
  },
  infoValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 20,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ff0033',
  },
  logoutButton: {
    backgroundColor: '#ff0033',
    padding: 15,
    borderRadius: 2,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  backButton: {
    marginTop: 15,
    padding: 10,
    alignItems: 'center',
  },
  backButtonText: {
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

export default ProfileScreen;
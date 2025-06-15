import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { userStore } from '../utils/authData';

const ProfileScreen = ({ navigation }) => {
  const { fullName, email } = userStore;

  const handleLogout = () => {
    userStore.fullName = '';
    userStore.email = '';
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* Nav Bar */}
      <View style={styles.navBar}>
        <Text style={styles.navTitle}>OPERATOR PROFILE</Text>
      </View>

      {/* Profile Content */}
      <View style={styles.content}>
        <View style={styles.profileSilhouette}>
          <Text style={styles.silhouetteText}>NERV</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>DESIGNATION:</Text>
          <Text style={styles.infoValue}>{fullName || 'CLASSIFIED'}</Text>

          <Text style={styles.infoLabel}>IDENTIFICATION:</Text>
          <Text style={styles.infoValue}>{email || 'RESTRICTED'}</Text>

          <Text style={styles.infoLabel}>SECURITY LEVEL:</Text>
          <Text style={styles.infoValue}>{fullName ? 'LEVEL A' : 'LEVEL 0'}</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>TERMINATE SESSION</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  navBar: {
    height: 60,
    backgroundColor: '#111',
    borderBottomWidth: 1,
    borderBottomColor: '#ff0033',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  navTitle: {
    color: '#ff0033',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileSilhouette: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#ff0033',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  silhouetteText: {
    color: '#ff0033',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoSection: {
    width: '100%',
    marginBottom: 40,
  },
  infoLabel: {
    color: '#ff0033',
    fontSize: 12,
    marginTop: 15,
    letterSpacing: 1,
  },
  infoValue: {
    color: '#fff',
    fontSize: 16,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#ff0033',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
};

export default ProfileScreen;
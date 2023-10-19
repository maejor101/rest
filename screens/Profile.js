import React, { useState, useContext, useCallback } from "react";
import { View, Image, StyleSheet, Text, TextInput, ScrollView, Switch, Button } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const Profile = () => {
  const { user, update, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    orderStatuses: false,
    passwordChanges: false,
    specialOffers: false,
    newsletter: false,
    image: "",
  });

  const saveProfile = async () => {
    // Save the profile data to Firestore
    update(profile);
  };

  const handleLogout = () => {
    logout();
  };

  // FONTS
  const [fontsLoaded] = useFonts({
    "Karla-Regular": require("../assets/fonts/Karla-Regular.ttf"),
    "Karla-Medium": require("../assets/fonts/Karla-Medium.ttf"),
    "Karla-Bold": require("../assets/fonts/Karla-Bold.ttf"),
    "Karla-ExtraBold": require("../assets/fonts/Karla-ExtraBold.ttf"),
    "MarkaziText-Regular": require("../assets/fonts/MarkaziText-Regular.ttf"),
    "MarkaziText-Medium": require("../assets/fonts/MarkaziText-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.avatarImage}
          source={{ uri: profile.image }}
        />
        <Text style={styles.name}>{profile.firstName} {profile.lastName}</Text>
        <Text style={styles.email}>{profile.email}</Text>
      </View>
      <View style={styles.settingsContainer}>
        <Text style={styles.settingsHeader}>Notification Settings</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Order Statuses</Text>
          <Switch
            value={profile.orderStatuses}
            onValueChange={(value) => setProfile({ ...profile, orderStatuses: value })}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Password Changes</Text>
          <Switch
            value={profile.passwordChanges}
            onValueChange={(value) => setProfile({ ...profile, passwordChanges: value })}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Special Offers</Text>
          <Switch
            value={profile.specialOffers}
            onValueChange={(value) => setProfile({ ...profile, specialOffers: value })}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Newsletter</Text>
          <Switch
            value={profile.newsletter}
            onValueChange={(value) => setProfile({ ...profile, newsletter: value })}
          />
        </View>
      </View>
      <Button title="Save Profile" onPress={saveProfile} />
      <Button title="Logout" onPress={handleLogout} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileContainer: {
    alignItems: "center",
    padding: 20,
  },
  avatarImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    marginTop: 10,
    fontSize: 24,
    fontFamily: "Karla-Bold",
  },
  email: {
    fontSize: 18,
    color: "#555",
    fontFamily: "Karla-Regular",
  },
  settingsContainer: {
    padding: 20,
  },
  settingsHeader: {
    fontSize: 24,
    fontFamily: "Karla-Bold",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  settingText: {
    fontSize: 18,
    fontFamily: "Karla-Regular",
  },
});

export default Profile;

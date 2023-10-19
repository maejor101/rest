import React, { useEffect, useReducer } from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Onboarding from './screens/Onboarding';
import Profile from './screens/Profile';
import SplashScreen from './screens/SplashScreen';
import Home from './screens/Home';
import { AuthContext } from './contexts/AuthContext';
import { db } from './firebase'; // Import your Firebase configuration

const Stack = createNativeStackNavigator();

const initialState = {
  isLoading: true,
  isOnboardingCompleted: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'ONBOARD':
      return {
        ...state,
        isLoading: false,
        isOnboardingCompleted: true,
      };
    case 'OFFBOARD':
      return {
        ...state,
        isLoading: false,
        isOnboardingCompleted: false,
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function checkOnboardingStatus() {
      try {
        const profileRef = db.collection('profiles').doc('YOUR_USER_ID'); // Replace with the user's unique ID or email
        const doc = await profileRef.get();

        if (doc.exists) {
          dispatch({ type: 'ONBOARD' });
        } else {
          dispatch({ type: 'OFFBOARD' });
        }
      } catch (e) {
        console.error(e);
        dispatch({ type: 'OFFBOARD' });
      }
    }

    checkOnboardingStatus();
  }, []);

  const authContext = {
    onboard: async (data) => {
      try {
        const profileRef = db.collection('profiles').doc('YOUR_USER_ID'); // Replace with the user's unique ID or email
        await profileRef.set(data);
        dispatch({ type: 'ONBOARD' });
      } catch (e) {
        console.error(e);
      }
    },
    update: async (data) => {
      try {
        const profileRef = db.collection('profiles').doc('YOUR_USER_ID'); // Replace with the user's unique ID or email
        await profileRef.update(data);
        Alert.alert('Success', 'Successfully saved changes!');
      } catch (e) {
        console.error(e);
      }
    },
    logout: async () => {
      try {
        const profileRef = db.collection('profiles').doc('YOUR_USER_ID'); // Replace with the user's unique ID or email
        await profileRef.delete();
        dispatch({ type: 'OFFBOARD' });
      } catch (e) {
        console.error(e);
      }
    },
  };

  if (state.isLoading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          {state.isOnboardingCompleted ? (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Profile" component={Profile} />
            </>
          ) : (
            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;

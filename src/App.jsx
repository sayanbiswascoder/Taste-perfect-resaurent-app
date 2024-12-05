import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StatusBar } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import OnboardingScreen from './screens/auth/OnBoarding';
import LoginSignupScreen from './screens/auth/LoginSignup';
import ForgetPasswordScreen from './screens/auth/ForgetPassword';
import MainApp from './screens/mainApp/MainApp';


const Stack = createStackNavigator();

function App() {
    const [splashScreen, setSplashScreen] = useState(true);
    const [isLogedIn, setIsLogedIn] = useState(null);

    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

    const checkLogin = async () => {
        const splashTimeout = () => {
            if (isLogedIn !== null) {
                SplashScreen.hide();
                setSplashScreen(false);
            } else {
                setTimeout(splashTimeout, 500);
            }
        };
        setTimeout(splashTimeout, 1000);
        const JWT = await AsyncStorage.getItem('JWT');
        if (JWT) {
            axios.post('http://192.168.166.252:3000/api/auth/verifyJWT', {
                'token': JWT,
                'type': 'restaurants',
            }).then(response => {
                if (response.status === 200) {
                    setIsLogedIn(true);
                } else {
                    setIsLogedIn(false);
                }
            }).catch(error => {
                console.log(error);
                setIsLogedIn(false);
            });
        }
        else {
            setIsLogedIn(false);
        }
    };

    useEffect(() => {
        checkLogin();
    });
    return (
        // eslint-disable-next-line react-native/no-inline-styles
        <SafeAreaView style={{ height: '100%', width: '100%' }}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#f75454"
                translucent={true}
                showHideTransition="fade"
                hidden={false}
            />
            {!splashScreen && <NavigationContainer theme={DefaultTheme}>
                <Stack.Navigator initialRouteName={isLogedIn ? 'MainApp' : 'Onboarding'} screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                    <Stack.Screen name="LoginSignup" component={LoginSignupScreen} />
                    <Stack.Screen name="ForgetPass" component={ForgetPasswordScreen} />
                    <Stack.Screen name="MainApp" component={MainApp} />
                </Stack.Navigator>
            </NavigationContainer>}
            <Toast visibilityTime={3000} position="bottom" text2Style={{ color: 'black' }} />
        </SafeAreaView>
    );
}


export default App;

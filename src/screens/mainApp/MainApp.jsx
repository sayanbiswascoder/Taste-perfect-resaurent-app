/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './Home';
import BusinessScreen from './Business';
import AccountScreen from './Account';
import MenuScreen from './Menu';
import CouponsScreen from './Coupon';
import OrdersScreen from './Orders';
import ReviewsScreen from './Reviews';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarLabelStyle: { color: 'red' },
            }}
            tabBarHideOnKeyboard={true}
        >
            <Tab.Screen name="Home" options={{ title: 'Home', tabBarIcon: ({ focused, size }) => <Icon name={focused ? 'pizza' : 'pizza-outline'} size={size} color="red" /> }} component={HomeScreen} />
            <Tab.Screen name="Business" options={{ title: 'Business', tabBarIcon: ({ focused, size }) => <Icon name={focused ? 'business' : 'business-outline'} size={size} color="red" /> }} component={BusinessScreen} />
            <Tab.Screen name="Menu" options={{ title: 'Menu', tabBarIcon: ({ focused, size }) => <Icon name={focused ? 'book' : 'book-outline'} size={size} color="red" /> }} component={MenuScreen} />
            <Tab.Screen name="Coupon" options={{ title: 'Coupon', tabBarIcon: ({ focused, size }) => <Icon name={focused ? 'ticket' : 'ticket-outline'} size={size} color="red" /> }} component={CouponsScreen} />
            <Tab.Screen name="Account" options={{ title: 'Account', tabBarIcon: ({ focused, size }) => <Icon name={focused ? 'person' : 'person-outline'} size={size} color="red" /> }} component={AccountScreen} />
        </Tab.Navigator>
    );
};

const MainApp = () => {
    return (
        <SafeAreaView style={{ height: '100%' }}>
            <StatusBar backgroundColor="red" />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MainAppStack" component={TabNavigator} />
                <Stack.Screen name="PastOrders" component={OrdersScreen} />
                <Stack.Screen name="Reviews" component={ReviewsScreen} />
            </Stack.Navigator>
        </SafeAreaView>
    );
};

export default MainApp;

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

//screens
import homescreen from '../screens/homescreen';
import shop from '../screens/shop';
import newPlant from '../screens/newPlant';
import user from '../screens/user';

import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                tabBarActiveTintColor: 'green',
            }}
        >
            <Tab.Screen 
                name='Usuario' 
                component={user} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name='account' color={color} size={size} />
                    ),
                    
                    headerTintColor: 'green'
                }}
            />
            <Tab.Screen 
                name='Home' 
                component={homescreen} 
                options={{
                    tabBarLabel: 'Feed',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name='home' color={color} size={size} />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen 
                name='Nueva planta' 
                component={newPlant} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="flower" size={size} color={color} />
                    ),
                    headerTintColor: 'green'
                }}
            />
            <Tab.Screen 
                name='Tienda' 
                component={shop} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name='shopping' color={color} size={size} />
                    ),
                    
                    headerTintColor: 'green'
                }}
            />
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    )
}
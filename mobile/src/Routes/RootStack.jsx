import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen } from '../Screens/SplashScreen';
import { SignUpScreen } from '../Screens/SignUpScreen';
import { SignInScreen } from '../Screens/SignInScreen';

const Stack = createStackNavigator();

export const RootStack = ({ navigation }) =>
    (<Stack.Navigator headerMode="none" initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="SingInScreen" component={SignInScreen} />
        <Stack.Screen name="SingUpScreen" component={SignUpScreen} />
    </Stack.Navigator>);
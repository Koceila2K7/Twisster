import React from 'react'
import Profile from "../Screens/ProfileScreen";
import FollowersScreen from "../Screens/FollowersScreen";

import EditerProfil from "../Screens/EditerProfile";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainTabScreen from "./TabRouter"
import { DrawerContent } from "../Components/DrawerContent"
import { createStackNavigator } from "@react-navigation/stack"
import { View } from 'react-native';

const ProfileStack = createStackNavigator();

const PorileStackScreen = (props) => (<ProfileStack.Navigator
    screenOptions={{
        header: () => <View></View>
    }}>


    <ProfileStack.Screen name="Profiles" component={Profile} {...props} />
    <ProfileStack.Screen name="EditerSreen" component={EditerProfil} {...props} />
    <ProfileStack.Screen name="FollowersScreen" component={FollowersScreen} {...props} />



</ProfileStack.Navigator>)



export const DrawerRouter = () => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator drawerContent={props => (<DrawerContent {...props} />)}>
            <Drawer.Screen name="Home" component={MainTabScreen} />
            <Drawer.Screen name="Profile" component={PorileStackScreen} />
        </Drawer.Navigator>
    )
}

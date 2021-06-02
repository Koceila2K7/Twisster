import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import HommeScreen from "../Screens/HomeScreen";
import SearchScreen from "../Screens/SearchScreen";
import NotificationSreen from "../Screens/NotificationsScreen";
import MessageScreen from "../Screens/MessagesScreen";
import Icon from "react-native-vector-icons/MaterialIcons"
import Header from "../Components/Header";
import { INACTIVE_COLOR, PRIMARY_COLOR, PRIMARY_WHITE } from "../Styles/Colors";
import NewPost from "../Screens/NewPostScreen";
import { View } from "react-native";
import ConversationSecreen from "../Screens/ConversationSecreen";
import NewMessagesScreen from "../Screens/NewMessageScreen";
const MainTab = createMaterialBottomTabNavigator();

const HommeStack = createStackNavigator();
const SearchStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const MessageStack = createStackNavigator();

const Stack_Screen_Option = (navigation) => ({
    headerStyle: {
        backgroundColor: '#009387',
    },
    header: () => <Header navigation={navigation} />,
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold'
    }
})
const HommeStackScreen = ({ navigation }) => (
    <HommeStack.Navigator
        screenOptions={Stack_Screen_Option(navigation)}
    >
        <HommeStack.Screen
            name="homeScreen"
            component={HommeScreen} />

        <HommeStack.Screen
            name="newPost"
            component={NewPost}
            options={{
                headerShown: false
            }}
        />
    </HommeStack.Navigator>
)
const SearchStackSreen = ({ navigation }) => (
    <SearchStack.Navigator
        screenOptions={{
            header: () => <View></View>
        }}
    >
        <SearchStack.Screen
            name="searchScreen"
            component={SearchScreen} />
    </SearchStack.Navigator>
)

const NotificationStackScreen = ({ navigation }) => (
    <NotificationStack.Navigator
        screenOptions={Stack_Screen_Option(navigation)}
    >
        <NotificationStack.Screen
            name="notifications"
            component={NotificationSreen} />
    </NotificationStack.Navigator>
)

const MessageStackScreen = ({ navigation }) => (
    <MessageStack.Navigator
        screenOptions={{
            header: () => <View></View>
        }}>
        <MessageStack.Screen
            header={Stack_Screen_Option(navigation)}
            
            name="messageScreen"
            component={MessageScreen} />
        <MessageStack.Screen

            name="conversationScreen"
            component={ConversationSecreen} />
        <MessageStack.Screen
            name="newmessageScreen"
            component={NewMessagesScreen} />
    </MessageStack.Navigator>)

const TabRouter = () => {
    return (
        <MainTab.Navigator
            barStyle={{ backgroundColor: PRIMARY_WHITE }}
            activeColor={PRIMARY_COLOR}
            inactiveColor={INACTIVE_COLOR}
        >
            <MainTab.Screen
                name="Home"
                component={HommeStackScreen}
                options={{
                    tabBarLabel: '',
                    tabBarColor: PRIMARY_WHITE,
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={26} />
                    ),
                }} />

            <MainTab.Screen
                name="Search"
                component={SearchStackSreen}
                options={{
                    tabBarLabel: '',
                    tabBarColor: PRIMARY_WHITE,
                    tabBarIcon: ({ color }) => (
                        <Icon name="search" color={color} size={26} />
                    ),
                }} />
            <MainTab.Screen
                name="Notification"
                component={NotificationStackScreen}
                options={{
                    tabBarLabel: '',
                    tabBarColor: PRIMARY_WHITE,
                    tabBarIcon: ({ color }) => (
                        <Icon name="notifications" color={color} size={26} />
                    ),
                }} />

            <MainTab.Screen
                name="Message"
                component={MessageStackScreen}
                options={{
                    tabBarLabel: '',
                    tabBarColor: PRIMARY_WHITE,
                    tabBarIcon: ({ color }) => (
                        <Icon name="email" color={color} size={26} />
                    ),
                }} />
        </MainTab.Navigator>
    )
}



export default TabRouter;
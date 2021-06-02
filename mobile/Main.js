import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from './src/Routes/RootStack';
import { ActivityIndicator } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { PROFILE_KEY } from "./src/constants/index";
import { DrawerRouter } from "./src/Routes/DrawerRouter";
import { View } from 'react-native';
import { PRIMARY_WHITE } from './src/Styles/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { fetch_post } from "./src/actions/posts"
import jwtDecode from 'jwt-decode';
import { signOut } from "./src/actions/auth"
export default function App() {
  const dispatch = useDispatch()
  const [profile, setProfile] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const authState = useSelector(state => state.auth)
  const posts = useSelector(state => state.posts)

  useEffect(() => {
    const getSignInInfo = async () => {
      let profile = await AsyncStorage.getItem(PROFILE_KEY);
      if (profile)
        profile = JSON.parse(profile)
      setProfile(profile)
      setisLoading(false)

    }
    setisLoading(true)
    getSignInInfo();
  }, [AsyncStorage, authState, dispatch]);

  useEffect(() => {
    const verif = async () => {
      let profile = await AsyncStorage.getItem(PROFILE_KEY);
      setisLoading(false)
      profile = JSON.parse(profile)
      if (profile.token) {
        let decode = jwtDecode(profile?.token);
        console.log(decode)
        console.log(decode)
        if (decode.exp * 1000 < new Date().getTime()) dispatch(signOut())
      }

    }
    setisLoading(true)
    verif()
  }, [])

  useEffect(() => { dispatch(fetch_post({ ...posts, posts: undefined })) }, [authState])
  return (isLoading) ?
    ((<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={PRIMARY_WHITE} />
    </View>))
    : (

      <NavigationContainer >
        {
          profile ?
            <DrawerRouter /> :
            <RootStack />
        }
      </NavigationContainer>

    );
}


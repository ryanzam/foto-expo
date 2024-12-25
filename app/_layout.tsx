import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

  const [loaded, error] = useFonts({
    "BlackberryJam": require("../assets/fonts/BlackberryJam.ttf")
  })

  useEffect(() => {
    if (error) throw error

    if (loaded) SplashScreen.hideAsync()

  }, [loaded, error])

  if (!loaded && !error) return null

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
    </Stack>
  )
}

export default RootLayout
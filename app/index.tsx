import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const App = () => {
  return (
    <View>
      <Text>index</Text>
      <Link href="/home">Go to home</Link>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})
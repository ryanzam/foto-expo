import { StyleSheet, Image, View, Text } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'

import icons from '@/constants/Icons'
import { Colors } from '@/constants/Colors'

const TabIcon = ({ name, color, icon, focused }: any) => {
    return <View style={styles.tabIconView}>
        <Image source={icon} resizeMode='contain' tintColor={color} style={styles.image} />
        <Text style={{ color: color }}>{name}</Text>
    </View>
}

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: Colors.textPrimary,
                tabBarStyle: {
                    backgroundColor: Colors.bgSecondary,
                    height: 60,
                    paddingTop: 10
                }
            }}
        >
            <Tabs.Screen name='home'
                options={{
                    title: "Home", headerShown: false, tabBarIcon: ({ color, focused }) => (
                        <TabIcon name={"Home"} icon={icons.home} color={color} focused={focused} />
                    )
                }} />
            <Tabs.Screen name='bookmark'
                options={{
                    title: "Bookmark", headerShown: false, tabBarIcon: ({ color, focused }) => (
                        <TabIcon name={"Bookmark"} icon={icons.bookmark} color={color} focused={focused} />
                    )
                }} />
            <Tabs.Screen name='create'
                options={{
                    title: "Create", headerShown: false, tabBarIcon: ({ color, focused }) => (
                        <TabIcon name={"Create"} icon={icons.plus} color={color} focused={focused} />
                    )
                }} />
            <Tabs.Screen name='profile'
                options={{
                    title: "Profile", headerShown: false, tabBarIcon: ({ color, focused }) => (
                        <TabIcon name={"Profile"} icon={icons.profile} color={color} focused={focused} />
                    )
                }} />
        </Tabs>
    )
}

export default TabsLayout

const styles = StyleSheet.create({
    image: {
        height: 20,
        width: 20
    },
    tabIconView: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2
    }
})
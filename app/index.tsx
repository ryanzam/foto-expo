import { ScrollView, StyleSheet, Image, View, Text, StatusBar } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
import Images from '@/constants/Images'
import AppText from '@/components/AppText'
import AppButton from '@/components/AppButton'

const App = () => {
    return <SafeAreaView style={styles.safeAreaView}>
        <ScrollView contentContainerStyle={{ height: "100%" }}>
            <View style={styles.logoView}>
                <Image source={Images.logo} style={styles.logo} />
            </View>

            <View style={styles.imagesView}>
                <Image source={Images.deer} style={styles.images} />
                <Image source={Images.parrot} style={styles.images} />
            </View>

            <AppText text='Have fun with Foto App' size={25} />
            <AppText text='Create and Explore creativity' size={20} color={Colors.textSecondary} />

            <AppButton text='Get Started' isLoading handlePress={() => router.push('/signin')} />

        </ScrollView>
    </SafeAreaView>
}

export default App

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: Colors.bgPrimary,
        height: "100%",
    },
    logoView: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        maxWidth: 150,
        maxHeight: 120,
        resizeMode: "contain",
    },
    imagesView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
        marginTop: 20
    },
    images: {
        maxWidth: 150,
        maxHeight: 220,
        borderColor: Colors.textSecondary,
        borderStyle: "solid",
        borderWidth: 5,
        borderRadius: 20,
        boxShadow: "20px red",
        transform: "rotate(10deg)",
    }
})
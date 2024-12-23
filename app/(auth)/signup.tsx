import { ScrollView, StyleSheet, Text, View, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
import Images from '@/constants/Images'
import AppText from '@/components/AppText'
import FormField from '@/components/FormField'
import AppButton from '@/components/AppButton'
import { Link, router } from 'expo-router'
import { createUser } from '@/lib/appwrite'

const Signup = () => {

    const [form, setForm] = useState({
        username: "", email: "", password: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = async () => {
        if (!form.username || !form.email || !form.password) {
            Alert.alert("Error", "Make sure all fields are filled")
        }
        setIsSubmitting(true)
        try {
            const res = await createUser(form.email, form.password, form.username)
            router.replace("/(tabs)/home")

        } catch (error: any) {
            Alert.alert("Error", error?.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView>
                <View style={styles.logoView}>
                    <Image source={Images.logo} style={styles.logo} />
                </View>

                <AppText text='Register' size={20} color={Colors.textSecondary} />

                <FormField text="Username"
                    value={form.username}
                    handleChange={(e: any) => setForm({ ...form, username: e.target.value })}
                    placeholder='Enter username'
                />

                <FormField text="Email"
                    value={form.email}
                    handleChange={(e: any) => setForm({ ...form, email: e.target.value })}
                    keyboardType="email-address"
                    placeholder='Enter email'
                />

                <FormField text="Password"
                    value={form.password}
                    handleChange={(e: any) => setForm({ ...form, password: e.target.value })}
                    keyboardType="email-address"
                    placeholder='Enter password'
                />

                <AppButton text='Register' isLoading={isSubmitting} handlePress={onSubmit} />

                <View style={styles.registerView}>
                    <AppText text={`Already have an account? `} color={Colors.textSecondary} size={15} />
                    <Link href="/(auth)/signin">
                        <AppText text={`Sign in`} color={Colors.textPrimary} size={20} />
                    </Link>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default Signup

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
    registerView: {

    }
})
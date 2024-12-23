import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'

type FormFieldProps = {
    text: string
    value: any
    handleChange: (e: any) => void
    keyboardType?: string
    placeholder: string
}

const FormField = ({ text, value, handleChange, keyboardType, placeholder }: FormFieldProps) => {

    const [showPassword, setShowPassworld] = useState(false)

    return (
        <View style={styles.mainView}>
            <Text style={styles.formText}>{text}</Text>

            <View style={styles.formView}>
                <TextInput style={styles.textInput}
                    value={value}
                    placeholder={placeholder}
                    secureTextEntry={text === "Password"}
                    onChange={handleChange}
                />
            </View>
        </View>
    )
}

export default FormField

const styles = StyleSheet.create({
    mainView: {
        padding: 10
    },
    formText: {
        color: Colors.textPrimary,
        fontSize: 18
    },
    formView: {
        height: 40,
        width: "100%",
        borderRadius: 10,
        marginBottom: 5,
        backgroundColor: "#282345"
    },
    textInput: {
        flex: 1,
        color: Colors.textSecondary,
        fontSize: 16
    }
})
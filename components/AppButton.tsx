import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

type AppButtonProps = {
    text: string
    isLoading: boolean
    handlePress: () => void
}

const AppButton = ({ text, isLoading, handlePress }: AppButtonProps) => {
    return (
        <TouchableOpacity style={styles.btnView} onPress={handlePress}>
            <Text style={styles.btnText}>{text}</Text>
        </TouchableOpacity>
    )
}

export default AppButton

const styles = StyleSheet.create({
    btnView: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        minHeight: 60,
    },
    btnText: {
        fontSize: 20,
        color: Colors.textSecondary,
        backgroundColor: Colors.bgSecondary,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 20,
        minWidth: 330,
        textAlign: "center"
    }
})
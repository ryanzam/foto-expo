import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

type TextProps = {
    text: string,
    size: number,
    color?: string
}

const AppText = ({ text, size, color = Colors.textPrimary }: TextProps) => {
    return (
        <View style={styles().textView}>
            <Text style={styles(size, color).textStyle}>{text}</Text>
        </View>
    )
}

export default AppText

const styles = (size?: number, color?: string) => StyleSheet.create({
    textView: {
        width: "100%"
    },
    textStyle: {
        color: color,
        fontSize: size,
        textAlign: "center",
        paddingTop: 20,
    }
})
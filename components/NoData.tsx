import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Images from '@/constants/Images'
import AppText from './AppText'
import AppButton from './AppButton'

type NoDataProps = {
    text: string
}

const NoData = ({ text }: NoDataProps) => {
    return (
        <View style={styles.view}>
            <Image source={Images.noimage} style={styles.image} />
            <AppText text={text} size={20} />

            <AppButton text='Create an image' isLoading handlePress={() => { }} />
        </View>
    )
}

export default NoData

const styles = StyleSheet.create({
    view: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    image: {
        height: 150,
        width: 150
    }
})
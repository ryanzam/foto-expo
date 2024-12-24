import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Models } from "react-native-appwrite"
import AppText from './AppText'
import { Colors } from '@/constants/Colors'
import Icons from '@/constants/Icons'

type ImageCardProps = {
    image: Models.Document
}

const ImageCard = ({ image: { title, photo, user: { username, avatar } } }: ImageCardProps) => {

    return (
        <View style={styles.mainView}>
            <View style={styles.mainTitleView}>
                <View style={styles.titleView}>
                    <Image source={{ uri: avatar }} style={styles.titleImage} />

                    <View>
                        <Text style={styles.titleText}>{title}</Text>
                        <Text style={styles.titleUser}>{username}</Text>
                    </View>
                </View>
                <View>
                    <Image source={Icons.menu} style={styles.titleIcon} />
                </View>
            </View>

            <View style={styles.photoView}>
                <Image source={{ uri: photo }} style={styles.photo} />
            </View>
        </View>
    )
}

export default ImageCard

const styles = StyleSheet.create({
    mainView: {
        padding: 5,
        marginBottom: 10
    },
    mainTitleView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    titleView: {
        display: "flex",
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 5,
        gap: 5,
        alignItems: "center"
    },
    titleImage: {
        height: 50,
        width: 50,
        borderRadius: 5
    },
    titleText: {
        color: Colors.textPrimary,
        fontSize: 18,
        fontWeight: "bold"

    },
    titleUser: {
        color: Colors.textPrimary,
        fontSize: 15
    },
    titleIconView: {
        height: 40,
        width: 40,
    },
    titleIcon: {
        height: 20,
        width: 20,
        resizeMode: "contain",
    },
    photoView: {
        marginTop: 10
    },
    photo: {
        height: 200,
        width: "100%",
        borderRadius: 10
    }
})
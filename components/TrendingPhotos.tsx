import { Image, StyleSheet, View, Text } from 'react-native'
import React, { useState } from 'react'
import { Models } from 'react-native-appwrite'
import { SwiperFlatList } from 'react-native-swiper-flatlist';

type TrendingPhotosProps = {
    photos: Models.Document[]
}

const TrendingPhotos = ({ photos }: TrendingPhotosProps) => {
    return (
        <View>
            <SwiperFlatList
                autoplay
                autoplayLoop
                showPagination
                data={photos}
                renderItem={({ item }) => (
                    <View >
                        <Image source={{ uri: item.photo }} style={styles.trendingImg}/>
                    </View>
                )}
            />
        </View>
    )

}

export default TrendingPhotos

const styles = StyleSheet.create({
    trendingView: {

    },
    trendingImg: {
        minHeight: 350,
        minWidth: 300,
        borderRadius: 20,
        marginRight: 10
    }
})
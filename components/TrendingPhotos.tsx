import { FlatList, StyleSheet } from 'react-native'
import React from 'react'
import AppText from './AppText'
import { Colors } from '@/constants/Colors'

type TrendingPhotosProps = {
    photos: []
}


const TrendingPhotos = ({ photos }: TrendingPhotosProps) => {
    
    return (
        <FlatList
            data={photos}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                
            )}
        >

        </FlatList>
    )
}

export default TrendingPhotos

const styles = StyleSheet.create({})
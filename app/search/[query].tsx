import { FlatList, StyleSheet, Text, View, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
import SearchInput from '@/components/SearchInput'
import NoData from '@/components/NoData'
import { searchPhotos } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import ImageCard from '@/components/ImageCard'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {

    const { query } = useLocalSearchParams()
    const { data: photos, refetchData } = useAppwrite(() => searchPhotos(query))

    useEffect(() => {
        refetchData();
    }, [query]);


    const [refreshing, setRefreshing] = useState(false)


    const onRefresh = async () => {
        setRefreshing(true)
        await refetchData()
        setRefreshing(false)
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <FlatList
                data={photos}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <ImageCard image={item} />
                )}

                ListHeaderComponent={() => (
                    <View style={styles.searchView}>
                        <View style={styles.searchView}>
                            <Text style={styles.searchText}>Search results for</Text>
                            <Text style={styles.searchQuery}>"{query}"</Text>
                        </View>

                        <SearchInput />

                    </View>
                )}

                ListEmptyComponent={() => (
                    <NoData text='No photos found.' />
                )}

                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </SafeAreaView >
    )
}

export default Search

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: Colors.bgPrimary,
        height: "100%"
    },
    trendingView: {
        gap: 10,
        marginBottom: 10
    },
    searchView: {
        marginTop: 5,
        marginBottom: 5,
        padding: 5
    },
    searchText: {
        fontSize: 15,
        color: Colors.textPrimary
    },
    searchQuery: {
        fontSize: 20,
        color: Colors.textPrimary
    }
})
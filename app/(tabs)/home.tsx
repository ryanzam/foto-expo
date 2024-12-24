import { FlatList, StyleSheet, Image, View, RefreshControl, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppText from '@/components/AppText'
import { Colors } from '@/constants/Colors'
import SearchInput from '@/components/SearchInput'
import TrendingPhotos from '@/components/TrendingPhotos'
import NoData from '@/components/NoData'
import { getAllPhotos, getTrendingPhotos } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import ImageCard from '@/components/ImageCard'

const Home = () => {

  const { data: photos, refetchData, loading } = useAppwrite(getAllPhotos)
  const { data: trendingPhotos } = useAppwrite(getTrendingPhotos)

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
          <View>
            <View>
              <AppText text='Welcome back, John' color={Colors.textSecondary} size={20} />
            </View>

            <SearchInput />

            <View style={styles.trendingView}>
              <AppText text='Trending Photos' size={25} color={Colors.textPrimary} />
              <TrendingPhotos photos={trendingPhotos} />
            </View>
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

export default Home

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: Colors.bgPrimary,
    height: "100%"
  },
  trendingView: {
    gap:10,
    marginBottom: 10
  }
})
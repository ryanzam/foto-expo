import { FlatList, StyleSheet, Image, View, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
import NoData from '@/components/NoData'
import { getUserPhotos, searchPhotos, signOut } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import ImageCard from '@/components/ImageCard'
import { router, useLocalSearchParams } from 'expo-router'
import { useGlobalContext } from '@/context/GlobalProvider'
import Icons from '@/constants/Icons'
import AppText from '@/components/AppText'

const Profile = () => {

  const { isLoggedIn, setIsLoggedIn, user, setUser, loading } = useGlobalContext()
  const { data: photos, refetchData } = useAppwrite(() => getUserPhotos(user.$id))

  const [refreshing, setRefreshing] = useState(false)

  const signout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/signin");
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await refetchData()
    setRefreshing(false)
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <FlatList
        data={user}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <ImageCard image={item} />
        )}

        ListHeaderComponent={() => (
          <View>
            <View style={styles.touableView}>
              <TouchableOpacity style={styles.logoutTouchable} onPress={signout}>
                <Image source={Icons.logout} style={styles.logoutIcon} resizeMode='contain' />
              </TouchableOpacity>

            </View>
            <View>
              <Image source={{ uri: user?.avatar }} />
              <AppText text={"John Doe"} size={20} color={Colors.textPrimary} />
              <AppText text={photos?.length > 0 ? `${photos?.length} Posts` : "0 Post"} size={18} color={Colors.textPrimary} />
              <AppText text={"1k Followers"} size={18} color={Colors.textPrimary} />
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

export default Profile

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: Colors.bgPrimary,
    height: "100%"
  },
  touableView: {
    display: "flex",
    alignItems: "flex-end"
  },
  logoutTouchable: {
    height: 30,
    width: 30,
    margin:5
  },
  logoutIcon: {
    height: 30,
    width: 30,
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
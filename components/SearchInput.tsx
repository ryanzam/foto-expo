import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import Icons from '@/constants/Icons'
import { router, usePathname } from 'expo-router'

type SearchInputProps = {
    text?: string
    refetchData?: () => void
}

const SearchInput = ({ text, refetchData }: SearchInputProps) => {

    const [query, setQuery] = useState(text || "")
    const pathname = usePathname()

    return (
        <View style={styles.mainView}>
            <Text style={styles.formText}>{text}</Text>

            <View style={styles.formView}>
                <TextInput style={styles.textInput}
                    value={query}
                    placeholder="Search for an image..."
                    onChangeText={(e: any) => setQuery(e)}
                />
                <TouchableOpacity
                    onPress={() => {
                        if (!query) return
                        if (pathname.startsWith("/search")) {
                            router.setParams({ query })
                        } else {
                            router.push(`/search/${query}`)
                        }
                    }}
                >
                    <Image source={Icons.search} style={styles.searchIcon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SearchInput

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
        backgroundColor: "#282345",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    textInput: {
        flex: 1,
        color: Colors.textSecondary,
        fontSize: 16,
        padding: 5
    },
    searchIcon: {
        height: 18,
        width: 18,
        paddingRight: 5,
        resizeMode: "contain"
    }
})
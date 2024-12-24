import { StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import Icons from '@/constants/Icons'

type SearchInputProps = {
    text?: string
    value?: any
    handleChange?: (e: any) => void
    placeholder?: string
}

const SearchInput = ({ text, value, handleChange, placeholder }: SearchInputProps) => {

    const [showPassword, setShowPassworld] = useState(false)

    return (
        <View style={styles.mainView}>
            <Text style={styles.formText}>{text}</Text>

            <View style={styles.formView}>
                <TextInput style={styles.textInput}
                    value={value}
                    placeholder="Search..."
                    onChange={handleChange}
                />
                <Image source={Icons.search} style={styles.searchIcon} />
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
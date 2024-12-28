import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppText from '@/components/AppText'
import { Colors } from '@/constants/Colors'
import FormField from '@/components/FormField'
import Icons from '@/constants/Icons'
import AppButton from '@/components/AppButton'
import * as DocumentPicker from "expo-document-picker";
import { router } from 'expo-router'
import { createPhoto } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

export type FormType = {
  title: string,
  photo: any,
  prompt: string,
  userId?: string
}
const create = () => {

  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState<FormType>({
    title: '',
    photo: null as any,
    prompt: '',
  })

  const { user } = useGlobalContext();


  const upload = async () => {
    const res = await DocumentPicker.getDocumentAsync({
      type: ['image/png', 'image/jpg']
    })

    if (!res.canceled) {
      setForm({ ...form, photo: res.assets[0] })
    }
  }

  console.log({ form })

  const submit = async () => {
    if (!form.photo || form.title === "" || !form.prompt) {
      return Alert.alert("Error", "Make sure all fields are filled");
    }
    setUploading(true)
    try {
      await createPhoto({ ...form, userId: user.$id })
      Alert.alert("Success", "Photo uploaded successfully");
      router.push("/home");
    } catch (error: any) {
      Alert.alert("Error", error)
    } finally {
      setForm({
        title: '',
        photo: null as any,
        prompt: ''
      })
      setUploading(false)
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView>
        <AppText text='Upload Photo' size={30} />

        <FormField text='Title'
          value={form.title}
          placeholder='Title for your photo'
          handleChange={(e: any) => setForm({ ...form, title: e.target.value })}
        />

        <View style={styles.textView}>
          <Text style={styles.textStyle}>Upload Photo</Text>

          <TouchableOpacity onPress={() => upload()}>
            {form.photo ?
              <Image source={{ uri: form.photo.uri }} style={styles.uploadedImagePreview} /> :
              (<View style={styles.touchableView}>
                <Image source={Icons.upload} style={styles.uploadImage} />

                <Text style={styles.uploadTextStyle}>Choose a file</Text>
              </View>)
            }
          </TouchableOpacity>
        </View>

        <FormField
          text='Prompt'
          value={form.prompt}
          placeholder='AI prompt'
          handleChange={(e: any) => setForm({ ...form, prompt: e.target.value })}
        />

        <AppButton text='Submit' handlePress={submit} isLoading />
      </ScrollView>
    </SafeAreaView>
  )
}

export default create

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: Colors.bgPrimary,
    height: "100%"
  },
  textView: {
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10
  },
  textStyle: {
    color: Colors.textPrimary,
    fontSize: 20,
    paddingTop: 20,
  },
  uploadTextStyle: {
    color: Colors.textPrimary,
    fontSize: 14,
    paddingTop: 20,
  },
  touchableView: {
    height: 150,
    backgroundColor: "#282345",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  uploadImage: {
    height: 50,
    width: 50
  },
  uploadedImagePreview: {
    height: 150,
    width: "auto",
    resizeMode: "contain"
  },
})
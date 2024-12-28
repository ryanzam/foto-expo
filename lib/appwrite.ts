import { FormType } from "@/app/(tabs)/create";
import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite"

export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    projectId: "6768da550037ca7eab1a",
    dbId: "6768dea0000d464021e8",
    usersCollectionId: "6768deca002ddfb96182",
    photosCollectionId: "6768df60001f9cb1d8c3",
    storageId: "6768e1c70038fd5b0841"
}

const client: Client = new Client()

export const account: Account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)   // Your Project ID

const avatars = new Avatars(client)

export const createUser = async (email: string, password: string, username: string) => {
    try {
        const newAccunt = await account.create(ID.unique(), email, password)

        if (!newAccunt) throw Error

        const avatarUrl = avatars.getInitials(username)

        const newUser = await database.createDocument(
            appwriteConfig.dbId,
            appwriteConfig.usersCollectionId,
            ID.unique(),
            {
                userId: newAccunt.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        await signIn(email, password)

        return newUser
    } catch (err) {
        throw err
    }
}

export const signIn = async (email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        console.log({ session })
        return session
    } catch (error) {
        throw error
    }
}

export const signOut = async () => {
    try {
        return await account.deleteSession("current")
    } catch (error: any) {
        throw error
    }
}

export const getAllPhotos = async () => {
    try {
        const photos = await database.listDocuments(appwriteConfig.dbId, appwriteConfig.photosCollectionId)
        return photos.documents
    } catch (error) {
        throw error
    }
}

export const getTrendingPhotos = async () => {
    try {
        const photos = await database.listDocuments(
            appwriteConfig.dbId,
            appwriteConfig.photosCollectionId,
            [Query.orderDesc("$createdAt"), Query.limit(7)])

        return photos.documents
    } catch (error) {
        throw error
    }
}

export const searchPhotos = async (query: any) => {
    try {
        const photos = await database.listDocuments(
            appwriteConfig.dbId,
            appwriteConfig.photosCollectionId,
            [Query.search("title", query)])

        return photos.documents
    } catch (error) {
        throw error
    }
}

export const getUserPhotos = async (userId: string) => {
    try {
        const photos = await database.listDocuments(
            appwriteConfig.dbId,
            appwriteConfig.photosCollectionId,
            [Query.equal("user", userId)])

        return photos.documents
    } catch (error) {
        throw error
    }
}

export const getAccount = async () => {
    try {
        return await account.get()
    } catch (error: any) {
        throw error
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await getAccount()
        if (!currentAccount) throw Error

        const currentUer = await database.listDocuments(
            appwriteConfig.dbId,
            appwriteConfig.usersCollectionId,
            [Query.equal('accountId', currentAccount.$id)])

        if (!currentUer) throw Error

        return currentUer.documents[0]

    } catch (error: any) {
        /* throw new Error(error) */
        console.log(error)
    }
}

export const getFilePreview = async (fileId: string) => {
    try {
        const fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId, 2000, 2000, undefined, 100)

        if (!fileUrl) throw new Error("Invalid file type");

        return fileUrl

    } catch (error: any) {
        throw new Error(error)
    }
}

export const uploadFile = async (file: any) => {
    if (!file) return
    const { mimeType, ...rest } = file
    const assets = { type: mimeType, ...rest }
    try {
        const uploadedFile = await storage.createFile(appwriteConfig.storageId, ID.unique(), assets)
        const fileUrl = await getFilePreview(uploadedFile.$id)
    } catch (error: any) {
        throw new Error(error)
    }
}


export const createPhoto = async (form: FormType) => {
    try {
        const photoUrl = await uploadFile(form.photo)
        const newPhoto = await database.createDocument(
            appwriteConfig.dbId,
            appwriteConfig.photosCollectionId,
            ID.unique(),
            {
                title: form.title,
                photo: photoUrl,
                prompt: form.prompt,
                user: form.userId
            }
        )
        return newPhoto

    } catch (error: any) {
        throw new Error(error)
    }
}

import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite"

export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    projectId: "6768da550037ca7eab1a",
    dbId: "6768dea0000d464021e8",
    usersCollectionId: "6768deca002ddfb96182",
    photosCollectionId: "6768df60001f9cb1d8c3",
    storageId: "6768e1c70038fd5b0841"
}

const client: Client = new Client()
export const account = new Account(client);
export const database = new Databases(client);


client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)   // Your Project ID

const avatars = new Avatars(client)

export const createUser = async (email: string, password: string, username: string) => {
    try {
        const newAccunt = await account.create(ID.unique(), email, password, username)

        if (!newAccunt) throw Error

        const avatarUrl = avatars.getInitials(username)

        await signin(email, password)

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
        return newUser
    } catch (err) {
        throw err
    }
}

export const signin = async (email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch (error) {
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

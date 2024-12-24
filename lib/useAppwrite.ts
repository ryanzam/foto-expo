import { useEffect, useState } from "react"
import { Models } from "react-native-appwrite"
import { getAllPhotos } from "./appwrite"
import { Alert } from "react-native"

const useAppwrite = (func: Function) => {
    const [data, setData] = useState<Models.Document[]>([])
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        try {
            const res = await func()
            setData(res)
        } catch (error: any) {
            Alert.alert("Error", error.message)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const refetchData = () => fetchData()

    return { data, refetchData, loading }
}

export default useAppwrite
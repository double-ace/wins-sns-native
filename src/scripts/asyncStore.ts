import AsyncStorage from '@react-native-async-storage/async-storage'

type StoreData = {
  key: string
  value: string
}

export const setData = async (key: string, value: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, value)
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

export const getData = async (key: string): Promise<string | null> => {
  let value: string | null = ''
  try {
    value = await AsyncStorage.getItem(key)
    if (!value) {
      console.log(`${key}が存在しません`)
    }

    return value
  } catch (e) {
    console.log(e)
    return value
  }
}

export const delData = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key, (error) =>
      console.log('removeItem: ', error)
    )
    return true
  } catch (e) {
    console.log('delData: ', e)
    return false
  }
}

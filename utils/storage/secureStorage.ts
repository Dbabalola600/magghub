
import AsyncStorage from '@react-native-async-storage/async-storage'
type SecureStorageKeys = "accessToken" | "name" | "image" | "password" | "email" | "age"




export class SecureStorage {
    private static instance: SecureStorage;


    private constructor() { }

    public static getInst(): SecureStorage {
        if (!SecureStorage.instance) {
            SecureStorage.instance = new SecureStorage();
        }

        return SecureStorage.instance;
    }


    async save(key: SecureStorageKeys, value: string): Promise<boolean> {
        try {
            await AsyncStorage.setItem(key, value);
            return true;
        } catch (e) {
            return false
        }
    }

    async getValueFor(key: SecureStorageKeys): Promise<string | null> {
        let result = await  AsyncStorage.getItem(key);
        return result
    }
    async clearAll(): Promise<boolean> {
        try {
            const keys: SecureStorageKeys[] = ["accessToken",];

            // Iterate over keys and remove them
            await Promise.all(keys.map(async (key) =>  await AsyncStorage.removeItem(key)));

            return true;
        } catch (e) {
            return false;
        }
    }
}
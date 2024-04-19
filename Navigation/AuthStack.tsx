import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Screens/allroutes";
import StartScreen from "../Screens/Start/StartScreen";
import ProfileScreen from "../Screens/Profile/ProfileScreen";
import { useEffect, useState } from "react";
import { SecureStorage } from "../utils/storage/secureStorage";
import { useNavigation } from "@react-navigation/native";



const Stack = createNativeStackNavigator<RootStackParamList>();

type ScreenProps = NativeStackScreenProps<RootStackParamList>

const AuthStack = () => {
    const [isUser, setUser] = useState(false)
    const navigation = useNavigation<ScreenProps | any>()

    useEffect(() => {
        const checker = async () => {
            await SecureStorage.getInst().getValueFor("accessToken").then((res) => {
                // console.log(res)
                if (res === null || res === "") {
                    setUser(false)
                } else {
                    navigation.navigate("Profile")
                    setUser(true)
                }
            })
        }

       const interval = setInterval(() => {
            checker();
        }, 1000); // Runs every second



        // console.log(isUser)
        return () => clearInterval(interval);
    
    }, [])

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerTitle: "",
                headerStyle: {
                    backgroundColor: "transparent"
                },
                headerShadowVisible: false
            }}
            initialRouteName={isUser ? "Profile" : 'Start'}
        >
            <Stack.Screen
                name="Start"
                component={StartScreen}
            />
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
            />



        </Stack.Navigator>
    )
}

export default AuthStack

import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import MainLayout from "../../components/layout/Layout"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../allroutes"
import { useEffect, useState } from "react"
import { SecureStorage } from "../../utils/storage/secureStorage"
// import { SecureStorage } from "../../utils/storage/secureStorage"


type ScreenProps = NativeStackScreenProps<RootStackParamList, "Profile">

const ProfileScreen = ({ navigation }: ScreenProps) => {
    const LogOut = async () => {
        console.log("here")
        await SecureStorage.getInst().clearAll().then(() => {
            navigation.navigate("Start")
        })
    }

    const [isUser, setUser] = useState<any>()

    useEffect(() => {

        const getter = async () => {
            const age = await SecureStorage.getInst().getValueFor("age")
            const name = await SecureStorage.getInst().getValueFor("name")
            const email = await SecureStorage.getInst().getValueFor("email")
            const image = await SecureStorage.getInst().getValueFor("image")

            const data = {
                age: age,
                name: name,
                email: email,
                image: image
            }

            setUser(data)
            // console.log(age)
        }
        getter()
    }, [])


    return (
        <MainLayout backNavigation backArrowAction={LogOut}>
            <ScrollView style={{ paddingTop: 50 }}
              showsVerticalScrollIndicator={false} 
       
            >

                <View
                    style={{
                        backgroundColor: "black",
                        width: 200,
                        height: 200,
                        alignSelf: "center",
                        borderRadius: 200,
                        borderWidth: 5,
                        justifyContent: "center",
                        borderColor: "black"

                    }}
                >

                    <Image
                        source={{ uri: isUser?.image }}
                        style={{
                            width: 190,
                            height: 190,
                            borderRadius: 150,
                            alignSelf: "center",
                            justifyContent: "center"
                        }}

                    />

                </View>

                <View style={{
                    marginHorizontal: 20,
                    gap: 20
                }}>

                    <View>
                        <Text style={style.headerStyle}>
                            Name
                        </Text>
                        <View style={style.boxStyle}>

                            <Text style={style.innerTextStyle}>
                                {isUser?.name}
                            </Text>
                        </View>
                    </View>


                    <View>
                        <Text style={style.headerStyle}>
                            Email
                        </Text>
                        <View style={style.boxStyle}>

                            <Text style={style.innerTextStyle}>
                                {isUser?.email}
                            </Text>
                        </View>
                    </View>

                    <View>
                        <Text style={style.headerStyle}>
                            Age
                        </Text>
                        <View style={style.boxStyle}>

                            <Text style={style.innerTextStyle}>
                                {isUser?.age}
                            </Text>
                        </View>
                    </View>
                </View>

            </ScrollView>

        </MainLayout>
    )
}


export default ProfileScreen

const style = StyleSheet.create({
    boxStyle: {
        borderWidth: 3,
        padding: 10,
        borderRadius: 15,
        backgroundColor: "gray"
    },
    headerStyle: {
        fontWeight: "400",
        fontSize: 20,
        color: "black"
    },
    innerTextStyle: {
        color: "white",
        fontWeight: "400",
        fontSize: 20,

    }
})
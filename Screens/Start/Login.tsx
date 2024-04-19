import { useForm } from "react-hook-form"
import { StyleSheet, Text, View } from "react-native"
import AppTextField from "../../components/Input/AppTextField"
import AppButton from "../../components/Display/AppButton"
import { SecureStorage } from "../../utils/storage/secureStorage"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../allroutes"
import { useNavigation } from "@react-navigation/native"


type ScreenProps = NativeStackScreenProps<RootStackParamList>

const LoginPage = () => {
    const navigation = useNavigation<ScreenProps| any>()
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm()


    const onSubmit = handleSubmit(async (data) => {
        const isPassword = await SecureStorage.getInst().getValueFor("password").then(async (res) => {
            if (data.password !== res) {
                console.log("false")
            } else {
                const isMail = await SecureStorage.getInst().getValueFor("email")
                const isName = await SecureStorage.getInst().getValueFor("name")

                if (data.name === isName || data.name === isMail) {
                    // true
                    console.log("true")
                    await   SecureStorage.getInst().save("accessToken", "39uvnowrunoiwijef9ionc").then(()=>{
                        navigation.navigate("Profile")
                    })

                } else {
                    console.log("false")
                }
            }
        })


    })
    return (
        <View>
            <Text style={style.headerStyle}>
                Login
            </Text>

            <View style={{
                marginHorizontal: 20
            }}>


                <AppTextField
                    validationName="name"
                    title="Email"
                    control={control}
                />


                <AppTextField
                    validationName="password"
                    title="Password"
                    isPassword
                    control={control}
                />


                <View style={{ marginTop: 10 }}>
                    <AppButton
                        text="Continue"
                        onPress={onSubmit}
                    />
                </View>

            </View>


        </View>
    )
}

export default LoginPage


const style = StyleSheet.create({
    headerStyle: {
        fontWeight: "500",
        fontSize: 25,
        textAlign: "center",
        marginVertical: 10
    }
})
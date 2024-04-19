import { useForm } from "react-hook-form"
import { Alert, StyleSheet, Text, View } from "react-native"
import AppTextField from "../../components/Input/AppTextField"
import AppButton from "../../components/Display/AppButton"
import { SecureStorage } from "../../utils/storage/secureStorage"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../allroutes"
import { useNavigation } from "@react-navigation/native"
import { loginwithEmailFormType, loginwithEmailSchema } from "../../utils/validation/LoginVal"
import { zodResolver } from "@hookform/resolvers/zod"


type ScreenProps = NativeStackScreenProps<RootStackParamList>

const LoginPage = () => {
    const navigation = useNavigation<ScreenProps| any>()
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm<loginwithEmailFormType>({

        resolver:  zodResolver(loginwithEmailSchema)
    })


    const onSubmit = handleSubmit(async (data) => {
        const isPassword = await SecureStorage.getInst().getValueFor("password").then(async (res) => {
            if (data.password !== res) {
                console.log("false")
                Alert.alert("Incorrect Details")
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
                marginHorizontal: 20, 
                gap: 20
            }}>


                <AppTextField
                    validationName="name"
                    title="Email"
                    control={control}
                    placeholder="email/name"
                    errorMessage={errors.name?.message}

                />


                <AppTextField
                    validationName="password"
                    title="Password"
                    placeholder="********"
                    isPassword
                    control={control}
                    errorMessage={errors.password?.message}
                />


                <View style={{ marginTop: 10 }}>
                    <AppButton
                        text="Continue"
                        onPress={onSubmit}
                        disabled={
                            watch(["name", "password"]).includes("")
                        }
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
        marginVertical: 10,
        color: "gray"
    }
})
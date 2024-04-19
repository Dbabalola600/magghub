import { Image, StyleSheet, Text, View } from "react-native"
import AppTextField from "../../components/Input/AppTextField"
import { useForm } from "react-hook-form"
import AppButton from "../../components/Display/AppButton"
import { useState } from "react"

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import { SecureStorage } from "../../utils/storage/secureStorage"
import { useNavigation } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../allroutes"
import { SecureStorage } from "../../utils/storage/secureStorage"
// import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';


type ScreenProps = NativeStackScreenProps<RootStackParamList>

const SignUpPage = () => {
    const navigation = useNavigation<ScreenProps | any>()

    const [selectedImage, setSelectedImage] = useState('');
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm()



    const handleImagePick = () => {
        // Launch image picker

        console.log("here")
        launchImageLibrary(
            {
                mediaType: 'photo',
                quality: 0.5,
            },
            response => {
                if (response.didCancel) {
                    return;
                } else {
                    // Handle response here
                    // @ts-ignore
                    setSelectedImage(response.assets[0]);

                    // @ts-ignore
                    //   uploadDoc(response.assets[0].uri);
                }
            },
        );
    };


    const navNext = () => {
        navigation.navigate("Profile");

    }



    const onSubmit = handleSubmit(async (data) => {
        console.log(data)

        await SecureStorage.getInst().save("age", data.age),
            await SecureStorage.getInst().save("accessToken", "39uvnowrunoiwijef9ionc"),
            await SecureStorage.getInst().save("email", data.email),
            await SecureStorage.getInst().save("image", selectedImage.uri),
            await SecureStorage.getInst().save("name", data.name),
            await SecureStorage.getInst().save("password", data.password)

        navNext()

        //    await


        // const age = await SecureStorage.getInst().getValueFor("age")

        // console.log("is", age)
    })

    return (
        <View>
            <Text style={style.headerStyle}>
                Sign Up
            </Text>


            <View style={{
                marginHorizontal: 20
            }}>
                <AppTextField
                    validationName="name"
                    title="Name"
                    control={control}
                />


                <AppTextField
                    validationName="email"
                    title="Email"
                    control={control}
                />

                <AppTextField
                    validationName="age"
                    title="Age"
                    keyboardType="number-pad"
                    control={control}
                />

                <AppTextField
                    validationName="password"
                    title="Password"
                    isPassword
                    control={control}
                />

                <AppButton
                    text="Add Photo"
                    onPress={handleImagePick}
                />

                {selectedImage !== '' &&

                    <View
                        style={{

                        }}
                    >
                        <Image
                            source={{ uri: selectedImage?.uri }}
                            style={{
                                width: 300,
                                height: 200,
                                marginBottom: 20,
                                borderWidth: 1,
                                marginTop: 10,
                                alignSelf: "center"
                            }}
                        />

                    </View>
                }


                <View style={{ marginTop: 10 }}>
                    <AppButton
                        text="Continue"
                        onPress={onSubmit}
                        disabled={
                            watch(["password", "name", "email", "age"]).includes("") ||
                            selectedImage === ''
                        }
                    />
                </View>


            </View>






        </View>
    )
}

export default SignUpPage



const style = StyleSheet.create({
    headerStyle: {
        fontWeight: "500",
        fontSize: 25,
        textAlign: "center",
        marginVertical: 10
    }
})
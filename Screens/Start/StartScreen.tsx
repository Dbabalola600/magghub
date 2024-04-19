import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import MainLayout from "../../components/layout/Layout"
import React, { useState } from "react"
import LoginPage from "./Login"
import SignUpPage from "./SignUp"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../allroutes"
import AppButton from "../../components/Display/AppButton"






type ScreenProps = NativeStackScreenProps<RootStackParamList, "Start">

const StartScreen = ({ navigation }: ScreenProps) => {

    const [isOption, setOption] = useState("signup")
    return (
        <MainLayout >

            <ScrollView
                style={{ flex: 1, paddingTop: 30 , backgroundColor:"white"}}
                showsVerticalScrollIndicator={false} 
       
                >


                <Text style={style.headerStyle} >
                    Welcome
                </Text>




                {isOption === "login" &&
                    <LoginPage />
                }

                {isOption === "signup" &&
                    <SignUpPage />
                }



                <View style={{
                    paddingTop: 30,
                    paddingBottom: 50
                }}>
                    {isOption === "signup" ?





                        <View style={style.optionsStylt}>
                            <Text style={style.textOptionStyle}>
                                Already Have an Account?



                            </Text>

                            <TouchableOpacity
                                onPress={() => setOption("login")}
                            >
                                <Text style={style.textOptionStyle}>
                                    {" "} Login
                                </Text>
                            </TouchableOpacity>

                        </View>
                        :



                        <View style={style.optionsStylt}>
                            <Text style={style.textOptionStyle}>
                                Don't Have an Account?



                            </Text>

                            <TouchableOpacity
                                onPress={() => setOption("signup")}
                            >
                                <Text style={style.textOptionStyle}>
                                    {" "}  Signup
                                </Text>
                            </TouchableOpacity>

                        </View>



                    }



                </View>
            </ScrollView>
        </MainLayout>
    )
}


export default StartScreen


const style = StyleSheet.create({
    headerStyle: {
        fontWeight: "500",
        fontSize: 25,
        textAlign: "center", 
        color: "black"
    },
    optionsStylt: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    textOptionStyle: {
        fontSize: 15,
        textAlign: "center",
        color: "black"
    }
})
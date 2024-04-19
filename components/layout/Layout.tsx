import React from "react";
import { Pressable, ScrollView, TouchableWithoutFeedback, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaProvider } from "react-native-safe-area-context";

type LayoutProp = {
    children: React.ReactNode;
    backNavigation?: false | boolean;
    backArrowAction?: () => void;
};




const MainLayout = ({ children, backNavigation = false, backArrowAction }: LayoutProp) => {
    const navigation = useNavigation();

    const handleButtonClick = () => {

        if (backArrowAction) {
            backArrowAction();
            return false;
        }
        navigation.goBack();
        return true;

    }



    return (

        <SafeAreaProvider>

            {/* <TouchableWithoutFeedback> */}
                <View
                   style={{ flex: 1, flexGrow: 1, backgroundColor: "white" }}
                    // bounces={false}
               >
                    <View style={{ paddingTop: 50 }}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            paddingHorizontal: 15
                        }}>
                            {backNavigation && (

                                <Pressable onPress={handleButtonClick} style={{
                                    padding: 2
                                }}>
                                    <Ionicons
                                        name="chevron-back"
                                        size={25}
                                    />
                                </Pressable>
                            )}

                        </View>
                    </View>


                    <View
                        style={{
                            flex: 1,
                            justifyContent: "flex-start",
                            paddingBottom: 20,
                            paddingHorizontal: 5
                        }}
                    >
                        {children}
                    </View>


                </View>

            {/* </TouchableWithoutFeedback> */}
        </SafeAreaProvider>



    )


}


export default MainLayout;
import {
    KeyboardTypeOptions,
    NativeSyntheticEvent,
    Pressable,
    TextInput,
    TextInputFocusEventData,
    View,
    Platform,
    Text,
    StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState, useRef } from "react";


import { Control, Controller, Field } from "react-hook-form";


import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../utils/themes";



type AppTextFieldProps = {
    validationName?: string;
    onChange?: (text: string) => void;
    value?: string;
    pattern?: RegExp;
    control?: any;
    placeholder?: string;
    autoFocus?: boolean;
    errorMessage?: string;
    keyboardType?: KeyboardTypeOptions;
    containerStyle?: any;
    title?: string;
    hint?: string;
    leading?: React.ReactNode;
    isPassword?: boolean | undefined;
    onBlur?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
    ref?: React.LegacyRef<TextInput> | undefined;
};




const AppTextField = (props: AppTextFieldProps) => {
    const [showPassword, setShowPassword] = useState(
        props.isPassword === undefined ? false : props.isPassword,
    );

    if (props.control && props.validationName) {

        return (
            <View>
                <Controller
                    control={props.control}
                    rules={{
                        required: true,
                    }}
                    name={props.validationName}

                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextContainer containerStyle={props.containerStyle}>


                            <View style={{
                                ...styles.InputContainerComponent,
                                borderWidth: 2,
                                borderColor: "black"
                            }}
                            >

                                <Text
                                    style={{
                                        backgroundColor: "white",
                                        marginHorizontal: 10,
                                        paddingVertical: 2,
                                        position: "absolute",
                                        top: -11,
                                        fontSize: 15
                                    }}
                                // className="bg-secondary max-w-fit  mx-3 px-1 absolute top-[-9]"
                                >
                                    {props?.title}
                                </Text>
                                <MyTextInput
                                    hideText={showPassword}

                                    value={value}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    ref={props.ref}
                                    autoFocus={props.autoFocus}
                                    keyboardType={props.keyboardType}
                                    placeholder={props.placeholder}


                                />
                                {props.isPassword && (
                                    <PasswordEye
                                        setShowPassword={setShowPassword}
                                        showPassword={showPassword}

                                    />
                                )}

                            </View>

                            <ErrorMessage>{props.errorMessage}</ErrorMessage>
                        </TextContainer>
                    )}



                />

            </View>
        )
    }


}






// Input Text within app textfield
const MyTextInput = (textInputProps: {
    onChangeText: AppTextFieldProps["onChange"];
    value: AppTextFieldProps["value"];
    hideText: boolean;
    onBlur?: AppTextFieldProps["onBlur"];
    ref: React.LegacyRef<TextInput> | undefined;
    autoFocus: AppTextFieldProps["autoFocus"];
    keyboardType: AppTextFieldProps["keyboardType"];
    placeholder: AppTextFieldProps["placeholder"];
}) => (
    <TextInput
        style={styles.InputContainer}
        ref={textInputProps.ref}
        autoFocus={textInputProps.autoFocus}
        keyboardType={textInputProps.keyboardType}
        placeholder={textInputProps.placeholder}
        onChangeText={textInputProps.onChangeText}
        defaultValue={textInputProps.value}
        onBlur={textInputProps.onBlur || undefined}
        secureTextEntry={textInputProps.hideText}
        clearTextOnFocus={false}

    />
);


const TextContainer = ({ children, containerStyle }: { children: React.ReactNode, containerStyle: AppTextFieldProps["containerStyle"] }) => (
    <View
        style={containerStyle}
    >
        {children}
    </View>
)


// error message
const ErrorMessage = (props: { children: React.ReactNode }) => (
    <Text
        style={{
            color: COLORS.primaryRedHex,
            marginTop: 1,
            fontSize: 15
        }}
    // className={`text-xs text-red-700 mt-1`}
    >
        {props?.children}
    </Text>
);




//  password eye if it is a password
const PasswordEye = (props: {
    showPassword: boolean;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
    <Pressable
        onPress={() => {
            props.setShowPassword((prev) => !prev);
        }}
    >
        {props.showPassword ? (
            <Ionicons name="eye-outline" size={24} color="black" style={styles.IconStyle} />
        ) : (
            <Ionicons name="eye-off-outline" size={24} color="black" style={styles.IconStyle} />
        )}
    </Pressable>

)


const styles = StyleSheet.create({
    InputContainerComponent: {
        flexDirection: 'row',
        // margin: SPACING.space_30,
        borderRadius: BORDERRADIUS.radius_20,
        // backgroundColor: COLORS.primaryLightGreyHex,
        borderColor: COLORS.primaryBlackRGBA,
        alignItems: 'center',
    },
    InputContainer: {
        flex: 1,
        height: SPACING.space_20 * 3,
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_20,
        color: COLORS.primaryBlackRGBA,
        paddingHorizontal: 10
    },
    IconStyle: {
        paddingRight: SPACING.space_15
    }
})



export default AppTextField;
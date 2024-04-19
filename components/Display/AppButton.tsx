
import React from "react";
import { GestureResponderEvent, Pressable, Text } from "react-native";


type AppButtonProp = {
    text?: React.ReactNode;
    buttonStyle?: any;
    textStyle?: any;
    disabled?: boolean;
    isCustom?: boolean;
    onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  };
  






const AppButton = (props: AppButtonProp) => {
    return (
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor:
              props.disabled != true
                ? pressed
                  ? "rgba(0, 0, 0, 0.75)"
                  : "#000000"
                : "#D0D5DD",
            width: "100%",
            paddingVertical: 20,
            borderRadius: 30,
          },
          props.buttonStyle,
        ]}
        onPress={props.disabled != true ? props.onPress : () => {}}
      >
        <Text
        style={{
          ...props.textStyle,
          textAlign:"center",
          color:"white",
          fontWeight: "600",
          fontSize: 20
        }}
        // className={`text-xl mx-auto text-white font-bold ${props.textStyle}`}
        >
          {props.text}
        </Text>
      </Pressable>
    );
  };
  
  export default AppButton;
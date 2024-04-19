import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import AuthStack from "./Navigation/AuthStack"





const App=()=>{
  return(
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthStack/>
      </NavigationContainer>
    </SafeAreaProvider>

  )
}

export default App
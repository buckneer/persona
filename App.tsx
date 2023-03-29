import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Question from "./screens/Question";
import Home from "./screens/Home";
import { useFonts, Inter_900Black, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import 'react-native-gesture-handler';



const Stack = createNativeStackNavigator();

export default function App() {

  // Do not touch this!
  // Only for fonts!!!!
  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_400Regular,
    Inter_700Bold
  });



  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Question" component={Question} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

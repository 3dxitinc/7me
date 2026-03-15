import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/Home'
import CameraScreen from './screens/CameraScreen'
import TwinResults from './screens/TwinResults'
import CelebrityResults from './screens/CelebrityResults'
import TwinMap from './screens/TwinMap'
import TransformStudio from './screens/TransformStudio'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="TwinResults" component={TwinResults} />
        <Stack.Screen name="CelebrityResults" component={CelebrityResults} />
        <Stack.Screen name="TwinMap" component={TwinMap} />
        <Stack.Screen name="TransformStudio" component={TransformStudio} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

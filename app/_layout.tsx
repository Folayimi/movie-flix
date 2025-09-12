import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function RootLayout() {

  return ( 
      <Stack>        
        <Stack.Screen name="(tabs)" options={{headerShown:false}} />
        <Stack.Screen name="movie/[id]" options={{headerShown:false}} />
      </Stack>
  );
}

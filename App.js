import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import {StatusBar, StyleSheet,View, Text, SafeAreaView,Platform } from 'react-native';
import HomePage from './src/pages/homepage';
import {theme} from './src/theme'
import { ThemeProvider } from 'styled-components/native';
// Importing Fonts

import { useFonts as useOswald, Oswald_400Regular } from '@expo-google-fonts/oswald';
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato';

export default function App() {

  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  })

  const [latoLoaded] = useLato({
    Lato_400Regular,
  })

  if(!oswaldLoaded || !latoLoaded){
    return null;
  }


  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={{flex:1, marginTop: StatusBar.currentHeight}}>
      <View style={styles.container}>
      <HomePage />
      <StatusBar style="auto" />
    </View>
      </SafeAreaView>
    </ThemeProvider>
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

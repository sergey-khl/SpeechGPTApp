/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  PermissionsAndroid,
  TouchableHighlight,
  Image,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import styles from './appStyles'

import Voice from 'react-native-voice';

import {
  Button
} from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome';


type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  // https://github.com/react-native-voice/voice/issues/83
  const iosLocales = {
    'ar-EG': 'ar_EG', // arabic
    'de-DE': 'de_DE', // german
    'en-US': 'en_US', // english
    'es-CL': 'es_CL', // spanish
    'fr-FR': 'fr_FR', // french
    'hi': 'hi_IN', // hindi
    'it-IT': 'it_IT', // italian
    'ja': 'ja_JP', // japanese
    'ko': 'ko_KR', // korean
    'pt-BR': 'pt_BR', // portuguese
    'ru': 'ru_RU', // russian
    'zh-CN': 'zh_Hans_SG', // mandarin
  };
  
  const androidLocales = {
    'ar-EG': 'ar-EG',
    'de-DE': 'de-DE',
    'en-US': 'en_US',
    'es-CL': 'es-CL',
    'fr-FR': 'fr-FR',
    'hi': 'hi-IN',
    'it-IT': 'it-IT',
    'ja': 'ja-JP',
    'ko': 'ko-KR',
    'pt-BR': 'pt-BR',
    'ru': 'ru-RU',
    'zh-CN': 'cmn-Hans-CN',
  };
  // https://aboutreact.com/speech-to-text-conversion-in-react-native-voice-recognition/
  const [error, setError] = useState('');
  const [end, setEnd] = useState(false);
  const [started, setStarted] = useState(false);
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    //Setting callbacks for the process status
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;

    return () => {
      //destroy the process after switching the screen
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e: any) => {
    //Invoked when .start() is called without error
    console.log('onSpeechStart: ', e);
    setStarted(true);
  };
  
  const onSpeechEnd = (e: any) => {
    //Invoked when SpeechRecognizer stops recognition
    console.log('onSpeechEnd: ', e);
    startRecognizing();
  };
  
  const onSpeechError = (e: any) => {
    //Invoked when an error occurs.
    console.log('onSpeechError: ', e);
    setError(JSON.stringify(e.error));
    startRecognizing();
  };
  
  const onSpeechResults = (e: any) => {
    //Invoked when SpeechRecognizer is finished recognizing
    console.log('onSpeechResults: ', e.value[0]);
    setResults(e.value);
    setUserInput(userInput + e.value[0])
  };
  
  const onSpeechPartialResults = (e: any) => {
    //Invoked when any results are computed
    console.log('onSpeechPartialResults: ', e.value[0]);
    
    setPartialResults(e.value);
    
  };
  
  const startRecognizing = async () => {
    //Starts listening for speech for a specific locale
    try {
      await Voice.start('en-US');
      setError('');
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };
  
  
  const destroyRecognizer = async () => {
    //Destroys the current SpeechRecognizer instance
    try {
      await Voice.destroy();
      setError('');
      setResults([]);
      setPartialResults([]);
      //setUserInput('');
      setEnd(true);
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <View style={styles.container}>
        <Text style={styles.textStyle}>
          hello
        </Text>
        <Button
          buttonStyle={styles.buttonStyle}
          icon={
            <Icon
              name="microphone"
              size={50}
              color="white"
            />
          }
          onPress={startRecognizing}
          title=""
        />

        <Button
          buttonStyle={styles.buttonStyle}
          icon={
            <Icon
              name="close"
              size={50}
              color="red"
            />
          }
          onPress={destroyRecognizer}
          title=""
        />
        <Text style={styles.textStyle}>
          output
        </Text>
        <Text style={styles.textStyle}>
          {userInput}
        </Text>

      </View>
    </SafeAreaView>
  );
}


export default App;

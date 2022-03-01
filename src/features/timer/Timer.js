import React from 'react';

import { View, Text, StyleSheet, StatusBar, Vibration , Platform } from 'react-native';
import { fontSizes, spacing } from '../../utils/sizes';
import { ProgressBar } from 'react-native-paper';

import { RoundedButton } from './../../components/RoundedButton';
import { CountDown } from './../../components/CountDown';
import { colors } from '../../utils/colors';
import { Timing } from './Timing';
export const Timer = ({ focusSubject ,addFocusSubject,addFocusHistorySubjectToState}) => {
  const [isStarted, setIsStarted] = React.useState(false);
  const clearSubject =()=>{
    addFocusHistorySubjectToState(focusSubject , "CANCELLED")
    addFocusSubject("")
  }
  const [minutes, setMinutes] = React.useState(0.1);
  const [progress, setProgress] = React.useState(1);
  const changeTime = (time) => setMinutes(time);
  const onProgress = (progress) => {
    setProgress(progress);
  };
  const vibrate =() => {
    if(Platform.OS ==="ios"){
      const interval = setInterval(() => Vibration.vibrate() , 1000)
      setTimeout(() => clearInterval(interval) ,5000)
    }
    else{
      Vibration.vibrate(5000)
    }
  }
  const onEnd= () =>{
    setMinutes(0.1)
    setProgress(1)
    setIsStarted(false)
    addFocusSubject("")
    vibrate()

  }
  return (
    <View style={styles.container}>
      <View style={{ paddingVertical: spacing.md }}>
        <Text style={styles.title}>Focusing 🎯</Text>
        <CountDown
          isPaused={!isStarted}
          minutes={minutes}
          onProgress={onProgress}
          onEnd={onEnd}
          focusSubject={focusSubject}
          addFocusHistorySubjectToState={addFocusHistorySubjectToState}
        />
        <Text style={styles.task}> {focusSubject} </Text>
      </View>
      <View style={{ marginVertical: spacing.md }}>
        <ProgressBar
          color={colors.white}
          progress={progress}
          onProgress={onProgress}
          style={{ height: 10 }}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View>
        {!isStarted ? (
          <RoundedButton
            onPress={() => setIsStarted(true)}
            size={120}
            title="Start"
            style={styles.roundedButton}
          />
        ) : (
          <RoundedButton
            onPress={() => setIsStarted(false)}
            title="Stop"
            size={120}
            style={styles.roundedButton}
          />
        )}
      </View>
      <View>
      <RoundedButton title="❌" 
            size={35}
            onPress={clearSubject}
      />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    justifyContent: 'center',
    flexDirection : "row",
    alignItems: 'center',
    marginBottom :spacing.lg
  },
  container: {
    backgroundColor: colors.main,
    flex: 1,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: fontSizes.md,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.white,
  },
  task: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.white,
    fontSize: fontSizes.lg,
    fontFamily: 'Helvetica',
  },
  roundedButton: {
    margin: 'auto',
  },
});

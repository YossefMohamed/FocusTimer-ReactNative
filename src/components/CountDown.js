import React from 'react';
import { View, Text, StyleSheet , Alert } from 'react-native';
import { colors } from '../utils/colors';
import { fontSizes, spacing } from '../utils/sizes';
const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);
import { Audio } from 'expo-av';

export const CountDown = ({
  minutes = 20,
  isPaused = true,
  onProgress,
  onEnd,
  focusSubject,
  addFocusHistorySubjectToState,
}) => {
  
  const [millis, setMillis] = React.useState(minutesToMillis(minutes));
  const [sound, setSound] = React.useState(null);
  const minute = Math.floor(millis / 1000 / 60);
  const second = Math.floor(millis / 1000) % 60;
  React.useEffect(() => {
    if (isPaused)
      return () => {
        if (countInterval) clearInterval(countInterval);
      };
    const countInterval = setInterval(countDown, 1000);
    return () => {
      clearInterval(countInterval);
    };
  }, [isPaused]);

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('./../../assets/end.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }


  React.useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);
  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        addFocusHistorySubjectToState(focusSubject, 'COMPLETED');
        onEnd();
        playSound()
        return time;
      }
      const timeLeft = time - 1000;
      onProgress(timeLeft / minutesToMillis(minutes));
      return timeLeft;
    });
  };

  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(second)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxxl,
    color: colors.white,
    fontWeight: 'bold',
    marginVertical: spacing.md,
    borderColor: colors.white,
    borderWidth: 2,
    borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

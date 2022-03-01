import React from 'react';
import { Text, View, StyleSheet, AsyncStorage } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { Timer } from './src/features/timer/Timer';
import { spacing } from './src/utils/sizes';
import { colors } from './src/utils/colors';
export default App = () => {
  const [focusSubject, addFocusSubject] = React.useState('');
  const [history, setHistory] = React.useState([]);
  React.useEffect(() => {
    console.log(history);
  }, [history]);
  const addFocusHistorySubjectToState = (focusSubject, status) => {
    setHistory([
      ...history,
      { key: String(history.length + 1), subject: focusSubject, status },
    ]);
  };

  
  const saveFocusHistory = async () => {
    try {
      AsyncStorage.setItem('focusHistory', JSON.stringify(history));
    } catch (e) {
      console.log(e);
    }
  };
  const loadFocusHistory = async () => {
    const historyStorage = await AsyncStorage.getItem('focusHistory');
    if (historyStorage && JSON.parse(historyStorage).length) {
      setHistory(JSON.parse(historyStorage));
    }
  };
  React.useEffect(() => {
    loadFocusHistory;
  }, []);
  React.useEffect(() => {
    saveFocusHistory();
  }, [history]);
  return (
    <>
      {!focusSubject ? (
        <View style={styles.container}>
          <Focus
            addFocusSubject={addFocusSubject}
            history={history}
            setHistory={setHistory}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <Timer
            focusSubject={focusSubject}
            addFocusSubject={addFocusSubject}
            addFocusHistorySubjectToState={addFocusHistorySubjectToState}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.sm,
    backgroundColor: colors.main,
  },
});

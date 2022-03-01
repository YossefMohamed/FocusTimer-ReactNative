import React from 'react';
import { Text, View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import { FocusHistory } from './FocusHistory';
export const Focus = ({ addFocusSubject, history, setHistory }) => {
  console.log(history);
  const [subject, setSubject] = React.useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Let's Focus✨</Text>
      <View style={styles.formContainer}>
        <TextInput
          value={subject}
          onChangeText={(text) => setSubject(text)}
          style={styles.textInput}
          placeholder="Enter A Task..."
        />
        <View style={styles.addButtonView}>
          <RoundedButton
            style={styles.addButton}
            title="➕"
            size={50}
            onPress={() => {
              if (!subject) {
                Alert.alert('Error', 'Please Add A Text!', [
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
              } else addFocusSubject(subject);
            }}
          />
        </View>
      </View>

      {history.length ? (
        <FocusHistory history={history} onClear={() => setHistory([])} />
      ) : (
        <Text style={styles.dangerHeader}>You Have Not Focused Yet 😥</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingVertical: spacing.sm,
    flex: 1,
  },
  formContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  addButton: {
    // backgroundColor : "#fff" ,
    // color :
  },
  dangerHeader: {
    fontSize: fontSizes.md + 5,
    fontWeight: 'bold',
    color: colors.white,
    marginVertical: 50,
  },
  textInput: {
    flex: 1,
  },
  header: {
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
    marginVertical: 15,
    color: colors.white,
  },
  addButtonView: {
    paddingLeft: fontSizes.sm,
    justifyContent: 'center',
  },
});

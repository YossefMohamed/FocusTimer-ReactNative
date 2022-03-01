import React from 'react';

import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';

import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';

import { RoundedButton } from '../../components/RoundedButton';

export const FocusHistory = ({ history, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  const HistoryItem = ({ item }) => {
    return <Text style={item.status === "CANCELLED" ? styles.dangerHeader : styles.successHeader}>{item.subject} {item.status === "CANCELLED" ? "😣" : "🤩"}</Text>;
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.header}>Things We Have Finished ✌</Text>
        {history.length && (
          <FlatList
            style={styles.list}
            contentContainerStyle={styles.contentList}
            data={history}
            renderItem={HistoryItem}
          />
        )}

        <RoundedButton title="Clear" style={{margin : "auto"}} size={80} onPress={clearHistory}/>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1,},
  list: {
    flex: 1,

  },
  contentList: {
    flex: 1,
    alignItems: 'center',
  },
  dangerHeader: {
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
    color: colors.danger,
    marginVertical: 25,
  },header: {
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
    color: colors.white,
    marginTop: 25,
  },
  successHeader: {
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
    color: colors.success,
    marginVertical: 25,
  },
});

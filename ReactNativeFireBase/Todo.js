import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import firestore from '@react-native-firebase/firestore';

const Todo = ({title}) => {
  async function toggleComplete() {
    await firestore().collection('todos').doc(id).update({
      complete: !complete,
    });
  }
  return (
    <View style={styles.cardContainer}>
      <Text>{title}</Text>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  cardContainer: {
    height: 50,
    width: '90%',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

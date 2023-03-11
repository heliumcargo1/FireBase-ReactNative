import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  onPress,
  ActivityIndicator,
  FlatList,
  Alert,
  ScrollView,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import Todo from './Todo';
// import {Appbar, TextInput, Button} from 'react-native-paper';

const App = () => {
  const ref = firestore().collection('todos');
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const {title, complete} = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });

      setTodos(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  const addTodo = async () => {
    if (todo == '') {
      Alert.alert('todo cannot be empty');
      return;
    } else {
      await ref.add({
        title: todo,
        complete: false,
      });
      console.log('todo stored');
      setTodo('');
    }
  };
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text>Todos</Text>
      </View>
      {/* {loading <ActivityIndicator /> :} */}

      <View style={styles.enterContainer}>
        <Text>+</Text>
        <TextInput
          placeholder="enter your todo"
          value={todo}
          onChangeText={e => {
            setTodo(e);
          }}
          style={{width: '100%'}}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          addTodo(), dismissKeyboard();
        }}
        style={styles.addButton}>
        <Text>Add Todo</Text>
      </TouchableOpacity>
      {todos.map(i => {
        return (
          <View style={styles.cardContainer}>
            <Text>{i.title}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#2F2FA2',
    alignItems: 'center',
  },
  headerContainer: {
    height: 60,
    width: '100%',
    backgroundColor: '#242582',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5%',
  },
  enterContainer: {
    height: 50,
    width: '90%',
    backgroundColor: '#242592',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '3%',
    borderRadius: 6,
    padding: 5,
    elevation: 5,

    // justifyContent: 'center',
  },
  cardContainer: {
    height: 60,
    width: '90%',
    backgroundColor: '#553D67',
    // justifyContent: 'center',
    borderRadius: 6,
    padding: 5,
    marginBottom: 3,
    elevation: 3,
  },
  addButton: {
    height: 50,
    width: '90%',
    backgroundColor: '#242592',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '3%',
    borderRadius: 6,
    padding: 5,
    elevation: 5,
  },
});

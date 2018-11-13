import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Switch, TextInput } from 'react-native';
import { Constants } from 'expo';

let id = 0

const Todo = props =>(
  <View style={styles.todoContainer}>
    <Switch onValueChange={ props.onToggle } value={ props.todo.checked }/>
    <Button onPress={props.onDelete} title="delete"/>
    <TextInput placeholder={props.todo.text}/>
  </View>
)

export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      todos: [],
    }
  }

  addTodo() {
    id++
    const text = `ToDo Number ${id}`
    this.setState({
      todos: [...this.state.todos, {id: id ,text: text}],
    })
  }

  removeTodo(id){
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    })
  }

  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map(todo =>{
        if (todo.id !== id) 
          return todo
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked,
        }
        
      })
    })

  }

  render() {
    return(
      <View style={styles.appContainer}>
        <Text> ToDo Count: {this.state.todos.length} </Text>
        <Text> unchecked Count: {this.state.todos.filter(todo => !todo.checked).length} </Text>
          <Button onPress={() => this.addTodo()} title="Add Todo"/>
            <ScrollView>{this.state.todos.map( todo => (
                <Todo 
                onToggle={() => this.toggleTodo(todo.id)}
                onDelete={() => this.removeTodo(todo.id)} 
                todo ={todo} 
                />
              ))}
            </ScrollView> 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: Constants.statusBarHeight,
  },

  todoContainer:{
    flexDirection: 'row',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

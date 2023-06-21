import { Component } from 'react';
import './App.scss';
import {Gallery} from './components/gallery/Gallery';
import TodoList from './components/todolist/TodoList';

export default class App extends Component {
  render() {
    return (
      <>
        <Gallery />
        <TodoList />
      </>
    );
  }
}
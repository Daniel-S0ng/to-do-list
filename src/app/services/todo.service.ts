import { Injectable } from '@angular/core';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // store the list of todo items
  private todos: Todo[] = [];
  // store the next id for new todo items
  private nextId = 1;

  getTodos() {
    return this.todos;
  }

  addTodo(title: string) {
    const newTodo: Todo = {
      id: this.nextId++, // assign the next id to the new todo item
      title,
      completed: false // new todo items are incompleted by default
    };
    this.todos.push(newTodo);
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  updateTodo(id: number, title: string) {
    // find the todo item with id
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.title = title;
    }
  }

  toggleComplete(id: number) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  markAllAsDone() {
    this.todos.forEach(todo => todo.completed = true);
  }

  // remove from todo item from current spot and insert at the previous spot
  moveTodoUp(id: number) {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index > 0) {
      const [todo] = this.todos.splice(index, 1);
      this.todos.splice(index - 1, 0, todo);
    }
  }

  // remove from todo item from current spot and insert at the next spot
  moveTodoDown(id: number) {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index < this.todos.length - 1) {
      const [todo] = this.todos.splice(index, 1);
      this.todos.splice(index + 1, 0, todo);
    }
  }
}

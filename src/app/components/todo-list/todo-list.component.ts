import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  newTodoTitle: string = '';
  listName: string = '';

  constructor(public todoService: TodoService, private dialog: MatDialog) {}

  addTodo() {
    if (this.newTodoTitle.trim()) { // check if the title is not empty
      this.todoService.addTodo(this.newTodoTitle);
      this.newTodoTitle = '';
    }
  }

  toggleComplete(id: number) {
    this.todoService.toggleComplete(id);
  }

  editTodoTitle(id: number, title: string) {
    this.todoService.updateTodo(id, title);
  }

  confirmDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todoService.deleteTodo(id);
      }
    });
  }

  anyCompleted() { // check if there is any todo item that is incompleted
    return this.todoService.getTodos().some(todo => !todo.completed);
  }

  markAllAsDone() { 
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure to mark all as done?' }
    });
  
    dialogRef.afterClosed().subscribe(result => { 
      if (result) {
        this.todoService.markAllAsDone();
        alert('Congrats! You\'re all done!!');
      }
    });
  }

  moveTodoUp(id: number) {
    this.todoService.moveTodoUp(id);
  }

  moveTodoDown(id: number) {
    this.todoService.moveTodoDown(id);
  }
}

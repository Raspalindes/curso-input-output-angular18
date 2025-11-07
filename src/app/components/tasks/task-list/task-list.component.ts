import { Component, signal } from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item.component';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: true,
  imports: [TaskItemComponent],
})
export class TaskListComponent {
  tasks = signal<Task[]>([
    { id: 1, text: 'Aprender Angular 18', completed: false },
    { id: 2, text: 'Practicar input() y output()', completed: false },
    { id: 3, text: 'Hacer ejercicios', completed: true },
  ]);

  toggleTask(id: number) {
    this.tasks.update((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  deleteTask(id: number) {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
  }
}

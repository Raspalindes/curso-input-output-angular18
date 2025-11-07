import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
  standalone: true,
})
export class TaskItemComponent {
  tarea = input.required<string>();
  completada = input<boolean>(false);

  toggle = output<void>();
  delete = output<void>();

  onToggle() {
    this.toggle.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}

import { Component } from '@angular/core';
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { SearchInputComponent } from "./components/search-input/search-input.component";
import { TaskListComponent } from "./components/tasks/task-list/task-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductCardComponent, SearchInputComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  alComprar(producto: string) {
    alert(`Has comprado: ${producto}`);
  }
  textoBusqueda = '';

  buscar(texto: string) {
    this.textoBusqueda = texto;
    console.log('Buscar:', texto);
  }

  limpiar() {
    console.log('Búsqueda limpiada');
    this.textoBusqueda = '';
  }
}

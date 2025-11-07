import { Component } from '@angular/core';
import { ProductCardComponent } from "./components/product-card/product-card.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  alComprar(producto: string) {
    alert(`Has comprado: ${producto}`);
  }
}

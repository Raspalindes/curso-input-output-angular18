import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  nombre = input.required<string>();
  precio = input.required<number>();
  imagen = input<string>('https://via.placeholder.com/200');

  comprar = output<string>();

  onComprar() {
    this.comprar.emit(this.nombre());
  }
}
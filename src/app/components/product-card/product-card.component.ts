import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  standalone: true,
  imports: [CurrencyPipe],
})
export class ProductCardComponent {
  nombre = input.required<string>();
  precio = input.required<number>();
  imagen = input<string>('https://i.ibb.co/0g2kRrw/dell-latitude-5400-portatil-356-cm-14-full-hd-intel-core-i5-i5-8250u-8-gb-ddr4-sdram-256-gb-ssd-wi-f.webp');

  comprar = output<string>();

  onComprar() {
    this.comprar.emit(this.nombre());
  }
}

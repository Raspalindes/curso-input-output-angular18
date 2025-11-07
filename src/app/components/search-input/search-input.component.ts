import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css'],
  standalone: true,
})
export class SearchInputComponent {
  placeholder = input<string>('Buscar...');

  search = output<string>();
  clear = output<void>();

  searchText = signal('');

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchText.set(value);
    this.search.emit(value);
  }

  onClear() {
    this.searchText.set('');
    this.clear.emit();
    this.search.emit('');
  }
}

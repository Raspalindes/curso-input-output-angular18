# Curso Angular 18 - input() y output() (Nivel Básico)

## 📚 Tabla de Contenidos

1. [Introducción](#introducción)
2. [INPUT() - Conceptos Básicos](#input---conceptos-básicos)
3. [OUTPUT() - Conceptos Básicos](#output---conceptos-básicos)
4. [Ejemplos Prácticos](#ejemplos-prácticos)
5. [Ejercicios Guiados](#ejercicios-guiados)

---

<details>
<summary>🚀 ¿Cómo clonar y usar este repositorio?</summary>

Si nunca has usado Git o es tu primer proyecto Angular, sigue estos pasos:

1. **Clona el repositorio**

Abre una terminal y ejecuta:

```bash
git clone https://github.com/Raspalindes/curso-input-output-angular18.git
```

2. **Entra a la carpeta del proyecto**

```bash
cd curso-input-output-angular18
```

3. **Instala las dependencias**

Si es tu primer proyecto Angular, asegúrate de tener [Node.js](https://nodejs.org/) instalado.

Luego ejecuta:

```bash
npm install
```

4. **Arranca el servidor de desarrollo**

```bash
ng serve
```

5. **Abre el navegador en** [http://localhost:4200](http://localhost:4200)

¡Listo! Ya puedes seguir el curso y ver los ejercicios en vivo.

</details>

---

<details>
<summary>¿Cómo mostrar un componente en la página principal?</summary>

Por defecto, Angular muestra el contenido de `app.component.html`.
Para ver tu componente nuevo:

1. Abre el archivo `src/app/app.component.html`.
2. Borra el contenido que viene por defecto (si quieres).
3. Importa en el array `imports` de `app.component.ts` el componente que vayas a usar.
4. Agrega el selector de tu componente, por ejemplo:

```html
<app-user-card nombre="Ana García" [edad]="28"></app-user-card>
```

5. Guarda y recarga la página en el navegador.

Así podrás ver el resultado de cada ejercicio.

</details>

---

## Introducción

### ¿Qué son input() y output()?

Angular 18 introduce nuevas formas de comunicación entre componentes:

- **`input()`**: Para recibir datos del componente padre
- **`output()`**: Para enviar eventos al componente padre

### ¿Por qué usar las nuevas APIs?

✅ Más fáciles de usar
✅ Mejor detección de errores
✅ Mejor rendimiento
✅ Código más limpio

### Comparación Rápida

```typescript
// ❌ Forma antigua
@Input() nombre: string = '';
@Output() clicked = new EventEmitter<void>();

// ✅ Forma nueva (Angular 18)
nombre = input<string>('');
clicked = output<void>();
```

---

## INPUT() - Conceptos Básicos

### Tipos de input()

#### 1. Input Opcional

```typescript
// Puede ser undefined
edad = input<number>();
```

#### 2. Input con Valor por Defecto

```typescript
// Si no se pasa, usa 'Invitado'
nombre = input<string>("Invitado");
```

#### 3. Input Requerido

```typescript
// DEBE ser proporcionado
id = input.required<string>();
```

### Cómo Leer un Input

Los inputs se leen como funciones:

```typescript
export class MiComponente {
  nombre = input<string>("Juan");

  mostrarNombre() {
    // ✅ Correcto
    console.log(this.nombre());

    // ❌ Incorrecto
    console.log(this.nombre);
  }
}
```

### En el Template

```html
<!-- Leer el valor -->
<p>Hola {{ nombre() }}</p>

<!-- Pasar valor desde padre -->
<app-hijo nombre="María" />
<app-hijo [nombre]="variableDelPadre" />
```

---

## OUTPUT() - Conceptos Básicos

### Crear un Output

```typescript
import { Component, output } from "@angular/core";

export class MiComponente {
  // Output sin datos
  clicked = output<void>();

  // Output con datos
  nameChanged = output<string>();
}
```

### Emitir Eventos

```typescript
export class MiComponente {
  clicked = output<void>();

  handleClick() {
    // Emitir el evento
    this.clicked.emit();
  }
}
```

### Escuchar en el Padre

```html
<!-- En el template del padre -->
<app-hijo (clicked)="alHacerClick()" />
<app-hijo (nameChanged)="alCambiarNombre($event)" />
```

```typescript
// En el componente padre
export class PadreComponent {
  alHacerClick() {
    console.log("Click detectado");
  }

  alCambiarNombre(nuevoNombre: string) {
    console.log("Nuevo nombre:", nuevoNombre);
  }
}
```

---

## Ejemplos Prácticos

---

### Ejemplo 1: Tarjeta de Usuario Simple

**user-card.component.ts**

```typescript
import { Component, input } from "@angular/core";

@Component({
  selector: "app-user-card",
  templateUrl: "./user-card.component.html",
  styleUrls: ["./user-card.component.css"],
  standalone: true,
})
export class UserCardComponent {
  nombre = input.required<string>();
  edad = input<number>();
  avatar = input<string>("https://via.placeholder.com/100");
}
```

**user-card.component.html**

```html
<div class="card">
  <img [src]="avatar()" [alt]="nombre()" />
  <h3>{{ nombre() }}</h3>
  @if (edad()) {
  <p>{{ edad() }} años</p>
  }
</div>
```

**user-card.component.css**

p {

```css
.card {
  border: 1px solid #000;
  padding: 8px;
  text-align: center;
}
img {
  width: 80px;
  height: 80px;
}
h3 {
  margin: 8px 0;
}
p {
  margin: 0;
}
```

**Uso:**

```html
<app-user-card nombre="Ana García" [edad]="28" />
```

---

### Ejemplo 2: Botón con Evento

**custom-button.component.ts**

```typescript
import { Component, input, output } from "@angular/core";

@Component({
  selector: "app-custom-button",
  templateUrl: "./custom-button.component.html",
  styleUrls: ["./custom-button.component.css"],
  standalone: true,
})
export class CustomButtonComponent {
  texto = input<string>("Click aquí");
  tipo = input<"primary" | "secondary">("primary");

  clicked = output<void>();

  onClick() {
    this.clicked.emit();
  }
}
```

**custom-button.component.html**

```html
<button [class]="tipo()" (click)="onClick()">{{ texto() }}</button>
```

**custom-button.component.css**

```css
button {
  padding: 8px 16px;
  border: 1px solid #000;
  background: #eee;
  cursor: pointer;
}
.primary {
  background: #ccc;
}
.secondary {
  background: #fff;
}
```

**Uso:**

```html
<app-custom-button texto="Guardar" tipo="primary" (clicked)="guardarDatos()" />
```

---

### Ejemplo 3: Contador con Input y Output

**counter.component.ts**

```typescript
import { Component, input, output, signal } from "@angular/core";

@Component({
  selector: "app-counter",
  templateUrl: "./counter.component.html",
  styleUrls: ["./counter.component.css"],
  standalone: true,
})
export class CounterComponent {
  inicial = input<number>(0);

  countChanged = output<number>();

  count = signal(0);

  ngOnInit() {
    this.count.set(this.inicial());
  }

  incrementar() {
    this.count.update((v) => v + 1);
    this.countChanged.emit(this.count());
  }

  decrementar() {
    this.count.update((v) => v - 1);
    this.countChanged.emit(this.count());
  }
}
```

**counter.component.html**

```html
<div class="counter">
  <button (click)="decrementar()">-</button>
  <span class="number">{{ count() }}</span>
  <button (click)="incrementar()">+</button>
</div>
```

**counter.component.css**

```css
.counter {
  text-align: center;
}
button {
  width: 32px;
  height: 32px;
}
.number {
  font-size: 20px;
  margin: 0 8px;
}
```

**Uso:**

```html
<app-counter [inicial]="10" (countChanged)="actualizarContador($event)" />
```

---

## Ejercicios Guiados

---

### 🎯 Ejercicio 1: Tarjeta de Producto

**¿Cómo crear el componente?**

Abre la terminal en la carpeta del proyecto y ejecuta:

```bash
ng generate component components/product-card --standalone
```

Esto creará los archivos necesarios en `src/app/components/product-card/`.

**Objetivo:** Crear un componente que muestre información de un producto.

**Requisitos:**

- Input `nombre` (requerido)
- Input `precio` (requerido)
- Input `imagen` (opcional, con imagen por defecto)
- Output `comprar` que emita cuando se haga click en "Comprar"

**Estructura:**

```
src/app/components/product-card/
  ├── product-card.component.ts
  ├── product-card.component.html
  └── product-card.component.css
```

**Guía de Implementación:**

1. Crea el componente con los inputs y outputs necesarios
2. En el HTML muestra: imagen, nombre, precio
3. Agrega un botón "Comprar" que emita el evento
4. Estiliza la tarjeta con CSS

<details>
<summary>💡 Ver solución</summary>

**product-card.component.ts**

```typescript
import { Component, input, output } from "@angular/core";
import { CurrencyPipe } from "@angular/common";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"],
  standalone: true,
  imports: [CurrencyPipe],
})
export class ProductCardComponent {
  nombre = input.required<string>();
  precio = input.required<number>();
  // un enlace a una foto de una laptop
  imagen = input<string>("https://i.ibb.co/0g2kRrw/dell-latitude-5400-portatil-356-cm-14-full-hd-intel-core-i5-i5-8250u-8-gb-ddr4-sdram-256-gb-ssd-wi-f.webp");

  comprar = output<string>();

  onComprar() {
    this.comprar.emit(this.nombre());
  }
}
```

**product-card.component.html**

```html
<div class="product-card">
  <img [src]="imagen()" [alt]="nombre()" />
  <div class="info">
    <h3>{{ nombre() }}</h3>
    <p class="precio">{{ precio() | currency:'EUR' }}</p>
    <button (click)="onComprar()">Comprar</button>
  </div>
</div>
```

**product-card.component.css**

```css
.product-card {
  border: 1px solid #000;
  padding: 8px;
  max-width: 200px;
}
img {
  width: 100px;
  height: 100px;
}
.info {
  padding: 4px;
}
h3 {
  margin: 8px 0;
}
.precio {
  font-weight: bold;
}
button {
  width: 100%;
  padding: 8px;
}
```

**Uso en la app principal:**

> ⚠️ **Recuerda importar el componente en el array `imports` de `app.component.ts` para que funcione en el HTML.**

**app.component.ts**

```typescript
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  alComprar(producto: string) {
    alert(`Has comprado: ${producto}`);
  }
}
```

**app.component.html**

```html
<app-product-card nombre="Laptop" [precio]="999.99" (comprar)="alComprar($event)"></app-product-card>
```

</details>

---

---

### 🎯 Ejercicio 2: Input de Búsqueda

**¿Cómo crear el componente?**

Abre la terminal en la carpeta del proyecto y ejecuta:

```bash
ng generate component components/search-input --standalone
```

Esto creará los archivos necesarios en `src/app/components/search-input/`.

**Objetivo:** Crear un componente de búsqueda que emita el texto mientras el usuario escribe.

**Requisitos:**

- Input `placeholder` (opcional)
- Output `search` que emita el texto cada vez que cambia
- Output `clear` que emita cuando se limpia la búsqueda
- Botón para limpiar el input

**Estructura:**

```
src/app/components/search-input/
  ├── search-input.component.ts
  ├── search-input.component.html
  └── search-input.component.css
```

**Guía de Implementación:**

1. Crea un input de texto
2. Usa un signal para mantener el valor actual
3. Emite el valor cuando cambia
4. Agrega un botón "X" que limpie el input

<details>
<summary>💡 Ver solución</summary>

**search-input.component.ts**

```typescript
import { Component, input, output, signal } from "@angular/core";

@Component({
  selector: "app-search-input",
  templateUrl: "./search-input.component.html",
  styleUrls: ["./search-input.component.css"],
  standalone: true,
})
export class SearchInputComponent {
  placeholder = input<string>("Buscar...");

  search = output<string>();
  clear = output<void>();

  searchText = signal("");

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchText.set(value);
    this.search.emit(value);
  }

  onClear() {
    this.searchText.set("");
    this.clear.emit();
    this.search.emit("");
  }
}
```

**search-input.component.html**

```html
<div class="search-container">
  <input type="text" [placeholder]="placeholder()" [value]="searchText()" (input)="onInput($event)" class="search-input" />
  @if (searchText()) {
  <button class="clear-btn" (click)="onClear()">✕</button>
  }
</div>
```

**search-input.component.css**

```css
.search-container {
  margin-bottom: 8px;
}
.search-input {
  width: 100%;
  padding: 4px;
}
.clear-btn {
  margin-left: 4px;
}
```

**Uso:**

**Uso en la app principal:**

> ⚠️ **Recuerda importar el componente en el array `imports` de `app.component.ts` para que funcione en el HTML.**

**app.component.ts**

```typescript
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  textoBusqueda = "";

  buscar(texto: string) {
    this.textoBusqueda = texto;
    console.log("Buscar:", texto);
  }

  limpiar() {
    console.log("Búsqueda limpiada");
    this.textoBusqueda = "";
  }
}
```

**app.component.html**

```html
<app-search-input placeholder="Buscar productos..." (search)="buscar($event)" (clear)="limpiar()"></app-search-input>
<p>Buscando: {{ textoBusqueda }}</p>
```

> ℹ️ **Nota:** El componente `app-search-input` es el que debes usar en tu app principal. No necesitas crear un componente intermedio para probarlo.

</details>

---

---

> 💡 **Recuerda:** [¿Cómo mostrar este componente?](#cómo-mostrar-un-componente-en-la-página-principal)

### 🎯 Ejercicio 3: Lista de Tareas Simple

**¿Cómo crear los componentes?**

Abre la terminal en la carpeta del proyecto y ejecuta:

```bash
ng generate component components/tasks/task-item --standalone
ng generate component components/tasks/task-list --standalone
```

Esto creará los archivos necesarios en `src/app/components/tasks/task-item/` y `src/app/components/tasks/task-list/`.

**Uso en la app principal:**

> ⚠️ **Recuerda importar el componente en el array `imports` de `app.component.ts` para que funcione en el HTML.**

**app.component.ts**

```typescript
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {}
```

**app.component.html**

```html
<app-task-list></app-task-list>
```

> ℹ️ **Nota:** Usa solo `<app-task-list>` en tu app principal. El componente `app-task-item` es un subcomponente y no se usa directamente, sino a través de `app-task-list`.

**Objetivo:** Crear dos componentes: uno para mostrar una tarea y otro para la lista.

**Componentes:**

**TaskItem:**

- Input `tarea` (string, requerido)
- Input `completada` (boolean, default false)
- Output `toggle` cuando se marca/desmarca
- Output `delete` cuando se elimina

**TaskList:**

- Mantiene array de tareas
- Usa TaskItem para cada tarea
- Maneja eventos de los items

**Estructura:**

```
src/app/components/tasks/
  ├── task-item/
  │   ├── task-item.component.ts
  │   ├── task-item.component.html
  │   └── task-item.component.css
  └── task-list/
      ├── task-list.component.ts
      ├── task-list.component.html
      └── task-list.component.css
```

<details>
<summary>💡 Ver solución</summary>

**task-item.component.ts**

```typescript
import { Component, input, output } from "@angular/core";

@Component({
  selector: "app-task-item",
  templateUrl: "./task-item.component.html",
  styleUrls: ["./task-item.component.css"],
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
```

**task-item.component.html**

```html
<div class="task-item" [class.completed]="completada()">
  <input type="checkbox" [checked]="completada()" (change)="onToggle()" />
  <span class="task-text">{{ tarea() }}</span>
  <button class="delete-btn" (click)="onDelete()">🗑️</button>
</div>
```

**task-item.component.css**

```css
.task-item {
  border: 1px solid #000;
  padding: 4px;
  margin-bottom: 4px;
}
.task-text {
  margin-left: 8px;
}
.delete-btn {
  margin-left: 8px;
}
```

**task-list.component.ts**

```typescript
import { Component, signal } from "@angular/core";
import { TaskItemComponent } from "../task-item/task-item.component";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.css"],
  standalone: true,
  imports: [TaskItemComponent],
})
export class TaskListComponent {
  tasks = signal<Task[]>([
    { id: 1, text: "Aprender Angular 18", completed: false },
    { id: 2, text: "Practicar input() y output()", completed: false },
    { id: 3, text: "Hacer ejercicios", completed: true },
  ]);

  toggleTask(id: number) {
    this.tasks.update((tasks) => tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  }

  deleteTask(id: number) {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
  }
}
```

**task-list.component.html**

```html
<div class="task-list">
  <h2>Mis Tareas</h2>
  @for (task of tasks(); track task.id) {
  <app-task-item [tarea]="task.text" [completada]="task.completed" (toggle)="toggleTask(task.id)" (delete)="deleteTask(task.id)" />
  } @empty {
  <p class="empty">No hay tareas</p>
  }
</div>
```

**task-list.component.css**

h2 {

```css
.task-list {
  margin: 0;
  padding: 0;
}
h2 {
  margin-bottom: 8px;
}
.empty {
  color: #888;
}
```

</details>

---

## Buenas Prácticas

### 1. Naming Conventions

```typescript
// ✅ Bueno: nombres descriptivos
userName = input<string>("");
userClicked = output<void>();

// ❌ Malo: nombres genéricos
data = input<string>("");
event = output<void>();
```

### 2. Usa Tipos Específicos

```typescript
// ✅ Bueno: tipos específicos
status = input<"active" | "inactive">("active");
age = input<number>(0);

// ❌ Malo: tipo any
data = input<any>();
```

### 3. Valores por Defecto

```typescript
// ✅ Bueno: valor por defecto sensato
name = input<string>("Invitado");
count = input<number>(0);

// ✅ También bueno: input requerido si siempre debe tener valor
id = input.required<string>();
```

### 4. Separa Lógica de Presentación

```typescript
// ✅ Bueno
export class MyComponent {
  name = input<string>("");

  // Computed para lógica
  greeting = computed(() => `Hola, ${this.name()}!`);
}
```

### 5. Archivos Separados

Siempre mantén separados:

- `.component.ts` - Lógica
- `.component.html` - Template
- `.component.css` - Estilos

---

## Resumen

### Input()

- Para **recibir** datos del padre
- Se lee como función: `nombre()`
- Tipos: opcional, con default, requerido

### Output()

- Para **enviar** eventos al padre
- Se emite con: `evento.emit(valor)`
- El padre escucha con: `(evento)="metodo($event)"`

### Flujo de Datos

```
Padre --[input]--> Hijo
Hijo --[output]--> Padre
```

¡Practica con los ejercicios y estarás listo para usar input() y output() en Angular 18! 🚀

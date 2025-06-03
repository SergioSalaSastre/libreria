import { Component } from '@angular/core';
import { Book } from '../Models/Book';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ServiceService } from '../Service/bookService.service';

@Component({
  selector: 'app-pagina-principal',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.css',
})
export class PaginaPrincipalComponent {
  constructor(private router: Router,
              private service: ServiceService) {}
  searchTerm: string = '';
  favoriteBooks: any[] = [];
  showOnlyFavorites: boolean = false;
  isDropdownOpen: boolean = false;
  selectedGenre: string | null = null;


  books: Book[] =[];


  // Opcional: Cargar favoritos al iniciar
  ngOnInit() {

    this.service.getBooks().subscribe(data => this.books = data);
    const saved = localStorage.getItem('favoriteBooks');
    if (saved) this.favoriteBooks = JSON.parse(saved);
  }

  get filteredBooks(): Book[] {
  const source = this.showOnlyFavorites ? this.favoriteBooks : this.books;

  let result = source;

  if (this.selectedGenre) {
    result = result.filter(book =>
      book.literaryGenre?.toLowerCase() === this.selectedGenre?.toLowerCase()
    );
  }

  if (this.searchTerm) {
    const term = this.searchTerm.toLowerCase();
    result = result.filter(book =>
      (book.title && book.title.toLowerCase().includes(term)) ||
      (book.author && book.author.toLowerCase().includes(term)) ||
      (book.literaryGenre && book.literaryGenre.toLowerCase().includes(term))
    );
  }

  return result;
}

  clearSearch() {
    this.searchTerm = '';
  }

  handleImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/placeholder.png';
  }

  logout() {
    this.router.navigate(['/login']);
  }

  toggleFavorite(book: any) {
    const index = this.favoriteBooks.findIndex(
      (fav) => fav.title === book.title
    );

    if (index === -1) {
      this.favoriteBooks.push({ ...book }); // Clonamos el libro para evitar referencia
    } else {
      this.favoriteBooks.splice(index, 1);
    }

    // Opcional: Guardar en localStorage
    localStorage.setItem('favoriteBooks', JSON.stringify(this.favoriteBooks));
  }

  // Verificar si es favorito
  isFavorite(book: any): boolean {
    return this.favoriteBooks.some((fav) => fav.title === book.title);
  }



  // Función para alternar (abrir/cerrar) el dropdown
toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}

// Función para filtrar libros por género
filterByGenre(genre: string) {
  this.selectedGenre = genre;
  this.isDropdownOpen = false;
}

clearGenreFilter() {
  this.selectedGenre = null;
  this.isDropdownOpen = false;
}

get uniqueGenres(): string[] {
  const genres = this.books
    .map(book => book.literaryGenre)
    .filter((genre): genre is string => typeof genre === 'string'); // descarta undefined
  return Array.from(new Set(genres));
}

}


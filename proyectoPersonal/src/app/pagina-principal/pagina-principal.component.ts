import { Component } from '@angular/core';
import { Book } from '../Models/Book';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-principal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.css',
})
export class PaginaPrincipalComponent {
  constructor(private router: Router) {}
  searchTerm: string = '';
  favoriteBooks: any[] = [];
  showOnlyFavorites: boolean = false;
  isDropdownOpen: boolean = false;
  selectedGenre: string | null = null;

  books: Book[] = [
    {
      title: 'Cien años de soledad',
      author: 'Gabriel García Márquez',
      publicationYear: 1967,
      literaryGenre: 'Realismo mágico',
      cover: 'https://covers.openlibrary.org/b/isbn/9788497594255-L.jpg',
      description: 'Una novela emblemática de la literatura latinoamericana.',
    },
    {
      title: '1984',
      author: 'George Orwell',
      publicationYear: 1949,
      literaryGenre: 'Distopía',
      cover: 'https://covers.openlibrary.org/b/id/153541-L.jpg',
      description:
        'Una obra maestra sobre el control social y la vigilancia en una sociedad totalitaria.',
    },
    {
      title: 'Brave New World',
      author: 'Aldous Huxley',
      publicationYear: 1932,
      literaryGenre: 'Ciencia ficción distópica',
      cover: 'https://covers.openlibrary.org/b/id/8225261-L.jpg',
      description:
        'Una sociedad futurista donde la eficiencia y el control social eliminan la individualidad y la emoción humana.',
    },
    {
      title: "Ender's Game",
      author: 'Orson Scott Card',
      publicationYear: 1985,
      literaryGenre: 'Ciencia ficción militar',
      cover: 'https://covers.openlibrary.org/b/id/240726-L.jpg',
      description:
        'La humanidad entrena niños prodigio para liderar la defensa contra una amenaza alienígena.',
    },
    {
      title: 'Mendigos en España',
      author: 'Nancy Kress',
      publicationYear: 1991,
      literaryGenre: 'Ciencia ficción',
      cover: 'https://covers.openlibrary.org/b/id/8231996-L.jpg',
      description:
        'En un futuro donde la ingeniería genética permite crear humanos que no necesitan dormir, surgen tensiones sociales y éticas.',
    },
    {
      title: 'La República',
      author: 'Platón',
      publicationYear: -380,
      literaryGenre: 'Filosofía',
      cover: 'https://covers.openlibrary.org/b/id/8231851-L.jpg',
      description:
        'El diálogo filosófico más influyente de Platón sobre la justicia, la política y la ciudad ideal.',
    },
    {
      title: 'Metafísica',
      author: 'Aristóteles',
      publicationYear: -350,
      literaryGenre: 'Filosofía',
      cover: 'https://covers.openlibrary.org/b/id/8231830-L.jpg',
      description:
        'Obra fundamental donde Aristóteles explora la naturaleza de la realidad, el ser y el conocimiento.',
    },
    {
      title: 'Don Quijote de la Mancha',
      author: 'Miguel de Cervantes',
      publicationYear: 1605,
      literaryGenre: 'Novela',
      cover: 'https://covers.openlibrary.org/b/id/10521689-L.jpg',
      description:
        'Las aventuras del caballero Don Quijote y su fiel escudero Sancho Panza, una sátira de las novelas de caballería.',
    },
    {
      title: 'No te comas el coco',
      author: 'Julia Pascual',
      publicationYear: 2021,
      literaryGenre: 'Desarrollo personal',
      cover: 'https://covers.openlibrary.org/b/id/12853938-L.jpg',
      description:
        'Un libro de autoayuda que ofrece herramientas prácticas para gestionar la ansiedad y los pensamientos negativos.',
    },
  ];

  get filteredBooks(): Book[] {
  let result = this.books;

  if (this.selectedGenre) {
    result = result.filter(book => book.literaryGenre === this.selectedGenre);
  }

  if (this.searchTerm) {
    const term = this.searchTerm.toLowerCase();
    result = result.filter(
      (book) =>
        (book.title && book.title.toLowerCase().includes(term)) ||
        (book.author && book.author.toLowerCase().includes(term))
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

  // Opcional: Cargar favoritos al iniciar
  ngOnInit() {
    const saved = localStorage.getItem('favoriteBooks');
    if (saved) this.favoriteBooks = JSON.parse(saved);
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


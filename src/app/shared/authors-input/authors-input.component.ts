import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Author } from '../../models/author.model';

@Component({
  selector: 'app-authors-input',
  templateUrl: './authors-input.component.html',
  styleUrls: ['./authors-input.component.css'],
})
export class AuthorsInputComponent {
  @Input() allAuthors!: Author[];
  @Input() set oldAuthors(value: Author[]) {
    this.selectedAuthors = [...value];
  }
  @Output() setSelectedAuthors = new EventEmitter<Author[]>();

  authorsValue = '';
  selectedAuthors: Author[] = [];

  addAuthor(event: Event) {
    event.preventDefault();

    const selectedAuthor = this.allAuthors.find(
      (author) => author.name === this.authorsValue
    );

    if (selectedAuthor && !this.selectedAuthors.includes(selectedAuthor)) {
      this.selectedAuthors.push(selectedAuthor);
      this.authorsValue = '';

      this.setSelectedAuthors.emit(this.selectedAuthors);
    }
  }

  removeAuthor(id: string) {
    const authorIndex = this.selectedAuthors.findIndex(
      (author) => author.id === id
    );
    this.selectedAuthors.splice(authorIndex, 1);

    this.setSelectedAuthors.emit(this.selectedAuthors);
  }
}

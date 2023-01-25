import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Author } from '../../models/author.model';

@Component({
  selector: 'app-authors-input',
  templateUrl: './authors-input.component.html',
  styleUrls: ['./authors-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthorsInputComponent),
      multi: true,
    },
  ],
})
export class AuthorsInputComponent implements ControlValueAccessor {
  @Input() allAuthors!: Author[];
  @Input() set oldAuthors(value: Author[]) {
    this.selectedAuthors = [...value];
  }

  authorsValue = '';
  selectedAuthors: Author[] = [];

  onChange: any;
  onTouch: any;

  addAuthor() {
    const selectedAuthor = this.allAuthors.find(
      (author) => author.name === this.authorsValue
    );

    if (selectedAuthor && !this.selectedAuthors.includes(selectedAuthor)) {
      this.selectedAuthors.push(selectedAuthor);
      this.authorsValue = '';

      this.onChange(this.selectedAuthors);
      this.onTouch(this.selectedAuthors);
    }
  }

  removeAuthor(id: string) {
    const authorIndex = this.selectedAuthors.findIndex(
      (author) => author.id === id
    );
    this.selectedAuthors.splice(authorIndex, 1);

    this.onChange(this.selectedAuthors);
    this.onTouch(this.selectedAuthors);
  }

  // this method sets the value programmatically
  writeValue(value: any) {
    this.selectedAuthors = value;
  }

  // upon UI element value changes, this method gets triggered
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  // upon touching the element, this method gets triggered
  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
}

// search-form.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html'
})
export class SearchFormComponent {
  @Output() queryEvent = new EventEmitter<string>();

  searchForm = new FormGroup({
    query: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  // search-form.component.ts
  submitForm() {
    const query: string = this.searchForm.value.query || '';  // Provide a default empty string
    if (this.searchForm.valid) {
      this.queryEvent.emit(query);
    }
  }

}

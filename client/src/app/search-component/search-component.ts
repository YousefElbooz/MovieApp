import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-component.html',
  styleUrl: './search-component.css'
})
export class SearchComponent {
  searchText : string = '';
  @Output() dataEmitter = new EventEmitter<string>();

  sendData() {
    this.dataEmitter.emit(this.searchText);
  }

}

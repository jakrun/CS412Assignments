// display-data.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display-data',
  templateUrl: './display-data.component.html'
})
export class DisplayDataComponent {
  @Input() data: any[] = [];
}

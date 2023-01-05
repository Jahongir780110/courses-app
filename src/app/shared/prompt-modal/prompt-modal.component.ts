import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-prompt-modal',
  templateUrl: './prompt-modal.component.html',
  styleUrls: ['./prompt-modal.component.css'],
})
export class PromptModalComponent {
  @Input() promptText = '';
  @Output() proceed = new EventEmitter();
  @Output() cancel = new EventEmitter();
}

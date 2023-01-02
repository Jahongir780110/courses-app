import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appChangeBorderColor]',
})
export class ChangeBorderColorDirective implements OnInit {
  @Input() date!: Date;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const creationDateInMilliSeconds = this.date.getTime();
    const currentDateInMilliSeconds = new Date().getTime();
    const oneDayInMilliSeconds = 24 * 60 * 60 * 1000;

    if (
      creationDateInMilliSeconds < currentDateInMilliSeconds &&
      creationDateInMilliSeconds >=
        currentDateInMilliSeconds - 14 * oneDayInMilliSeconds
    ) {
      this.el.nativeElement.style.borderColor = '#198754';
    } else if (creationDateInMilliSeconds > currentDateInMilliSeconds) {
      this.el.nativeElement.style.borderColor = '#0D6EFD';
    }
  }
}

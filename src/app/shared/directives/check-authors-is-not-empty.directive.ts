import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appCheckAuthorsIsNotEmpty]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CheckAuthorsIsNotEmptyDirective,
      multi: true,
    },
  ],
})
export class CheckAuthorsIsNotEmptyDirective implements Validator {
  validate(c: AbstractControl): ValidationErrors | null {
    if (c?.value?.length) {
      return null;
    }

    return {
      checkAuthorsIsNotEmpty: {
        value: c.value,
      },
    };
  }
}

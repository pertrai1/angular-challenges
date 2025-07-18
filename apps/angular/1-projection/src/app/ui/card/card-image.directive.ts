import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[cardImage]',
})
export class CardImageDirective {
  public templateRef = inject(TemplateRef<unknown>);
}

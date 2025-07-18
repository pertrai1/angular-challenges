import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[cardListItem]',
})
export class CardListItemDirective {
  public templateRef = inject(TemplateRef<unknown>);
}

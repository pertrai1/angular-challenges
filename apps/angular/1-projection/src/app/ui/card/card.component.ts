import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, input, output } from '@angular/core';
import { CardImageDirective } from './card-image.directive';
import { CardListItemDirective } from './card-list-item.directive';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <!-- Image section using content projection -->
      @if (imageTemplate()) {
        <ng-container [ngTemplateOutlet]="imageTemplate()!.templateRef" />
      }

      <!-- List section using content projection -->
      <section>
        @for (item of list(); track item) {
          @if (listItemTemplate()) {
            <ng-container
              [ngTemplateOutlet]="listItemTemplate()!.templateRef"
              [ngTemplateOutletContext]="{ $implicit: item }" />
          }
        }
      </section>

      <!-- Button section using content projection -->
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addItem.emit()">
        Add
      </button>
    </div>
  `,
  imports: [NgTemplateOutlet],
})
export class CardComponent {
  readonly list = input<unknown[]>([]);
  readonly customClass = input('');

  // Output for add action - parent components will handle their specific logic
  readonly addItem = output<void>();

  // Content children for projected templates
  readonly imageTemplate = contentChild(CardImageDirective);
  readonly listItemTemplate = contentChild(CardListItemDirective);
}

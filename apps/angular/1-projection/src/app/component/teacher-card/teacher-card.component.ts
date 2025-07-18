import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardImageDirective } from '../../ui/card/card-image.directive';
import { CardListItemDirective } from '../../ui/card/card-list-item.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      customClass="bg-light-red"
      (addItem)="addTeacher()">
      <!-- Projected image template -->
      <ng-template cardImage>
        <img ngSrc="assets/img/teacher.png" width="200" height="200" />
      </ng-template>

      <!-- Projected list item template -->
      <ng-template cardListItem let-teacher>
        <app-list-item
          [name]="teacher.firstName"
          [id]="teacher.id"
          (deleteItem)="deleteTeacher($event)" />
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [
    CardComponent,
    CardImageDirective,
    CardListItemDirective,
    ListItemComponent,
    NgOptimizedImage,
  ],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addTeacher(): void {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number): void {
    this.store.deleteOne(id);
  }
}

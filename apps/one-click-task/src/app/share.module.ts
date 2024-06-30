import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { CommonHeaderModule, OneClickUiModule } from '@one-click/one-click-ui';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatListModule } from '@angular/material/list';
import { ProjectHomeComponent } from './pages/project-block/project/project-home/project-home.component';
import { ProjectHeaderComponent } from './pages/project-block/project/project-header/project-header.component';
import { TaskListComponent } from './pages/project-block/project/task-list/task-list.component';
import { TaskListViewComponent } from './pages/project-block/project/task-list-view/task-list-view.component';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatPaginatorModule,
        MatTableModule,
        MatSelectModule,
        MatDialogModule,
        MatCheckboxModule,
        MatInputModule,
        MatMenuModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        RouterModule,
        MatProgressSpinnerModule,
        AngularFireAuthModule,
        CommonHeaderModule,
        OneClickUiModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatSlideToggleModule,
        SlickCarouselModule,
        MatButtonToggleModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        NgxMatNativeDateModule,
        MatDatepickerModule,
        FullCalendarModule,
        MatListModule,
        MatNativeDateModule,
    ],
    declarations: [
        ProjectHomeComponent,
        ProjectHeaderComponent,
        TaskListComponent,
        TaskListViewComponent
    ],
    exports: [
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatPaginatorModule,
        MatTableModule,
        MatSelectModule,
        MatDialogModule,
        MatCheckboxModule,
        MatMenuModule,
        MatIconModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        RouterModule,
        MatProgressSpinnerModule,
        AngularFireAuthModule,
        CommonHeaderModule,
        OneClickUiModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatSlideToggleModule,
        MatButtonToggleModule,
        MatDatepickerModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        NgxMatNativeDateModule,
        FullCalendarModule,
        MatListModule,
        ProjectHomeComponent,
        ProjectHeaderComponent,
        TaskListComponent,
        TaskListViewComponent,
        MatNativeDateModule,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class SharedModule { }
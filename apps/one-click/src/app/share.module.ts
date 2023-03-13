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
import { GetSocialTypePipe } from './pipes/get-social-type/get-social-type.pipe';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


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
        MatSlideToggleModule
    ],
    declarations: [
        GetSocialTypePipe,
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
        GetSocialTypePipe,
        MatSlideToggleModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class SharedModule { }
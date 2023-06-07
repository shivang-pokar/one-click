
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
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GetSocialTypePipe } from './pipes/get-social-type/get-social-type.pipe';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MediaTypePipe } from './pipes/mediaType/media-type.pipe';
import { ValidationMessagePipe } from './pipes/validation-message/validation-message.pipe';




@NgModule({
    imports: [
        MatBadgeModule,
        MatButtonModule,
        MatPaginatorModule,
        MatTableModule,
        MatSelectModule,
        MatDialogModule,
        MatCheckboxModule,
        MatInputModule,
        MatMenuModule,
        MatIconModule,
        ClipboardModule,
        MatChipsModule,
        RouterModule,
        MatTooltipModule,
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatProgressSpinnerModule,
        SlickCarouselModule
    ],
    declarations: [
        GetSocialTypePipe,
        MediaTypePipe,
        ValidationMessagePipe
    ],
    exports: [
        MatBadgeModule,
        MatInputModule,
        MatButtonModule,
        MatPaginatorModule,
        MatTableModule,
        MatSelectModule,
        MatDialogModule,
        MatCheckboxModule,
        MatMenuModule,
        MatIconModule,
        ClipboardModule,
        MatChipsModule,
        RouterModule,
        MatTooltipModule,
        GetSocialTypePipe,
        MediaTypePipe,
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatProgressSpinnerModule,
        SlickCarouselModule,
        ValidationMessagePipe
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class SharedModule { }
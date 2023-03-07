
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



@NgModule({
    imports: [

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
        RouterModule
    ],
    declarations: [

    ],
    exports: [
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
        RouterModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class SharedModule { }
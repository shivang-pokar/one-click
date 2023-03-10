import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegrationCardComponent } from './integration-card/integration-card.component';
import { SharedModule } from './share.module';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [IntegrationCardComponent, ConfirmationDialogComponent],
  exports: [IntegrationCardComponent]
})
export class OneClickUiModule { }

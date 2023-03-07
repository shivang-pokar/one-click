import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegrationCardComponent } from './integration-card/integration-card.component';
import { SharedModule } from './share.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [IntegrationCardComponent],
  exports: [IntegrationCardComponent]
})
export class OneClickUiModule { }

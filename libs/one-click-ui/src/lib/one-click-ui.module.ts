import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegrationCardComponent } from './integration-card/integration-card.component';
import { SharedModule } from './share.module';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { PostDataSectionComponent } from './post-data-section/post-data-section.component';
import { SelectAccountComponent } from './select-account/select-account.component';
import { FacebookPostUiComponent } from './facebook-post-ui/facebook-post-ui.component';
import { InstagramPostUiComponent } from './instagram-post-ui/instagram-post-ui.component';
import { TwitterPostUiComponent } from './twitter-post-ui/twitter-post-ui.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [
    IntegrationCardComponent,
    ConfirmationDialogComponent,
    PostDataSectionComponent,
    SelectAccountComponent,
    FacebookPostUiComponent,
    InstagramPostUiComponent,
    TwitterPostUiComponent
  ],
  exports: [
    IntegrationCardComponent,
    PostDataSectionComponent,
    SelectAccountComponent,
    FacebookPostUiComponent,
    InstagramPostUiComponent,
    TwitterPostUiComponent
  ]
})
export class OneClickUiModule { }

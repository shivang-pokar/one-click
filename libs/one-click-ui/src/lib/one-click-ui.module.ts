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
import { CommonDialogComponent } from './common-dialog/common-dialog.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { LoadingComponent } from './loading/loading.component';
import { SocialChipComponent } from './social-chip/social-chip.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { ButtonComponent } from './common-components/button/button.component';
import { WorkspaceComponent } from './workspace/workspace.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [
    IntegrationCardComponent,
    ConfirmationDialogComponent,
    PostDataSectionComponent,
    SelectAccountComponent,
    FacebookPostUiComponent,
    InstagramPostUiComponent,
    TwitterPostUiComponent,
    CommonDialogComponent,
    FileManagerComponent,
    LoadingComponent,
    SocialChipComponent,
    ProfileDetailsComponent,
    SubscriptionComponent,
    ButtonComponent,
    WorkspaceComponent,
  ],
  exports: [
    IntegrationCardComponent,
    PostDataSectionComponent,
    SelectAccountComponent,
    FacebookPostUiComponent,
    InstagramPostUiComponent,
    TwitterPostUiComponent,
    CommonDialogComponent,
    FileManagerComponent,
    LoadingComponent,
    SocialChipComponent,
    ProfileDetailsComponent,
    SubscriptionComponent,
    ButtonComponent,
    WorkspaceComponent
  ],
})
export class OneClickUiModule { }

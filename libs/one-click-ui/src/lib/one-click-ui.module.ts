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
import { ContentWritingUiComponent } from './content-writing-ui/content-writing-ui.component';
import { ContentWritingHistoryComponent } from './content-writing-history/content-writing-history.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomePresentationComponent } from './task/home-presentation/home-presentation.component';
import { PrivateNotepadComponent } from './task/private-notepad/private-notepad.component';
import { DashboardTaskComponent } from './task/dashboard-task/dashboard-task.component';
import { TaskProjectListComponent } from './task/task-project-list/task-project-list.component';
import { TaskProjectBlockComponent } from './task/task-project-block/task-project-block.component';
import { TabSectionComponent } from './tab-section/tab-section.component';
import { CreateProjectComponent } from './task/create-project/create-project.component';
import { ContextMenuComponent } from './task/context-menu/context-menu.component';
import { StatusMenuComponent } from './task/status-menu/status-menu.component';
import { StatusMenuEditDailogComponent } from './task/status-menu-edit-dailog/status-menu-edit-dailog.component';
import { PopupHeaderComponent } from './common-components/popup-header/popup-header.component';
import { StatusChipComponent } from './common-components/status-chip/status-chip.component';
import { AssignMenuComponent } from './task/assign-menu/assign-menu.component';

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
    ContentWritingUiComponent,
    ContentWritingHistoryComponent,
    LoginComponent,
    SignupComponent,
    HomePresentationComponent,
    PrivateNotepadComponent,
    DashboardTaskComponent,
    TaskProjectListComponent,
    TaskProjectBlockComponent,
    TabSectionComponent,
    CreateProjectComponent,
    ContextMenuComponent,
    StatusMenuComponent,
    StatusMenuEditDailogComponent,
    PopupHeaderComponent,
    StatusChipComponent,
    AssignMenuComponent
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
    WorkspaceComponent,
    ContentWritingUiComponent,
    ContentWritingHistoryComponent,
    LoginComponent,
    SignupComponent,
    HomePresentationComponent,
    PrivateNotepadComponent,
    DashboardTaskComponent,
    TaskProjectListComponent,
    TaskProjectBlockComponent,
    TabSectionComponent,
    CreateProjectComponent,
    ContextMenuComponent,
    StatusMenuComponent,
    StatusMenuEditDailogComponent,
    PopupHeaderComponent,
    StatusChipComponent,
    AssignMenuComponent
  ],
})
export class OneClickUiModule {}

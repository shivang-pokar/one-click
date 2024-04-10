import { Route } from '@angular/router';
import { AuthGardGuard } from './services/auth-gard/auth-gard.guard';
import { AuthSubscriptionService } from './services/auth-subscription/auth-subscription.service';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'signup',
        loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule)
    },
    {
        path: 'forgot-password',
        loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGardGuard]
    },
    {
        path: 'channels',
        loadChildren: () => import('./pages/channels/channels.module').then(m => m.ChannelsModule),
        canActivate: [AuthGardGuard]
    },
    {
        path: 'auth-channel',
        loadChildren: () => import('./pages/auth-channel/auth-channel.module').then(m => m.AuthChannelModule),
        canActivate: [AuthGardGuard]
    },
    {
        path: 'manage-account',
        loadChildren: () => import('./pages/manage-account/manage-account.module').then(m => m.ManageAccountModule),
        canActivate: [AuthGardGuard]
    },
    {
        path: 'posts',
        loadChildren: () => import('./pages/post-list/post-list.module').then(m => m.PostListModule),
        canActivate: [AuthGardGuard]
    },
    {
        path: 'post-report/:id',
        loadChildren: () => import('./pages/post-report/post-report.module').then(m => m.PostReportModule),
        canActivate: [AuthGardGuard]
    },
    {
        path: 'settings',
        loadChildren: () => import('./pages/setting/setting.module').then(m => m.SettingModule),
        canActivate: [AuthGardGuard]
    },
    // {
    //     path: 'content-writing',
    //     loadChildren: () => import('./pages/content-writing/content-writing.module').then(m => m.ContentWritingModule),
    //     canActivate: [AuthGardGuard]
    //     /* AuthSubscriptionService */
    // },
    {
        path: 'calendar',
        loadChildren: () => import('./pages/calendar/calendar.module').then(m => m.CalendarModule),
        canActivate: [AuthGardGuard]
    },
];

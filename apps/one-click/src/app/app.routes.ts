import { Route } from '@angular/router';
import { AuthGardGuard } from './services/auth-gard/auth-gard.guard';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'login',
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
        path: 'settings',
        loadChildren: () => import('./pages/setting/setting.module').then(m => m.SettingModule),
        canActivate: [AuthGardGuard]
    },
];

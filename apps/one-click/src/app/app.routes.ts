import { Route } from '@angular/router';

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
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
        path: 'channels',
        loadChildren: () => import('./pages/channels/channels.module').then(m => m.ChannelsModule)
    },
    {
        path: 'auth-channel',
        loadChildren: () => import('./pages/auth-channel/auth-channel.module').then(m => m.AuthChannelModule)
    },
    {
        path: 'manage-account',
        loadChildren: () => import('./pages/manage-account/manage-account.module').then(m => m.ManageAccountModule)
    },
];

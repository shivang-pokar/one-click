import { Route } from '@angular/router';
import { AuthGardGuard } from './services/auth-gard/auth-gard.guard';
/* import { AuthGardGuard } from './services/auth-gard/auth-gard.guard';
import { AuthSubscriptionService } from './services/auth-subscription/auth-subscription.service'; */

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
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGardGuard]
    },
    {
        path: 'projects',
        loadChildren: () => import('./pages/projects/projects.module').then(m => m.ProjectsModule),
        canActivate: [AuthGardGuard]
    },
    {
        path: 'projects/:id',
        loadChildren: () => import('./pages/project-block/project-block.module').then(m => m.ProjectBlockModule),
        canActivate: [AuthGardGuard]
    }
];

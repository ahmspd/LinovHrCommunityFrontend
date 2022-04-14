import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppMainComponent } from './app.main.component';

import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AccessComponent } from './components/access/access.component';
import { NavbarComponent } from './pages/user/navbar/navbar.component';
import { NavbarModule } from './pages/user/navbar/navbar.module';
import { RegisterComponent } from './components/register/register.component';
import { VerificationComponent } from './components/verification/verification.component';
import { ProfileForgotPasswordComponent } from './pages/user/profile/profile-forgot-password/profile-forgot-password.component';
import { AuthGuard } from './app-guard/app-guard';
import { AccessGuard } from './app-guard/access-guard';

const routes: Routes = [
    {
        path: 'role',
        component: AppMainComponent,
        loadChildren: () => import('./pages/admin/role/role.module').then(m => m.RoleModule),
        canLoad: [AuthGuard],
        canActivate: [AccessGuard]
    },
    {
        path: 'homepage',
        component: NavbarComponent,
        loadChildren: () => import('./pages/user/homepage/homepage.module').then(m => m.HomepageModule)
    },
    {
        path: 'thread',
        component: NavbarComponent,
        loadChildren: () => import('./pages/user/thread/thread.module').then(m => m.ThreadModule)
    },
    {
        path: 'user/article',
        component: NavbarComponent,
        loadChildren: () => import('./pages/user/article/article.module').then(m => m.ArticleUserModule)
    },
    {
        path: 'industry',
        component: AppMainComponent,
        loadChildren: () => import('./pages/admin/industry/industry.module').then(m => m.IndustryModule),
        canLoad: [AuthGuard],
        canActivate: [AccessGuard]
    },
    {
        path: 'position',
        component: AppMainComponent,
        loadChildren: () => import('./pages/admin/position/position.module').then(m => m.PositionModule),
        canLoad: [AuthGuard],
        canActivate: [AccessGuard]
    },
    {
        path: 'payment-method',
        component: AppMainComponent,
        loadChildren: () => import('./pages/admin/payment-method/payment-method.module').then(m => m.PaymentMethodModule),
        canLoad: [AuthGuard],
        canActivate: [AccessGuard]
    },
    {
        path: 'price-type',
        component: AppMainComponent,
        loadChildren: () => import('./pages/admin/price-type/price-type.module').then(m => m.PriceTypeModule),
        canLoad: [AuthGuard],
        canActivate: [AccessGuard]
    },
    {
        path: 'price-list',
        component: AppMainComponent,
        loadChildren: () => import('./pages/admin/price-list/price-list.module').then(m => m.PriceListModule),
        canLoad: [AuthGuard],
        canActivate: [AccessGuard]
    },
    {
        path: 'thread-type',
        component: AppMainComponent,
        loadChildren: () => import('./pages/admin/thread-type/thread-type.module').then(m => m.ThreadTypeModule),
        canLoad: [AuthGuard],
        canActivate: [AccessGuard]
    },
    {
        path: 'category',
        component: AppMainComponent,
        loadChildren: () => import('./pages/admin/category/category.module').then(m => m.CategoryModule),
        canLoad: [AuthGuard],
        canActivate: [AccessGuard]
    },
    {
        path: 'event-course',
        component: NavbarComponent,
        loadChildren: () => import('./pages/user/event-course/event-course.module').then(m => m.EventCourseModule),
    },
    {
        path: 'article',
        component: AppMainComponent,
        loadChildren: () => import('./pages/admin/article/article.module').then(m => m.ArticleModule),
        canLoad: [AuthGuard],
        canActivate: [AccessGuard]
    },
    {
        path: 'user/setting',
        component: NavbarComponent,
        loadChildren: () => import('./pages/user/profile/profile.module').then(m => m.ProfileModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'admin/event-course',
        component: AppMainComponent,
        loadChildren: () => import('./pages/admin/event-course-admin/event-course-admin.module').then(m => m.EventCourseAdminModule),
        canLoad: [AuthGuard],
        canActivate: [AccessGuard]
    },
    {
        path: 'admin/user-member',
        component: AppMainComponent,
        loadChildren: () => import('./pages/admin/user-member-admin/user-member-admin.module').then(m => m.UserMemberAdminModule),
        canLoad: [AuthGuard],
        canActivate: [AccessGuard]
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: AppMainComponent,
        loadChildren: () => import('./pages/admin/dashboard/dashboard.module').then(m=>m.DashboardModule),
        canLoad: [AuthGuard],
        canActivate: [AccessGuard]
    },
    // {
    //     path: '', component: AppMainComponent,
    //     children: [
    //         { path: 'dashboard', component: DashboardComponent, canLoad: [AuthGuard] },
    //     ],
    //     canLoad: [AuthGuard],
    // },
    { 
        path: 'login', 
        component: LoginComponent },
    { 
        path: 'register', 
        component: RegisterComponent },
    { 
        path: 'verification/:id', 
        component: VerificationComponent },
    { 
        path: 'pages/error', 
        component: ErrorComponent },
    { 
        path: 'pages/notfound', 
        component: NotfoundComponent },
    { 
        path: 'pages/access', 
        component: AccessComponent }, 
    {
        path: 'forgot-password',
        component: ProfileForgotPasswordComponent
    },
    { path: '**', redirectTo: 'pages/notfound' }
]


@NgModule({
    imports: [
        RouterModule.forRoot(routes,
            { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
        NavbarModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

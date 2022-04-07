import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormLayoutComponent } from './components/formlayout/formlayout.component';
import { PanelsComponent } from './components/panels/panels.component';
import { OverlaysComponent } from './components/overlays/overlays.component';
import { MediaComponent } from './components/media/media.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MiscComponent } from './components/misc/misc.component';
import { EmptyComponent } from './components/empty/empty.component';
import { ChartsComponent } from './components/charts/charts.component';
import { FileComponent } from './components/file/file.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { AppMainComponent } from './app.main.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { TableComponent } from './components/table/table.component';
import { ListComponent } from './components/list/list.component';
import { TreeComponent } from './components/tree/tree.component';
import { CrudComponent } from './components/crud/crud.component';
import { BlocksComponent } from './components/blocks/blocks.component';
import { FloatLabelComponent } from './components/floatlabel/floatlabel.component';
import { InvalidStateComponent } from './components/invalidstate/invalidstate.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { IconsComponent } from './components/icons/icons.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AccessComponent } from './components/access/access.component';
import { NavbarComponent } from './pages/user/navbar/navbar.component';
import { NavbarModule } from './pages/user/navbar/navbar.module';
import { RegisterComponent } from './components/register/register.component';
import { VerificationComponent } from './components/verification/verification.component';

const routes: Routes = [
    {
        path: 'role',
        component: AppMainComponent,
        loadChildren: () => import('./pages/admin/role/role.module').then(m => m.RoleModule)
    },
    {
        path: 'homepage',
        component : NavbarComponent,
        loadChildren: () => import('./pages/user/homepage/homepage.module').then(m => m.HomepageModule)
    },
    {
        path: 'thread',
        component : NavbarComponent,
        loadChildren: () => import('./pages/user/thread/thread.module').then(m => m.ThreadModule)
    },
    {
        path: 'user/article',
        component : NavbarComponent,
        loadChildren: () => import('./pages/user/article/article.module').then(m=>m.ArticleUserModule)
    },
    {
        path: 'industry',
        component: AppMainComponent,
        loadChildren: () => import('./pages/admin/industry/industry.module').then(m => m.IndustryModule)
    },
    {
        path: 'position',
        component: AppMainComponent,
        loadChildren: () => import('./pages/admin/position/position.module').then(m => m.PositionModule)
    },
    {
        path: 'payment-method',
        component: AppMainComponent,
        loadChildren: () => import('./pages/admin/payment-method/payment-method.module').then(m => m.PaymentMethodModule)
    },
    {
        path: 'price-type',
        component: AppMainComponent,
        loadChildren: () => import('./pages/admin/price-type/price-type.module').then(m => m.PriceTypeModule)
    },
    {
        path: 'price-list',
        component: AppMainComponent,
        loadChildren: () =>import('./pages/admin/price-list/price-list.module').then(m => m.PriceListModule)
    },
    {
        path: 'thread-type',
        component: AppMainComponent,
        loadChildren: () =>import('./pages/admin/thread-type/thread-type.module').then(m =>m.ThreadTypeModule)
    },
    {
        path: 'category',
        component: AppMainComponent,
        loadChildren: () => import('./pages/admin/category/category.module').then(m => m.CategoryModule)
    },
    {
        path: 'event-course',
        component: NavbarComponent,
        loadChildren: () => import('./pages/user/event-course/event-course.module').then(m => m.EventCourseModule)
    },
    {
        path: 'article',
        component: AppMainComponent,
        loadChildren: () => import('./pages/admin/article/article.module').then(m=>m.ArticleModule)
    },
    {
        path: 'user/setting',
        component: NavbarComponent,
        loadChildren: () => import('./pages/user/profile/profile.module').then(m=>m.ProfileModule)
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
            path: '', component: AppMainComponent,
            children: [
                { path: 'dashboard', component: DashboardComponent },
                { path: 'uikit/formlayout', component: FormLayoutComponent },
                { path: 'uikit/input', component: InputComponent },
                { path: 'uikit/floatlabel', component: FloatLabelComponent },
                { path: 'uikit/invalidstate', component: InvalidStateComponent },
                { path: 'uikit/button', component: ButtonComponent },
                { path: 'uikit/table', component: TableComponent },
                { path: 'uikit/list', component: ListComponent },
                { path: 'uikit/tree', component: TreeComponent },
                { path: 'uikit/panel', component: PanelsComponent },
                { path: 'uikit/overlay', component: OverlaysComponent },
                { path: 'uikit/media', component: MediaComponent },
                { path: 'uikit/menu', loadChildren: () => import('./components/menus/menus.module').then(m => m.MenusModule) },
                { path: 'uikit/message', component: MessagesComponent },
                { path: 'uikit/misc', component: MiscComponent },
                { path: 'uikit/charts', component: ChartsComponent },
                { path: 'uikit/file', component: FileComponent },
                { path: 'pages/crud', component: CrudComponent },
                { path: 'pages/timeline', component: TimelineComponent },
                { path: 'pages/empty', component: EmptyComponent },
                { path: 'icons', component: IconsComponent },
                { path: 'blocks', component: BlocksComponent },
                { path: 'documentation', component: DocumentationComponent }
            ],
        },
        { path: 'pages/landing', component: LandingComponent },
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'verification/:id', component: VerificationComponent },
        { path: 'pages/error', component: ErrorComponent },
        { path: 'pages/notfound', component: NotfoundComponent },
        { path: 'pages/access', component: AccessComponent },
        { path: '**', redirectTo: 'pages/notfound' },
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

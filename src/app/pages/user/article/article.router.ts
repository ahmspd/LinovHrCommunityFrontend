import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArticleUserDetailComponent } from "./article-user-detail/article-user-detail.component";
import { ArticleUserListComponent } from "./article-user-list/article-user-list.component";
import { ArticleUserSaveComponent } from "./article-user-save/article-user-save.component";
const routes: Routes = [
    {
        path: 'list',
        component: ArticleUserListComponent
    },
    {
        path: 'new',
        component: ArticleUserSaveComponent
    },
    {
        path: 'detail',
        component: ArticleUserDetailComponent
    }
]
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ArticleUserRouter{}
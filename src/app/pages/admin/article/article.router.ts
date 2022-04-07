import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArticleEditComponent } from "./article-edit/article-edit.component";
import { ArticleListNotAcceptComponent } from "./article-list-not-accept/article-list-not-accept.component";
import { ArticleListComponent } from "./article-list/article-list.component";
import { ArticleNewComponent } from "./article-new/article-new.component";
const routes: Routes = [
    {
        path: 'list',
        component: ArticleListComponent
    }, 
    {
        path: 'new',
        component: ArticleNewComponent
    },
    {
        path: ':id',
        component:  ArticleEditComponent
    },
    {
        path:'not-accept',
        component: ArticleListNotAcceptComponent
    },
]
@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ArticleRouter{}
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArticleEditComponent } from "./article-edit/article-edit.component";
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
    }
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
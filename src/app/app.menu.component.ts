import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-menu-container">
            <ul class="layout-menu" role="menu" (keydown)="onKeydown($event)">
                <li app-menu class="layout-menuitem-category" *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true" role="none">
                    <div class="layout-menuitem-root-text" [attr.aria-label]="item.label">{{item.label}}</div>
                    <ul role="menu">
                        <li app-menuitem *ngFor="let child of item.items" [item]="child" [index]="i" role="none"></li>
                    </ul>
                </li>
            </ul>
        </div>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public appMain: AppMainComponent) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items:[
                    {label: 'Dashboard',icon: 'pi pi-fw pi-home', routerLink: ['/dashboard/admin']}
                ]
            },
            {
                label: 'Master',
                items: [
                    {label: 'Role', icon: 'pi pi-fw pi-users', routerLink: ['/role/list']},
                    {label: 'Industry', icon: 'pi pi-fw pi-building', routerLink: ['/industry/list']},
                    {label: 'Position', icon: 'pi pi-fw pi-id-card', routerLink: ['/position/list']},
                    {label: 'Payment Method', icon: 'pi pi-fw pi-wallet', routerLink: ['/payment-method/list']},
                    {label: 'Price Type', icon: 'pi pi-fw pi-credit-card', routerLink: ['/price-type/list']},
                    {label: 'Price List', icon: 'pi pi-fw pi-money-bill', routerLink: ['/price-list/list']},
                    {label: 'Thread Type', icon: 'pi pi-fw pi-clone', routerLink: ['/thread-type/list']},
                    {label: 'Category', icon: 'pi pi-fw pi-list', routerLink: ['/category/list']}
                ]
            },
            {
                label: 'Transaksi',
                items: [
                    {label: 'Article', icon: 'pi pi-fw pi-server', routerLink: ['/article/list']},
                    {label: 'Event Course', icon: 'pi pi-fw pi-check-square', routerLink: ['/admin/event-course/confirmation']},
                    {label: 'User Member', icon: 'pi pi-fw pi-users', routerLink: ['/admin/user-member/list']}
                ]
            },
            {
                label: 'Report',
                items: [
                    {label: 'Event Course User', icon: 'pi pi-fw pi-file', routerLink: ['/admin/event-course/report/join']},
                    {label: 'Event Course Payment', icon: 'pi pi-fw pi-file', routerLink: ['/admin/event-course/report/payment']},
                ]
            },
        ];
    }

    onKeydown(event: KeyboardEvent) {
        const nodeElement = (<HTMLDivElement> event.target);
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }
}

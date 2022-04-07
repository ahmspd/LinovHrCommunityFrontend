import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleUserListComponent } from './article-user-list.component';

describe('ArticleUserListComponent', () => {
  let component: ArticleUserListComponent;
  let fixture: ComponentFixture<ArticleUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleUserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

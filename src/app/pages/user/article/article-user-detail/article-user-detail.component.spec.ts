import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleUserDetailComponent } from './article-user-detail.component';

describe('ArticleUserDetailComponent', () => {
  let component: ArticleUserDetailComponent;
  let fixture: ComponentFixture<ArticleUserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleUserDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleUserSaveComponent } from './article-user-save.component';

describe('ArticleUserSaveComponent', () => {
  let component: ArticleUserSaveComponent;
  let fixture: ComponentFixture<ArticleUserSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleUserSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleUserSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

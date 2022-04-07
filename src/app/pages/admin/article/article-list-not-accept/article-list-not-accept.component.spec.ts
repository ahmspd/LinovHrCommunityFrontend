import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleListNotAcceptComponent } from './article-list-not-accept.component';

describe('ArticleListNotAcceptComponent', () => {
  let component: ArticleListNotAcceptComponent;
  let fixture: ComponentFixture<ArticleListNotAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleListNotAcceptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleListNotAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

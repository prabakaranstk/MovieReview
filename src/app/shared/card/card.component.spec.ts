import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <app-card>
      <h2 card-title>Title</h2>
      <p>Content</p>
    </app-card>
  `
})
class TestHostComponent {}

describe('CardComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent, TestHostComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should project card-title content', () => {
    const titleElement = fixture.debugElement.query(By.css('[card-title]')).nativeElement;
    expect(titleElement.textContent).toContain('Title');
  });

  it('should project card body content', () => {
    const contentElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(contentElement.textContent).toContain('Content');
  });
});

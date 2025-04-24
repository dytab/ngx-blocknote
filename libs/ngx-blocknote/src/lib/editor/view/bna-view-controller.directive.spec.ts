import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBlockNoteTestingModule } from '../../services';

@Component({
  standalone: true,
  template: `<div bna-view-controller></div>`,
  imports: [],
})
class TestHostComponent {}

describe('BnaViewControllerDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let bnaViewController: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, NgxBlockNoteTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    bnaViewController = fixture.nativeElement.querySelector(
      'bna-view-controller',
    );
  });

  it('should create an instance', () => {
    expect(bnaViewController).toBeDefined();
  });
});

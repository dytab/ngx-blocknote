import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBlockNoteTestingModule } from '@dytab/ngx-blocknote';
import { BnaViewControllerDirective } from './bna-view-controller.directive';

@Component({
  standalone: true,
  template: ` <bna-view-controller />`,
  imports: [BnaViewControllerDirective],
})
class TestHostComponent {}

describe('BnaViewControllerDirective', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let bnaViewController: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, NgxBlockNoteTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    bnaViewController = fixture.nativeElement.querySelector(
      'bna-view-controller'
    );
  });

  it('should create an instance', () => {
    expect(bnaViewController).toBeDefined(); // myDirective is assumed to be a property set by the directive
  });
});

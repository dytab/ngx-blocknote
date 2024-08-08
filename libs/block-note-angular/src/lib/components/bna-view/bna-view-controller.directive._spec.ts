import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BnaViewControllerDirective } from './bna-view-controller.directive';

describe('BlockNoteViewDirective', () => {
  let component: BnaViewControllerDirective;
  let fixture: ComponentFixture<BnaViewControllerDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaViewControllerDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaViewControllerDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

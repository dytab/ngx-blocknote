import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BnaViewDirective } from './bna-view.directive';

describe('BlockNoteViewDirective', () => {
  let component: BnaViewDirective;
  let fixture: ComponentFixture<BnaViewDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaViewDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaViewDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

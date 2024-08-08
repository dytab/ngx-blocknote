import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BnaBasicTextStyleButtonComponent } from './bna-basic-text-style-button.component';

describe('BnaBasicTextStyleButtonComponent', () => {
  let component: BnaBasicTextStyleButtonComponent;
  let fixture: ComponentFixture<BnaBasicTextStyleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaBasicTextStyleButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaBasicTextStyleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

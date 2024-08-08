import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BnaTextAlignButtonComponent } from './bna-text-align-button.component';

describe('TextAlignButtonComponent', () => {
  let component: BnaTextAlignButtonComponent;
  let fixture: ComponentFixture<BnaTextAlignButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaTextAlignButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaTextAlignButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

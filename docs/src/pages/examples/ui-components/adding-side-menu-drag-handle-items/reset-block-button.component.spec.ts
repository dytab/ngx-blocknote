import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetBlockButtonComponent } from './reset-block-button.component';

describe('RemoveBlockButtonComponent', () => {
  let component: ResetBlockButtonComponent;
  let fixture: ComponentFixture<ResetBlockButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetBlockButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetBlockButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

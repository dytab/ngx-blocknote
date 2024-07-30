import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextAlignButtonComponent } from './text-align-button.component';

describe('TextAlignButtonComponent', () => {
  let component: TextAlignButtonComponent;
  let fixture: ComponentFixture<TextAlignButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextAlignButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextAlignButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

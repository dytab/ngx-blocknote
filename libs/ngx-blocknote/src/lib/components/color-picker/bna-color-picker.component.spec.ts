import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BnaColorPickerComponent } from './bna-color-picker.component';

describe('BnaColorPickerComponent', () => {
  let component: BnaColorPickerComponent;
  let fixture: ComponentFixture<BnaColorPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaColorPickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

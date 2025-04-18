import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBlockNoteTestingModule } from '../../services/ngx-blocknote-testing.module';
import { BnaColorPickerComponent } from './bna-color-picker.component';

describe('BnaColorPickerComponent', () => {
  let component: BnaColorPickerComponent;
  let fixture: ComponentFixture<BnaColorPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaColorPickerComponent, NgxBlockNoteTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaColorPickerComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', {});

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBlockNoteTestingModule } from '../../../../services';
import { BnaColorStyleButtonComponent } from './bna-color-style-button.component';

describe('BnaColorStyleButtonComponent', () => {
  let component: BnaColorStyleButtonComponent;
  let fixture: ComponentFixture<BnaColorStyleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaColorStyleButtonComponent, NgxBlockNoteTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaColorStyleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

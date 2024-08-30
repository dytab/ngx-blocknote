import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBlockNoteTestingModule } from '../../../../services';
import { BnaTextAlignButtonComponent } from './bna-text-align-button.component';

describe('TextAlignButtonComponent', () => {
  let component: BnaTextAlignButtonComponent;
  let fixture: ComponentFixture<BnaTextAlignButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaTextAlignButtonComponent, NgxBlockNoteTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaTextAlignButtonComponent);
    fixture.componentRef.setInput('alignment', 'left');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

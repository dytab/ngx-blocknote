import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBlockNoteTestingModule } from '../../../../services';
import { BnaBasicTextStyleButtonComponent } from './bna-basic-text-style-button.component';

describe('BnaBasicTextStyleButtonComponent', () => {
  let component: BnaBasicTextStyleButtonComponent;
  let fixture: ComponentFixture<BnaBasicTextStyleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaBasicTextStyleButtonComponent, NgxBlockNoteTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaBasicTextStyleButtonComponent);
    fixture.componentRef.setInput('basicTextStyle', 'bold');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

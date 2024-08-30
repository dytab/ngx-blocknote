import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBlockNoteTestingModule } from '../../../../../services';
import { BnaDeleteButtonComponent } from './bna-delete-button.component';

describe('BnaDeleteButtonComponent', () => {
  let component: BnaDeleteButtonComponent;
  let fixture: ComponentFixture<BnaDeleteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaDeleteButtonComponent, NgxBlockNoteTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaDeleteButtonComponent);
    fixture.componentRef.setInput('options', {});
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

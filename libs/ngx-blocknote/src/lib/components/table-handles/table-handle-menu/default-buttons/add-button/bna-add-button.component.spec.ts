import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBlockNoteTestingModule } from '../../../../../services';
import { BnaAddButtonComponent } from './bna-add-button.component';

describe('BnaDeleteButtonComponent', () => {
  let component: BnaAddButtonComponent;
  let fixture: ComponentFixture<BnaAddButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaAddButtonComponent, NgxBlockNoteTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaAddButtonComponent);
    fixture.componentRef.setInput('options', {});
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

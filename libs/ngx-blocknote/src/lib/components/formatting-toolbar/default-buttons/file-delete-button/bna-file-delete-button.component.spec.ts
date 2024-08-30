import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBlockNoteTestingModule } from '../../../../services';
import { BnaFileDeleteButtonComponent } from './bna-file-delete-button.component';

describe('BnaFileDeleteButtonComponent', () => {
  let component: BnaFileDeleteButtonComponent;
  let fixture: ComponentFixture<BnaFileDeleteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaFileDeleteButtonComponent, NgxBlockNoteTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaFileDeleteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

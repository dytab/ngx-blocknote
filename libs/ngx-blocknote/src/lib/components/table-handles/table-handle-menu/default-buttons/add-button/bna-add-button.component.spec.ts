import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBlockNoteTestingModule } from '../../../../../services';
import { BnaAddButtonComponent } from './bna-add-button.component';

describe('BnaAddButtonComponent', () => {
  let component: BnaAddButtonComponent;
  let fixture: ComponentFixture<BnaAddButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaAddButtonComponent, NgxBlockNoteTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaAddButtonComponent);
    fixture.componentRef.setInput('options', {
      tableHandles: {
        block: {}, // Minimales Mock-Objekt für block
        rowIndex: 0,
        colIndex: 0,
      },
      closeMenu: vi.fn(),
      showOtherHandle: vi.fn(),
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

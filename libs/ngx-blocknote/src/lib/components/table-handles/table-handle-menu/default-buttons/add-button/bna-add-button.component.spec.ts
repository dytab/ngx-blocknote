import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBlockNoteTestingModule } from '../../../../../services';
import { BnaAddButtonComponent } from './bna-add-button.component';

describe('BnaAddButtonComponent', () => {
  let component: BnaAddButtonComponent;
  let fixture: ComponentFixture<BnaAddButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // BrowserModule wird oft nicht benötigt in Unit Tests und kann Konflikte verursachen
        // BnaAddButtonComponent ist standalone (vermutlich), also hier importieren
        BnaAddButtonComponent,
        NgxBlockNoteTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaAddButtonComponent);
    // Inputs setzen BEVOR detectChanges aufgerufen wird, besonders bei required inputs
    fixture.componentRef.setInput('options', {
      tableHandles: {
        block: {}, // Minimales Mock-Objekt für block
        rowIndex: 0,
        colIndex: 0,
      },
      closeMenu: jest.fn(),
      showOtherHandle: jest.fn(),
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

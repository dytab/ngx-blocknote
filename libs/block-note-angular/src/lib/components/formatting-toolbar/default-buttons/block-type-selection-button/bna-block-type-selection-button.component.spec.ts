import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BnaBlockTypeSelectionButtonComponent } from './bna-block-type-selection-button.component';

describe('BnaBlockTypeSelectionButtonComponent', () => {
  let component: BnaBlockTypeSelectionButtonComponent;
  let fixture: ComponentFixture<BnaBlockTypeSelectionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaBlockTypeSelectionButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaBlockTypeSelectionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

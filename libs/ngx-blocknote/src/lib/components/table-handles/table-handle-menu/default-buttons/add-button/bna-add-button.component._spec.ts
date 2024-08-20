import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockNoteAngularService } from '../../../../../services';
import { BnaAddButtonComponent } from './bna-add-button.component';

describe('BnaDeleteButtonComponent', () => {
  let component: BnaAddButtonComponent;
  let fixture: ComponentFixture<BnaAddButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaAddButtonComponent],
      providers: [BlockNoteAngularService],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockNoteAngularService } from '../../../../../services';
import { BnaDeleteButtonComponent } from './bna-delete-button.component';

describe('BnaDeleteButtonComponent', () => {
  let component: BnaDeleteButtonComponent;
  let fixture: ComponentFixture<BnaDeleteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaDeleteButtonComponent],
      providers: [BlockNoteAngularService],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaDeleteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

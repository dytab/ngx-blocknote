import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BnaFileDeleteButtonComponent } from './bna-file-delete-button.component';

describe('BnaFileDeleteButtonComponent', () => {
  let component: BnaFileDeleteButtonComponent;
  let fixture: ComponentFixture<BnaFileDeleteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaFileDeleteButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaFileDeleteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

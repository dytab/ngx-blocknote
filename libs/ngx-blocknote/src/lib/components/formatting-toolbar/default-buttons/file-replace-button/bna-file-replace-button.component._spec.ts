import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BnaFileReplaceButtonComponent } from './bna-file-replace-button.component';

describe('BnaFileReplaceButtonComponent', () => {
  let component: BnaFileReplaceButtonComponent;
  let fixture: ComponentFixture<BnaFileReplaceButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaFileReplaceButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaFileReplaceButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

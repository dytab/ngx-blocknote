import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BnaFileRenameButtonComponent } from './bna-file-rename-button.component';

describe('BnaFileRenameButtonComponent', () => {
  let component: BnaFileRenameButtonComponent;
  let fixture: ComponentFixture<BnaFileRenameButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaFileRenameButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaFileRenameButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

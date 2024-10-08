import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBlockNoteTestingModule } from '../../../../services';
import { BnaFilePreviewButtonComponent } from './bna-file-preview-button.component';

describe('BnaFilePreviewButtonComponent', () => {
  let component: BnaFilePreviewButtonComponent;
  let fixture: ComponentFixture<BnaFilePreviewButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaFilePreviewButtonComponent, NgxBlockNoteTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaFilePreviewButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

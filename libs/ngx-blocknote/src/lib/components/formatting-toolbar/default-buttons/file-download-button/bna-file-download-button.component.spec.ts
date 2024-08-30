import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBlockNoteTestingModule } from '../../../../services';
import { BnaFileDownloadButtonComponent } from './bna-file-download-button.component';

describe('BnaFileDownloadButtonComponent', () => {
  let component: BnaFileDownloadButtonComponent;
  let fixture: ComponentFixture<BnaFileDownloadButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaFileDownloadButtonComponent, NgxBlockNoteTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaFileDownloadButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

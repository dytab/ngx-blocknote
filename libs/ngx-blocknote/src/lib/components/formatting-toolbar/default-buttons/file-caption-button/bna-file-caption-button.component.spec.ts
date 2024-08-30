import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBlockNoteTestingModule } from '../../../../services/ngx-blocknote-testing.module';
import { BnaFileCaptionButtonComponent } from './bna-file-caption-button.component';

describe('BnaFileCaptionButtonComponent', () => {
  let component: BnaFileCaptionButtonComponent;
  let fixture: ComponentFixture<BnaFileCaptionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaFileCaptionButtonComponent, NgxBlockNoteTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaFileCaptionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBlockNoteTestingModule } from '../../../../services';
import { BnaFileReplaceButtonComponent } from './bna-file-replace-button.component';

describe('BnaFileReplaceButtonComponent', () => {
  let component: BnaFileReplaceButtonComponent;
  let fixture: ComponentFixture<BnaFileReplaceButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaFileReplaceButtonComponent, NgxBlockNoteTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaFileReplaceButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

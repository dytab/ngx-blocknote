import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBlockNoteTestingModule } from '../../../../services';
import { BnaAddBlockButtonComponent } from './bna-add-block-button.component';

describe('AddBlockButtonComponent', () => {
  let component: BnaAddBlockButtonComponent;
  let fixture: ComponentFixture<BnaAddBlockButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaAddBlockButtonComponent, NgxBlockNoteTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaAddBlockButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

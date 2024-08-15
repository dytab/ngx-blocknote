import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockNoteAngularService } from '../../../services';
import { BnaTableHandleComponent } from './bna-table-handle.component';

describe('BnaTableHandleComponent', () => {
  let component: BnaTableHandleComponent;
  let fixture: ComponentFixture<BnaTableHandleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaTableHandleComponent],
      providers: [BlockNoteAngularService],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaTableHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

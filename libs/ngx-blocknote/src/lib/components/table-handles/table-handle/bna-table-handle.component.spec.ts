import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBlockNoteTestingModule } from '../../../services';
import { BnaTableHandleComponent } from './bna-table-handle.component';

describe('BnaTableHandleComponent', () => {
  let component: BnaTableHandleComponent;
  let fixture: ComponentFixture<BnaTableHandleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaTableHandleComponent, NgxBlockNoteTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaTableHandleComponent);
    fixture.componentRef.setInput('options', {});
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBlockNoteTestingModule } from '../../../services';
import { BnaTableHandleMenuComponent } from './bna-table-handle-menu.component';

describe('BnaTableHandleMenuComponent', () => {
  let component: BnaTableHandleMenuComponent;
  let fixture: ComponentFixture<BnaTableHandleMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaTableHandleMenuComponent, NgxBlockNoteTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaTableHandleMenuComponent);
    fixture.componentRef.setInput('options', {});
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

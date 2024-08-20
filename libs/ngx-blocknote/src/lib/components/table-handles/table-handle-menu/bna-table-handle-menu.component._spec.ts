import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockNoteAngularService } from '../../../services/block-note-angular.service';
import { BnaTableHandleMenuComponent } from './bna-table-handle-menu.component';

describe('BnaTableHandleMenuComponent', () => {
  let component: BnaTableHandleMenuComponent;
  let fixture: ComponentFixture<BnaTableHandleMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaTableHandleMenuComponent],
      providers: [BlockNoteAngularService],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaTableHandleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

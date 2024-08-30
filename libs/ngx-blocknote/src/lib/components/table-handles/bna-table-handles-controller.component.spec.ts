import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBlockNoteTestingModule } from '../../services';
import { BnaTableHandlesController } from './bna-table-handles-controller.component';

describe('BnaTableHandlesController', () => {
  let component: BnaTableHandlesController;
  let fixture: ComponentFixture<BnaTableHandlesController>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaTableHandlesController, NgxBlockNoteTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaTableHandlesController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

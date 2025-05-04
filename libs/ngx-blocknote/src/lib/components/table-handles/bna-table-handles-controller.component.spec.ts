import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBlockNoteTestingModule } from '../../services';
import { BnaTableHandlesControllerComponent } from './bna-table-handles-controller.component';

describe('BnaTableHandlesController', () => {
  let component: BnaTableHandlesControllerComponent;
  let fixture: ComponentFixture<BnaTableHandlesControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaTableHandlesControllerComponent, NgxBlockNoteTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaTableHandlesControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

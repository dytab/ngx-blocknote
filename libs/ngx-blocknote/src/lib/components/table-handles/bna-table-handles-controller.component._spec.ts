import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BnaTableHandlesController } from './bna-table-handles-controller.component';

describe('BnaTableHandlesController', () => {
  let component: BnaTableHandlesController;
  let fixture: ComponentFixture<BnaTableHandlesController>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaTableHandlesController],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaTableHandlesController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

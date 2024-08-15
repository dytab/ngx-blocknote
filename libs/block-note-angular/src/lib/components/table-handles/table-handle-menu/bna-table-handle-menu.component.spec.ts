import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BnaTableHandleMenuComponent } from './bna-table-handle-menu.component';

describe('BnaTableHandleMenuComponent', () => {
  let component: BnaTableHandleMenuComponent;
  let fixture: ComponentFixture<BnaTableHandleMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaTableHandleMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaTableHandleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

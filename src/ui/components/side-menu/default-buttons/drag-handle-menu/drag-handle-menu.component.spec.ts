import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DragHandleMenuComponent } from './drag-handle-menu.component';

describe('DragHandleMenuComponent', () => {
  let component: DragHandleMenuComponent;
  let fixture: ComponentFixture<DragHandleMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragHandleMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DragHandleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

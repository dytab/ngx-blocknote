import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddBlockButtonComponent } from './add-block-button.component';

describe('AddBlockButtonComponent', () => {
  let component: AddBlockButtonComponent;
  let fixture: ComponentFixture<AddBlockButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBlockButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddBlockButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

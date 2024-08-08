import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveBlockButtonComponent } from './remove-block-button.component';

describe('RemoveBlockButtonComponent', () => {
  let component: RemoveBlockButtonComponent;
  let fixture: ComponentFixture<RemoveBlockButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveBlockButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveBlockButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

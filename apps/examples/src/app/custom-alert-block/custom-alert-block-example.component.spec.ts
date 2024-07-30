import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomAlertBlockExampleComponent } from './custom-alert-block-example.component';

describe('CustomBlockExampleComponent', () => {
  let component: CustomAlertBlockExampleComponent;
  let fixture: ComponentFixture<CustomAlertBlockExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomAlertBlockExampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomAlertBlockExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

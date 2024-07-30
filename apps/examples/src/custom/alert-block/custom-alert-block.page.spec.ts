import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomAlertBlockPage } from './custom-alert-block.page';

describe('CustomBlockExampleComponent', () => {
  let component: CustomAlertBlockPage;
  let fixture: ComponentFixture<CustomAlertBlockPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomAlertBlockPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomAlertBlockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

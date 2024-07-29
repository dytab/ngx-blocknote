import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomBlockExampleComponent } from './custom-block-example.component';

describe('CustomBlockExampleComponent', () => {
  let component: CustomBlockExampleComponent;
  let fixture: ComponentFixture<CustomBlockExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomBlockExampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomBlockExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

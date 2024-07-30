import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicTextStyleButtonComponent } from './basic-text-style-button.component';

describe('BnaBasicTextStyleButtonComponent', () => {
  let component: BasicTextStyleButtonComponent;
  let fixture: ComponentFixture<BasicTextStyleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicTextStyleButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicTextStyleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

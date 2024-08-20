import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BnaColorIconComponent } from './bna-color-icon.component';

describe('BnaColorIconComponent', () => {
  let component: BnaColorIconComponent;
  let fixture: ComponentFixture<BnaColorIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaColorIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaColorIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

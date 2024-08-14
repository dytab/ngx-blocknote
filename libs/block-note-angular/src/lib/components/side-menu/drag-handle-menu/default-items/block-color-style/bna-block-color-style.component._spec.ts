import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BnaBlockColorStyleComponent } from './bna-block-color-style.component';

describe('BnaBlockColorStyleComponent', () => {
  let component: BnaBlockColorStyleComponent;
  let fixture: ComponentFixture<BnaBlockColorStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaBlockColorStyleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaBlockColorStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

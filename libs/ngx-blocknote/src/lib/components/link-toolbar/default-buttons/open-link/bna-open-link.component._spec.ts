import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BnaOpenLinkComponent } from './bna-open-link.component';

describe('BnaOpenLinkComponent', () => {
  let component: BnaOpenLinkComponent;
  let fixture: ComponentFixture<BnaOpenLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaOpenLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaOpenLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

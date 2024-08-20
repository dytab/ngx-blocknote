import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BnaLinkToolbarComponent } from './link-toolbar.component';

describe('BnaLinkToolbarComponent', () => {
  let component: BnaLinkToolbarComponent;
  let fixture: ComponentFixture<BnaLinkToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaLinkToolbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaLinkToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BnaEditLinkButtonComponent } from './bna-edit-link-button.component';

describe('BnaEditLinkButtonComponent', () => {
  let component: BnaEditLinkButtonComponent;
  let fixture: ComponentFixture<BnaEditLinkButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaEditLinkButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaEditLinkButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

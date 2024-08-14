import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BnaDeleteLinkComponent } from './bna-delete-link.component';

describe('BnaDeleteLinkComponent', () => {
  let component: BnaDeleteLinkComponent;
  let fixture: ComponentFixture<BnaDeleteLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaDeleteLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaDeleteLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

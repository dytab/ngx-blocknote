import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BnaSideMenuComponent } from './bna-side-menu.component';

describe('SideMenuComponent', () => {
  let component: BnaSideMenuComponent;
  let fixture: ComponentFixture<BnaSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaSideMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

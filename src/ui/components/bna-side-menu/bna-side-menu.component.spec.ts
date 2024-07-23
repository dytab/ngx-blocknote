import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BnaSideMenuDirective } from './bna-side-menu.directive';

describe('BlockNoteSideMenuComponent', () => {
  let component: BnaSideMenuDirective;
  let fixture: ComponentFixture<BnaSideMenuDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaSideMenuDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaSideMenuDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

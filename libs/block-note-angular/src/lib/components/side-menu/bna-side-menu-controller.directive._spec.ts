import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BnaSideMenuControllerDirective } from './bna-side-menu-controller.directive';

describe('BlockNoteSideMenuComponent', () => {
  let component: BnaSideMenuControllerDirective;
  let fixture: ComponentFixture<BnaSideMenuControllerDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaSideMenuControllerDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaSideMenuControllerDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BnaSideMenuControllerComponent } from './bna-side-menu-controller.component';

describe('BlockNoteSideMenuComponent', () => {
  let component: BnaSideMenuControllerComponent;
  let fixture: ComponentFixture<BnaSideMenuControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaSideMenuControllerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaSideMenuControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

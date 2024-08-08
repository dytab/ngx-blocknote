import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BnaSuggestionsMenuControllerDirective } from './bna-suggestions-menu-controller.directive';

describe('BlockNoteSuggestionsMenuComponent', () => {
  let component: BnaSuggestionsMenuControllerDirective;
  let fixture: ComponentFixture<BnaSuggestionsMenuControllerDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaSuggestionsMenuControllerDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaSuggestionsMenuControllerDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

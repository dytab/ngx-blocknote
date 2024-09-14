import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BnaSuggestionsMenuControllerComponent } from './bna-suggestions-menu-controller.component';

describe('BlockNoteSuggestionsMenuComponent', () => {
  let component: BnaSuggestionsMenuControllerComponent;
  let fixture: ComponentFixture<BnaSuggestionsMenuControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaSuggestionsMenuControllerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaSuggestionsMenuControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

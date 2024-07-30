import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BnaSuggestionsMenuDirective } from './bna-suggestions-menu.directive';

describe('BlockNoteSuggestionsMenuComponent', () => {
  let component: BnaSuggestionsMenuDirective;
  let fixture: ComponentFixture<BnaSuggestionsMenuDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaSuggestionsMenuDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaSuggestionsMenuDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

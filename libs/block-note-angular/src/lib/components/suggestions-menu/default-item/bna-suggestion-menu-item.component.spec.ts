import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BnaSuggestionMenuItemComponent } from './bna-suggestion-menu-item.component';

describe('BnaSuggestionMenuItemComponent', () => {
  let component: BnaSuggestionMenuItemComponent;
  let fixture: ComponentFixture<BnaSuggestionMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaSuggestionMenuItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaSuggestionMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BnaSuggestionsMenuComponent } from './bna-suggestions-menu.component';

describe('BnaSuggestionsMenuComponent', () => {
  let component: BnaSuggestionsMenuComponent;
  let fixture: ComponentFixture<BnaSuggestionsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaSuggestionsMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaSuggestionsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

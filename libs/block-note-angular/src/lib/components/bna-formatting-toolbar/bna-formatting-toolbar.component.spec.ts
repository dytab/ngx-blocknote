import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BnaFormattingToolbarComponent } from './bna-formatting-toolbar.component';

describe('BnaFormattingToolbarComponent', () => {
  let component: BnaFormattingToolbarComponent;
  let fixture: ComponentFixture<BnaFormattingToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaFormattingToolbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaFormattingToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

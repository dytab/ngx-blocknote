import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkToolbarComponent } from './link-toolbar.component';

describe('LinkToolbarComponent', () => {
  let component: LinkToolbarComponent;
  let fixture: ComponentFixture<LinkToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkToolbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

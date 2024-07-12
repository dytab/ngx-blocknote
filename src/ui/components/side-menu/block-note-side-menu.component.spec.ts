import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockNoteSideMenuDirective } from './block-note-side-menu.directive';

describe('BlockNoteSideMenuComponent', () => {
  let component: BlockNoteSideMenuDirective;
  let fixture: ComponentFixture<BlockNoteSideMenuDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockNoteSideMenuDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockNoteSideMenuDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

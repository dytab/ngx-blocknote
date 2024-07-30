import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicMinimalPage } from './basic-minimal.page';

describe('CustomBlockExampleComponent', () => {
  let component: BasicMinimalPage;
  let fixture: ComponentFixture<BasicMinimalPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicMinimalPage],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicMinimalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

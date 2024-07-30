import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicMinimal } from './basic-minimal.component';

describe('CustomBlockExampleComponent', () => {
  let component: BasicMinimal;
  let fixture: ComponentFixture<BasicMinimal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicMinimal],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicMinimal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

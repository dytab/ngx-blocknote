import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BnaEditorComponent } from './bna-editor.component';

describe('BnaEditorComponent', () => {
  let component: BnaEditorComponent<any, any, any>;
  let fixture: ComponentFixture<BnaEditorComponent<any, any, any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnaEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BnaEditorComponent<any, any, any>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { TestHostBlockNodeEditorComponent } from '../_usage/test-host.component';

describe('EntrySelectControl', () => {
  let component: TestHostBlockNodeEditorComponent;
  let fixture: ComponentFixture<TestHostBlockNodeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestHostBlockNodeEditorComponent,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostBlockNodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

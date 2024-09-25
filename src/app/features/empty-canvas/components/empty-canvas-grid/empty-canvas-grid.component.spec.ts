import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyCanvasGridComponent } from './empty-canvas-grid.component';

describe('EmptyCanvasGridComponent', () => {
  let component: EmptyCanvasGridComponent;
  let fixture: ComponentFixture<EmptyCanvasGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyCanvasGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyCanvasGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

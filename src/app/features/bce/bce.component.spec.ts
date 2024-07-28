import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BceComponent } from './bce.component';

describe('BceComponent', () => {
  let component: BceComponent;
  let fixture: ComponentFixture<BceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

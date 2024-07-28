import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumariaComponent } from './sumaria.component';

describe('SumariaComponent', () => {
  let component: SumariaComponent;
  let fixture: ComponentFixture<SumariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumariaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SumariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

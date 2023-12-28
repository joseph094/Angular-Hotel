import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminreservationsComponent } from './adminreservations.component';

describe('AdminreservationsComponent', () => {
  let component: AdminreservationsComponent;
  let fixture: ComponentFixture<AdminreservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminreservationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminreservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderChambersComponent } from './calender-chambers.component';

describe('CalenderChambersComponent', () => {
  let component: CalenderChambersComponent;
  let fixture: ComponentFixture<CalenderChambersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalenderChambersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalenderChambersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickCentralComponent } from './tick-central.component';

describe('TickCentralComponent', () => {
  let component: TickCentralComponent;
  let fixture: ComponentFixture<TickCentralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TickCentralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TickCentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

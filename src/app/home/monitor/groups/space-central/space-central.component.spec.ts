import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceCentralComponent } from './space-central.component';

describe('SpaceCentralComponent', () => {
  let component: SpaceCentralComponent;
  let fixture: ComponentFixture<SpaceCentralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpaceCentralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceCentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

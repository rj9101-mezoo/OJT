import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmBarComponent } from './crm-bar.component';

describe('CrmBarComponent', () => {
  let component: CrmBarComponent;
  let fixture: ComponentFixture<CrmBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

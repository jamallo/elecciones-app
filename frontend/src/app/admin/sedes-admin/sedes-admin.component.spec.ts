import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedesAdminComponent } from './sedes-admin.component';

describe('SedesAdminComponent', () => {
  let component: SedesAdminComponent;
  let fixture: ComponentFixture<SedesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SedesAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SedesAdminComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

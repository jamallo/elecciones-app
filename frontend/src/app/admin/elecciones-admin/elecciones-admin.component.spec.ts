import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleccionesAdminComponent } from './elecciones-admin.component';

describe('EleccionesAdminComponent', () => {
  let component: EleccionesAdminComponent;
  let fixture: ComponentFixture<EleccionesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EleccionesAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EleccionesAdminComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

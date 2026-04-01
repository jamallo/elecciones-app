import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidosAdminComponent } from './partidos-admin.component';

describe('PartidosAdminComponent', () => {
  let component: PartidosAdminComponent;
  let fixture: ComponentFixture<PartidosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartidosAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartidosAdminComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

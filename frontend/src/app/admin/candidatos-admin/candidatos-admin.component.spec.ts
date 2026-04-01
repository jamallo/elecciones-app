import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatosAdminComponent } from './candidatos-admin.component';

describe('CandidatosAdminComponent', () => {
  let component: CandidatosAdminComponent;
  let fixture: ComponentFixture<CandidatosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidatosAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatosAdminComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

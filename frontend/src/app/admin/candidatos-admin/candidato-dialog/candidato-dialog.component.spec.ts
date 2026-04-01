import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatoDialogComponent } from './candidato-dialog.component';

describe('CandidatoDialogComponent', () => {
  let component: CandidatoDialogComponent;
  let fixture: ComponentFixture<CandidatoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidatoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatoDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

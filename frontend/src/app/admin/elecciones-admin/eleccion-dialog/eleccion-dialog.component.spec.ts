import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleccionDialogComponent } from './eleccion-dialog.component';

describe('EleccionDialogComponent', () => {
  let component: EleccionDialogComponent;
  let fixture: ComponentFixture<EleccionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EleccionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EleccionDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidoDialogComponent } from './partido-dialog.component';

describe('PartidoDialogComponent', () => {
  let component: PartidoDialogComponent;
  let fixture: ComponentFixture<PartidoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartidoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartidoDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

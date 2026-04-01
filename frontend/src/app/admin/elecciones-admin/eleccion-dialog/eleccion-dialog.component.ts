import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EleccionService } from '../../../services/eleccion.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Eleccion } from '../../../model/eleccion.model';

@Component({
  selector: 'app-eleccion-dialog',
  standalone: false,
  templateUrl: './eleccion-dialog.component.html',
  styleUrl: './eleccion-dialog.component.scss',
})
export class EleccionDialogComponent {

  form: FormGroup;
  loading = false;
  tipos = ['MUNICIPAL', 'AUTONOMICA', 'NACIONAL'];

  constructor(
    private fb: FormBuilder,
    private eleccionService: EleccionService,
    public dialogRef: MatDialogRef<EleccionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Eleccion | null
  ) {
    this.form = this.fb.group({
      tipo: [data?.tipo || 'MUNICIPAL', [Validators.required]],
      ambito: [data?.ambito || '', [Validators.required]],
      anio: [data?.anio || new Date().getFullYear(), [Validators.required, Validators.min(2000), Validators.max(2030)]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    const eleccion = this.form.value;

    if (this.data) {
      this.eleccionService.actualizarEleccion(this.data.id, eleccion).subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.loading = false;
        },
        error: (error) => {
          console.error('Error actualizando elección: ', error);
          this.loading = false;
        }
      });
    } else {
      this.eleccionService.crearEleccion(eleccion).subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.loading = false;
        },
        error: (error) => {
          console.error('Error creando elección: ', error);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}

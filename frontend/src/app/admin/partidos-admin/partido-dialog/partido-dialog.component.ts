import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartidoService } from '../../../services/partido.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Partido } from '../../../model/partido.model';

@Component({
  selector: 'app-partido-dialog',
  standalone: false,
  templateUrl: './partido-dialog.component.html',
  styleUrl: './partido-dialog.component.scss',
})
export class PartidoDialogComponent {
  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private partidoService: PartidoService,
    public dialogRef: MatDialogRef<PartidoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partido | null
  ) {
    this.form = this.fb.group({
      nombre: [data?.nombre || '', [Validators.required]],
      siglas: [data?.siglas || '', [Validators.required, Validators.maxLength(10)]],
      logoUrl: [data?.logoUrl || ''],
      colorPrimario: [data?.colorPrimario || '#1E88E5', [Validators.required]],
      colorSecundario: [data?.colorSecundario || '#0D47A1'],
      colorAcento: [data?.colorAcento || '#42A5F5'],
      colorFondo: [data?.colorFondo || '#FFFFFF']
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    const partido = this.form.value;

    if (this.data) {
      //Actualizar
      this.partidoService.actualizarPartido(this.data.id, partido).subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.loading = false;
        },
        error: (error) => {
          console.error('Error actualizando partido: ', error);
          this.loading = false;
        }
      });
    } else {
      //Crear
      this.partidoService.crearPartido(partido).subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.loading = false;
        },
        error: (error) => {
          console.error('Error creando partido: ', error);
          this.loading = false;
        }
      })
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}

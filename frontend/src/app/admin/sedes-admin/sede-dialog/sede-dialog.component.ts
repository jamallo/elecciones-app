import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SedeService } from '../../../services/sede.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sede-dialog',
  standalone: false,
  templateUrl: './sede-dialog.component.html',
  styleUrl: './sede-dialog.component.scss',
})
export class SedeDialogComponent {

  form: FormGroup;
  loading = false;
  partidos: any[] = [];
  tiposSedes = ['SEDE_PARTIDO', 'COLEGIO_ELECTORAL', 'RECINTO_ELECTORAL'];

  constructor(
    private fb: FormBuilder,
    private sedeService: SedeService,
    public dialogRef: MatDialogRef<SedeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.partidos = data.partidos;
    const sede = data.sede;

    this.form = this.fb.group({
      nombre: [sede?.nombre || '', [Validators.required]],
      direccion: [sede?.direccion || '', [Validators.required]],
      latitud: [sede?.latitud || 43.3619, [Validators.required]],
      longitud: [sede?.longitud || -5.8494, [Validators.required]],
      tipo: [sede?.tipo || 'SEDE_PARTIDO', [Validators.required]],
      municipio: [sede?.municipio || 'Oviedo', [Validators.required]],
      partidoEleccionId: [sede?.partidoEleccionId || '']
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    const sede = this.form.value;

    if(this.data.sede) {
      this.sedeService.actualizarSede(this.data.sede.id, sede).subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.loading = false;
        },
        error: (error) => {
          console.error('Error actualizando sede: ', error);
          this.loading = false;
        }
      });
    } else {
      this.sedeService.crearSede(sede).subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.loading = false;
        },
        error: (error) => {
          console.error('Error creando sede: ', error);
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}

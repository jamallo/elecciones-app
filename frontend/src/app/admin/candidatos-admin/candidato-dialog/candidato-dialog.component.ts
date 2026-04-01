import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CandidatoService } from '../../../services/candidato.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-candidato-dialog',
  standalone: false,
  templateUrl: './candidato-dialog.component.html',
  styleUrl: './candidato-dialog.component.scss',
})
export class CandidatoDialogComponent {

  form: FormGroup;
  loading = false;
  partidos: any[] = [];
  elecciones: any[] = [];

  constructor (
    private fb: FormBuilder,
    private candidatoService: CandidatoService,
    public dialogRef: MatDialogRef<CandidatoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.partidos = data.partidos;
    this.elecciones = data.elecciones;
    const candidato = data.candidato;

    this.form = this.fb.group({
      nombre: [candidato?.nombre || '', [Validators.required]],
      cargo: [candidato?.cargo || '', [Validators.required]],
      fotoUrl: [candidato?.fotoUrl || ''],
      biografia: [candidato?.biografia || '', [Validators.required]],
      posicionLista: [candidato?.posicionLista || 1, [Validators.required, Validators.min(1)]],
      partidoEleccionId: [candidato?.partidoEleccionId || '', [Validators.required]]
    });
  }

  obSubmit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    const candidato = this.form.value;

    if (this.data.candidato) {
      this.candidatoService.actualizarCandidato(this.data.candidato.id, candidato).subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.loading = false;
        },
        error: (error) => {
          console.error('Error actualizando candidato: ', error);
          this.loading = false;
        }
      });
    } else {
      this.candidatoService.crearCandidato(candidato).subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.loading = false;
        },
        error: (error) => {
          console.error('Error creando candidato: ', error);
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}

import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartidoService } from '../../../services/partido.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Partido } from '../../../model/partido.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-partido-dialog',
  standalone: false,
  templateUrl: './partido-dialog.component.html',
  styleUrl: './partido-dialog.component.scss',
})
export class PartidoDialogComponent {
  form: FormGroup;
  loading = false;
  coloresPredefinidos = [
    { nombre: 'Azul PP', valor: '#1E88E5' },
    { nombre: 'Rojo PSOE', valor: '#E63946' },
    { nombre: 'Verde Vox', valor: '#2E7D32' },
    { nombre: 'Naranja Sumar', valor: '#FF9800' },
    { nombre: 'Morado Podemos', valor: '#7B1FA2' },
    { nombre: 'Azul Oscuro', valor: '#00236C' },
    { nombre: 'Rojo Intenso', valor: '#C0392B' },
    { nombre: 'Amarillo', valor: '#F1C40F' },
    { nombre: 'Verde Claro', valor: '#00A86B' },
    { nombre: 'Púrpura', valor: '#9C27B0' }
  ];

  constructor(
    private fb: FormBuilder,
    private partidoService: PartidoService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PartidoDialogComponent>,
    private cdr: ChangeDetectorRef,
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
    if (this.form.invalid) {
      this.snackBar.open('Por favor, completa todos los campos requeridos', 'Cerrar', {duration: 3000 });
      return;
    }

    this.loading = true;
    const partido = this.form.value;

    if (this.data?.id) {
      //Actualizar
      this.partidoService.actualizarPartido(this.data.id, partido).subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error actualizando partido: ', error);
          this.snackBar.open(error.error?.mensaje || 'Error al actualizar', 'Cerrar', { duration: 3000 });
          this.loading = false;

        }
      });
    } else {
      //Crear
      this.partidoService.crearPartido(partido).subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error creando partido: ', error);
          this.snackBar.open(error.error?.mensaje || 'Error al crear', 'Cerrar', { duration: 3000 });
          this.loading = false;
        }
      })
    }
    this.cdr.detectChanges();
  }

  onCancel(): void {
    this.dialogRef.close();
    this.cdr.detectChanges();
  }

  seleccionarColor(color: string, campo: string): void {
    this.form.get(campo)?.setValue(color);
  }

}

import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventoService } from '../../../services/evento.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-evento-dialog',
  standalone: false,
  templateUrl: './evento-dialog.component.html',
  styleUrl: './evento-dialog.component.scss',
})
export class EventoDialogComponent {

  form: FormGroup;
  loading = false;
  partidos: any[] = [];
  tiposEvento = ['MITIN', 'RUEDA_PRENSA', 'DEBATE', 'ENTREVISTA', 'OTRO'];

  constructor(
    private fb: FormBuilder,
    private eventoService: EventoService,
    public dialogRef: MatDialogRef<EventoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.partidos = data.partidos;
    const evento = data.evento;

    this.form = this.fb.group({
      titulo: [evento?.titulo || '', [Validators.required]],
      descripcion: [evento?.descripcion || '', [Validators.required]],
      fecha: [evento?.fecha ? new Date(evento.fecha) : '', [Validators.required]],
      lugar: [evento?.lugar || '', [Validators.required]],
      tipo: [evento?.tipo || 'MITIN', [Validators.required]],
      partidoEleccionId: [evento?.partidoEleccionId || '']
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    const evento = this.form.value;
    evento.fecha = evento.fecha.toISOString();

    if (this.data.evento) {
      this.eventoService.actualizarEvento(this.data.evento.id, evento).subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.loading = false;
        },
        error: (error) => {
          console.error('Error actualizando evento: ', error);
          this.loading = false;
        }
      });
    } else {
      this.eventoService.crearEvento(evento).subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.loading = false;
        },
        error: (error) => {
          console.error('Error creando evento: ', error);
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-candidato-detalle',
  standalone: false,
  templateUrl: './candidato-detalle.html',
  styleUrl: './candidato-detalle.scss',
})
export class CandidatoDetalle implements OnInit {
  candidatoId: number | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.candidatoId = +params['id'];
      console.log('Candidato ID: ', this.candidatoId);
    });
  }

}

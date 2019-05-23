import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Chart } from 'chart.js';
import { UserInterface } from '../../models/user';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public user: UserInterface = {
    id: "",
    ingreso: 0,
    porcentajeAhorro: 0,
    saldo: 0,
    saldoInicial: 0,
    diaPago: 0,
    ahorro: 0,
  }
  chart = [];
  disponibleGrafico: number;
  gastoGrafico: number;
  colorGrafico: string;
  procentaje: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.authService.isFirstTime(user.uid).subscribe(res => {
          if (res != undefined) {
            this.user = res;
            this.disponibleGrafico = this.user.saldo;
            this.gastoGrafico = this.user.saldoInicial - this.user.saldo;
            this.procentaje = ((this.user.saldo * 100) / this.user.saldoInicial).toFixed(1);
            if (this.procentaje > 50) {
              this.colorGrafico = "green";
            }
            else if (this.procentaje > 30) {
              this.colorGrafico = "orange";
            } else if (this.procentaje < 30) {
              this.colorGrafico = "red";
            }
            this.chart = new Chart("canvas", {
              type: 'doughnut',
              data: {
                datasets: [{
                  data: [this.disponibleGrafico, this.gastoGrafico],
                  backgroundColor: [
                    this.colorGrafico,
                    "white"
                  ],
                  borderColor: '#919EA9'
                }],
                labels: [
                  'Disponible',
                  'Gastado'
                ]

              },
              options: {
                rotation: 1 * Math.PI,
                circumference: 1 * Math.PI
              }
            });
          }
        });
      }
    });
  }

}

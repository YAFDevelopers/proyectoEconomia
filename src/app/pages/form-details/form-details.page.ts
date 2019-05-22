import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../models/user';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.page.html',
  styleUrls: ['./form-details.page.scss'],
})
export class FormDetailsPage implements OnInit {

  constructor(private authService: AuthService, private alertController: AlertController, private router: Router) { }
  public user: UserInterface = {
    id: "",
    ingreso: null,
    porcentajeAhorro: null,
    saldo: null,
    diaPago: null,
    ahorro: null,
  }
  public FirsTime: boolean;


  ngOnInit() {
    this.authService.isAuth().subscribe(user => {
      if (user) {
        console.log('User', user.uid);
        this.authService.isFirstTime(user.uid).subscribe(res => {
          console.log(res);
          this.user = res;
          if (res == undefined) {
            this.FirsTime = true;
          }
          else {
            this.FirsTime = false;
          }
        });
      }
      else {
        this.router.navigate(['']);
      }

    });
  }

  async presentAlert(mensaje) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  insertExtend() {
    if (this.user.ingreso == null || this.user.diaPago == null || this.user.porcentajeAhorro == null) {
      let mensaje = "Espacios vacios";
      this.presentAlert(mensaje);
    } else if (Number(this.user.ingreso) == 0 || Number(this.user.diaPago) == 0 || Number(this.user.porcentajeAhorro) == 0) {
      let mensaje = "Sin ceros";
      this.presentAlert(mensaje);
    } else if ((Number(this.user.diaPago) < 1 || Number(this.user.diaPago) > 29) || (Number(this.user.porcentajeAhorro) < 1 || Number(this.user.porcentajeAhorro) > 100)) {
      let mensaje = "Datos invalidos";
      this.presentAlert(mensaje);
    } else {
      this.user.porcentajeAhorro = this.user.porcentajeAhorro / 100;
      this.user.ahorro = this.user.porcentajeAhorro * this.user.ingreso;
      this.user.saldo = this.user.ingreso - this.user.ahorro;
      this.authService.newUser(this.user);
      this.router.navigate(['home']);
      console.log(this.user);
    }
  }

  updateExtend(): void{
    delete this.user.saldo;
    delete this.user.ahorro;
    this.user.porcentajeAhorro = this.user.porcentajeAhorro / 100;    
    this.authService.updateUser(this.user.id, this.user);
    this.router.navigate(['home']);
  }

}

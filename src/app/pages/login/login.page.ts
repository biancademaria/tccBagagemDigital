import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { User } from 'firebase';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  public userLogin: Usuario = {};
  public userRegistrar: Usuario = {};
  private loading: any;

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  segmentChanged(event: any) {
    if (event.detail.value === "login") {
      this.slides.slidePrev();
    } else {
      this.slides.slideNext();
    }
  }

  async login() {
    await this.presentLoading();

    try {
      await this.authService.login(this.userLogin)
    } catch (error) {
      let message: string
      switch (error.code) {
        case 'auth/invalid-email':
          message = "Este e-mail é inválido!";
          break;
      }
      this.presentToast(message);
    } finally {
      this.loading.dismiss();
    }

  }

  async registrar() {
    await this.presentLoading();
    try {
      await this.authService.registrar(this.userRegistrar)
    } catch (error) {
      let message: string
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = "Este e-mail já está em uso!";
          break;
        case 'auth/invalid-email':
          message = "Este e-mail é inválido!";
          break;
      }
      this.presentToast(message);
    } finally {
      this.loading.dismiss();
    }

  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor, aguarde um momento.'
    });
    return this.loading.present();

  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }


}
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { ModalController } from 'ionic-angular';



import { SurveyOverviewPage } from '../survey-overview/survey-overview';
import { UserRegistrationPage} from '../user-registration/user-registration';

import { Login } from '../../providers/login';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private auth: Login, private alertCtrl: AlertController,
        private loadingCtrl: LoadingController, public modalCtrl: ModalController) {


    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
    

  loading: Loading;
  registerCredentials = { username: '', password: '' , applicationServer: '192.168.178.40:4567'};




  public login() {
      this.showLoading()
      console.log('Login' + this.registerCredentials.username + "   " + this.registerCredentials.password + "   " + this.registerCredentials.applicationServer);

      this.auth.login(this.registerCredentials).subscribe(allowed => {
          if (allowed) {
              setTimeout(() => {
                  this.loading.dismiss();
                  this.navCtrl.setRoot(SurveyOverviewPage)
              });
          } else {
              this.showError("Access Denied");
          }
      },
          error => {
              this.showError(error);
          });
  }


  showLoading() {
      this.loading = this.loadingCtrl.create({
          content: 'Please wait...'
      });
      this.loading.present();
  }

  showError(text) {
      setTimeout(() => {
          this.loading.dismiss();
      });

      let alert = this.alertCtrl.create({
          title: 'Fail',
          subTitle: text,
          buttons: ['OK']
      });
      alert.present(prompt);
  }

  presentUserRegistrationForm() {

      let modal = this.modalCtrl.create(UserRegistrationPage);
      modal.onDidDismiss(data => {
          console.log(data);
      });

      modal.present();
  }

}

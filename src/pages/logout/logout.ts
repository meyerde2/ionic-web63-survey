import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Login } from '../../providers/login';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class LogoutPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private auth: Login) {

        navCtrl.setRoot(LoginPage);
        //navCtrl.popToRoot();
        navCtrl.push(LoginPage);
        auth.logout();

        console.log('augeloggt LogoutPage');

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

}

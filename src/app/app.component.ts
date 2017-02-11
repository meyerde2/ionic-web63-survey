import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { UsersPage } from '../pages/users/users';
import { SurveyOverviewPage } from '../pages/survey-overview/survey-overview';
import { EvaluationPage } from '../pages/evaluation/evaluation';

import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    // make UsersPage the root (or first) page
    rootPage: any = LoginPage;
    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform, public menu: MenuController) {
        this.initializeApp();

        // set our app's pages
        this.pages = [
            { title: 'Umfrage\u00fcbersicht', component: SurveyOverviewPage },
            { title: 'Benutzerverwaltung', component: UsersPage },
            { title: 'Logout', component: LogoutPage }
           
        ];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
    }

    openPage(page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component);
    }


}
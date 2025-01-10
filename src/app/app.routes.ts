import { Routes } from '@angular/router';
import { CreateVotePageComponent } from './components/create-vote-page/create-vote-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';

export const routes: Routes = [
    {
        path: "",
        component: HomePageComponent
    },
    {
        path: "create-vote",
        component: CreateVotePageComponent
    }
];

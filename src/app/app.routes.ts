import { Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { TaskManagerComponent } from './components/task-manager/task-manager.component';


export const routes: Routes = [
    { path: "taskManager", component: TaskManagerComponent },
    { path: "navbar", component: HeaderComponent },
    {path:'', redirectTo:'taskManager', pathMatch:"full"}
];

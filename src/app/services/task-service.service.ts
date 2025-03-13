import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(private http: HttpClient) { }

  getAllTask() {
    return this.http.get(`${environment.urlTasks}`)
  }

  addTask(data: any) {
    return this.http.post(`${environment.urlTasks}`, data)
  }

  updateTask(taskId: any, data: any) {
    data.id = `${taskId}`;
    return this.http.put(`${environment.urlTasks}` + '/' + `${taskId}`, data)
  }

  deleteTask(taskId: any) {
    return this.http.delete(`${environment.urlTasks}` + '/' + `${taskId}`)
  }
}

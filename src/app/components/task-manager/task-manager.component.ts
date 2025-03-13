import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskServiceService } from '../../services/task-service.service';
import { Task } from '../../models/task.model'; // Importa la interfaz

@Component({
  selector: 'app-task-manager',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.scss'
})
export class TaskManagerComponent {

  taskService: TaskServiceService = inject(TaskServiceService);

  isEditing: boolean = false;
  isSubmit: boolean = true;
  taskId: any;
  responseTasks: any = [];
  filteredTasks: Task[] = [];

  taskStatus = [
    { code: '1', name: 'pendiente' },
    { code: '2', name: 'completado' },
  ];

  formTask = new FormGroup({
    nameTask: new FormControl('', [Validators.required]),
    descriptionTask: new FormControl('', [Validators.required]),
    statusTask: new FormControl('', [Validators.required]),
  });

  formSearchTask = new FormGroup({
    statusTask: new FormControl('', [Validators.required]),
  });


  constructor() {

  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getAllTask().subscribe({
      next: response => {
        this.responseTasks = response;
        this.formSearchTask.reset();
      },
      error: error => console.log(error),
    });
  }


  addTask() {
    if (this.formTask.valid) {
      this.taskService.addTask(this.formTask.value).subscribe({
        next: response => {
          this.formTask.reset();
          this.getTasks();
          alert('Task added successfully!');
        },
        error: error => console.log(error),
      });
    } else {
      this.formTask.markAllAsTouched();
    }
  }


  validarCondicion(): boolean {
    let validation: boolean = false;

    if (this.isSubmit && !this.isEditing) {
      validation = true;
    } else if (!this.isSubmit && this.isEditing) {
      validation = false;
    }

    return validation;
  }


  updateTask(taskId: string) {
    if (taskId != '') {
      for (const item of this.responseTasks) {
        if (item.id == taskId && this.isEditing == false) {
          this.taskId = taskId;
          this.isEditing = true;
          this.isSubmit = false;
          this.formTask.patchValue({
            nameTask: item.nameTask,
            descriptionTask: item.descriptionTask,
            statusTask: item.statusTask,
          })
        }
      }
    } else if (taskId == '') {
      this.taskService.updateTask(this.taskId.toString(), this.formTask.value).subscribe({
        next: response => {
          this.formTask.reset();
          this.getTasks();
          alert('Task updated successfully!');
        },
        error: error => console.log(error),
      });
      this.formTask.reset();
      this.taskId = '';
      this.isSubmit = true;
      this.isEditing = false;
    }
  }

  deletemodal(taskId: string) {
    this.taskId = taskId;
  }

  deleteTask() {
    this.taskService.deleteTask(this.taskId).subscribe({
      next: response => {
        this.taskId = '';
        this.getTasks();
      },
      error: error => console.log(error),
    });
    this.getTasks();
  }

  getByState() {
    const selectedStatus = this.formSearchTask.value.statusTask;
    this.responseTasks = this.responseTasks.filter((task: Task) => task.statusTask === selectedStatus);
  }

}

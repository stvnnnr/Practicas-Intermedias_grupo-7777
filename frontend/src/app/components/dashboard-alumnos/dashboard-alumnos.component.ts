import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-dashboard-alumnos',
  templateUrl: './dashboard-alumnos.component.html',
  styleUrls: ['./dashboard-alumnos.component.css']
})
export class DashboardAlumnosComponent {

  //Creacion de array donde almacenar los cursos
  cursos: any[] = [];
  personalinfo: any = {
    name: '',
    lastname: '',
  };
  info: any;
  usuarioID:any = localStorage.getItem('id');

  constructor(private backend: BackendService, private router: Router, private ruta: ActivatedRoute) { }

  ngOnInit() {
    //donde esta el 16 se debe de cambiar al id del usuario logeado en el local storage
    this.backend.Student("16").subscribe(
      res => {
        console.log(res),
        this.info = res
        this.personalinfo = this.info[0].student

        for (let i = 0; i < this.info.length; i++) {
          this.cursos.push(this.info[i].course)
        }
        
      },
      err => {
        console.log(err)
      }
    );
  }

  Logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}

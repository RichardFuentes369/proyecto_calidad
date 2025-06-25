import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import Swal from 'sweetalert2'
import { PrincipalService } from '../../principal/service/principal.service';
import { Router } from '@angular/router';
import { ocultarModalOscura } from '@functions/System'
import { FinalService } from '@module/users/finales/service/final.service';

@Component({
  selector: 'app-crear-usuarios',
  standalone: true,
  imports: [TranslateModule, CommonModule, FormsModule],
  templateUrl: './crear-usuarios.component.html',
  styleUrl: './crear-usuarios.component.scss'
})

export class CrearUsuariosComponent {

  constructor(
    private router: Router,
    private principalService: PrincipalService,
    private finalService: FinalService,
    private translate: TranslateService
  ){}

  model = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isActive: 0
  }

  typefield = 'password'

  goTo (url: string, _id: number){

    if(_id != 0){
      this.router.navigate([url], { queryParams: { id: _id } });
    }else{
      this.router.navigate([url]);
    }

  }

  showPassword(){
    this.typefield = (this.typefield === "password") ? "text" : "password"
  }

  async crearUsuario(){

    let complemento = localStorage.getItem('profile')
    let endPoint

    if(complemento == 'admin'){
      endPoint = this.principalService
    }else{
      endPoint = this.finalService
    }

    const response = await endPoint.createUser(this.model)
    if(response.data.status == 404){
      ocultarModalOscura()
      Swal.fire({
        title: response.data.message,
        text: response.data.error,
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
    if(response.data.status == 200){
      ocultarModalOscura()
      Swal.fire({
        title: this.translate.instant('pages-usuarios.Swal.TitleCreate'),
        text: this.translate.instant('pages-usuarios.Swal.TitleRegisterCreate'),
        icon: "success"
      });
    }

  }

}

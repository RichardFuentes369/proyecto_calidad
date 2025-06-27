import { Component, OnInit, ViewChild } from '@angular/core';
import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@guard/service/auth.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { ModulosService } from '../service/modulos.service';
import Swal from 'sweetalert2'

import { Permisos } from '@functions/System'
import { ModalBoostrapComponent } from '@component/globales/modal/boostrap/boostrap.component';
import { LoadingComponent } from '@component/globales/loading/loading.component';
@Component({
  selector: 'app-permisos',
  standalone: true,
  imports: [
    TranslateModule, 
    TablecrudComponent,
    ModalBoostrapComponent,
    LoadingComponent
  ],
  templateUrl: './permisos.component.html',
  styleUrl: './permisos.component.scss'
})
export class PermisosComponent implements OnInit{

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService :AuthService,
    private permisosService :PermisosService,
    private modulosService :ModulosService,
    private translate: TranslateService,
    private module: ModulosService,
  ) { }

  permisos: any[] = []
  moduloPadre: any = 0

  async ngOnInit() {
    this.moduloPadre = localStorage.getItem('submodulo')

    if(!this.moduloPadre){
      this.router.navigate([`/admin/menu/index-modulos`]);
    }

    await this.userService.refreshToken('authadmin');
    const userData = await this.userService.getUser('authadmin');
    const modulo = await this.permisosService.permisos(userData.data.id,'modulos')

    for (const permiso of modulo.data) {
      if(permiso.permiso_permiso != 'ver'){
        this.permisos.push(permiso)
      }
    }

  }

  // inicio datos que envio al componente
  showcampoFiltro = true
  endPoint = `modulos/getPermisosSobrePadre/${localStorage.getItem('submodulo')}`
  columnas = [
    {
      title: 'Permission name',
      data: 'nombre',
    },
    {
      title: 'Permission',
      data: 'permiso',
    },
    {
      title: 'Description',
      data: 'descripcion',
    }
  ]
  permisosAcciones = this.permisos
  // fin datos que envio al componente

  tamano = ""
  scrollable = false
  title = ""
  save = true
  buttonSave = "Guardar"
  edit = true
  buttonEdit = "Editar"
  cancel = true
  buttonCancel = "Cancelar"
  cierreModal = "true"
  componentePrecargado = ""
  
  search = true
  buttonSearch = "Buscar"
  iconFilter="fa fa-filter"

  crearData (_id: string){
    // localStorage.setItem('profile', 'user')
    this.tamano = "xl"
    this.scrollable = false
    this.title = this.translate.instant('pages-modulos.Title.CreatePermission')
    this.save = true
    this.buttonSave = "Guardar"
    this.edit = false
    this.buttonEdit = "Editar"
    this.cancel = true
    this.buttonCancel = "Cancelar"
    this.cierreModal = "true"
    this.componentePrecargado = "CrearModuloPermisoComponent"

    const idButton = document.getElementById('miBoton')
    if(idButton){
      idButton.setAttribute('componente', this.componentePrecargado);
      idButton.click()
    }
  }

  editarData (_id: string){
    // localStorage.setItem('profile', 'user')
    this.tamano = "xl"
    this.scrollable = false
    this.title = this.translate.instant('pages-modulos.Title.EditPermission')
    this.save = true
    this.buttonSave = "Guardar"
    this.edit = false
    this.buttonEdit = "Editar"
    this.cancel = true
    this.buttonCancel = "Cancelar"
    this.cierreModal = "true"
    this.componentePrecargado = "EditarModuloPermisoComponent"

    const idButton = document.getElementById('miBoton')
    if(idButton){
      idButton.setAttribute('componente', this.componentePrecargado);
      idButton.click()
    }
    console.log("editarData "+_id)
  }


  @ViewChild(TablecrudComponent)
  someInput!: TablecrudComponent
  eliminarData (_id: string){
   this.translate.get('pages-modulos.Swal.TitleAreYouSure').subscribe((translatedTitle: string) => {
      Swal.fire({
        title: translatedTitle,
        text: this.translate.instant('pages-modulos.Swal.TitleWarnigRevert'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: this.translate.instant('pages-modulos.Swal.TitleDelete'),
        cancelButtonText: this.translate.instant('pages-modulos.Swal.TitleCancel')
      }).then(async (result) => {
        if (result.isConfirmed) {
            let response = await this.modulosService.eliminarPermiso(_id)
            await this.someInput.reload()

            if(response.data.status == 200){
              Swal.fire({
                title: this.translate.instant('pages-modulos.Swal.TitleDelete'),
                text: this.translate.instant('pages-modulos.Swal.TitleRegisterDeleted'),
                icon: "success"
              });
            }
            if(response.data.status == 404){
              Swal.fire({
                title: this.translate.instant('pages-modulos.Swal.TitleDelete'),
                text: response.data.message,
                icon: "error"
              });
            }
        }
      });
    });
  }

  async refrescarTabla (){
    setTimeout(async () => {
      await this.someInput.reload()
    }, 100);
  }
}

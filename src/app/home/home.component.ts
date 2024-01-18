import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any[] = [];
  mostrarForm: boolean = false;
  nuevaPizza: any = { piz_name: '', piz_origin: '', piz_state: true };


  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    this.llenarData()
  }

  llenarData() { 

    this.apiService.getData().subscribe(data => {
      this.data = data;
      console.log(this.data);
    })

  }


  mostrarFormulario() {
    this.mostrarForm = !this.mostrarForm;
  }

  agregarPizza() {
    // Aquí lógica para enviar 'nuevaPizza' al servidor y agregarla a la lista
    console.log(this.nuevaPizza);
  }

}

import { Router } from "@vaadin/router";
import { state } from "../state";
const husky = require("../assets/husky.jpg");

class Home extends HTMLElement {
  connectedCallback() {
    this.render();
    // const button = this.querySelector(".button");
    // button.addEventListener("click", async (e) => {
    //   const target = e.target as any;
    //   const test = navigator.geolocation.getCurrentPosition;
    //   console.log(test);
    // });
  }

  addListeners() {
    const button = this.querySelector(".button");
    button.addEventListener("click", async (e) => {
      navigator.geolocation.getCurrentPosition(async (geoposition) => {
        const lat = geoposition.coords.latitude;
        const lng = geoposition.coords.longitude;
        state.setGeolocation(lat, lng);
      });

      // PARA BORRAR UN CONTAINER Y TODO LO QUE ESTÁ DENTRO
      const test = this.querySelector(".lost-pets");
      test.remove();
    });
  }

  render() {
    const style = document.createElement("style");

    style.innerHTML =
      /*css*/
      `
    .lost-pets{
      display:flex;
      flex-direction:column;
      align-items:center;
    }
      
      
    .title{
      width:90%;
      font-size:40px;
      font-weight:700;
      align-self:center;
      margin:20px 0;
    }

    .location-permission{
      font-size:16px;
      align-self:center;
      font-weight:500;
      width:90%;
      
    }
    
    .button-container{
      width:100%;
      display:flex;
      justify-content:center;
      margin:20px 0;
    }

    .lost-pet-cards-container {
      display:flex;
      flex-direction:column;
      gap:10px;
      align-items:center;
    }
    .card {
      height:234px;
      width:335px;
      border:2px solid black;
      border-radius:4px;
      background-color:#D1C1AD;
    }
    .img-container {
      height:147px;
      width:100%;
      border-bottom:3px solid black;
    }
    .pet-image {
      height:100%;
      width:100%;
      object-fit:cover;
    }

    .pet-information {
      display:flex;
      align-items:center;
      justify-content:space-between;
      padding:0 15px;
    }
    .main-information-container {
    }
    .pet-name {
      margin:0;
      font-size:40px;
      height:50px;
    }
    .pet-location {
      margin:0;
    }
    .report-information {
      margin-right:5px;
    }
    
    `;

    this.innerHTML = /*html*/ `
    <custom-header></custom-header>
    <section class="lost-pets">
      <h1 class="title">Mascotas perdidas cerca tuyo</h1>
      <div class="get-location-information">
      <h3 class="location-permission">PARA VER LAS MASCOTAS REPORTADAS CERCA TUYO NECESITAMOS PERMISO PARA CONECTAR TU UBICACIÓN.</h3>
      <div class="button-container">
      <custom-button class="button">Dar mi ubicación</custom-button>
        </div>
      </div>
        <div class="lost-pet-cards-container">

        <div class="card">
        <div class="img-container">
        <img class="pet-image" src=${husky}/>
        <div class=pet-information>
        <div class="main-information-container">
        <h1 class="pet-name">Bobby</h1>
        <span class="pet-location">NUÑEZ</span>
        </div>
        <a href="" class="report-information">REPORTAR <br/> INFORMACIÓN</a>
        </div>
        </div>
        </div>
        
        
        <div class="card">
        <div class="img-container">
        <img class="pet-image" src=${husky}/>
        <div class=pet-information>
        <div class="main-information-container">
        <h1 class="pet-name">Bobby</h1>
        <h3 class="pet-location">NUÑEZ</h3>
        </div>
        <a href="" class="report-information">REPORTAR <br/> INFORMACIÓN</a>
        </div>
        </div>
        </div>
        
        



        
        </div>
    </section>
    `;

    this.appendChild(style);

    this.addListeners();
  }
}

customElements.define("home-page", Home);

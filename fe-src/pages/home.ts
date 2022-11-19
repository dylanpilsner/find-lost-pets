import { Router } from "@vaadin/router";
import { state } from "../state";

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
      const test = navigator.geolocation.getCurrentPosition(
        async (geoposition) => {
          const lat = geoposition.coords.latitude;
          const lng = geoposition.coords.longitude;
          state.setGeolocation(lat, lng);
        }
      );
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
      
    .titles-container{
      width:90%;
      align-self:center;
    }
      
    .title{
      font-size:40px;
      font-weight:700;
      margin:20px 0;
    }

    .location-permission{
      font-size:16px;
      font-weight:500;
    }
    
    .button-container{
      width:100%;
      display:flex;
      justify-content:center;
      margin:20px 0;
    }
    
    `;

    this.innerHTML = /*html*/ `
    <custom-header></custom-header>
    <section class="lost-pets">
      <div class="titles-container">
      <h1 class="title">Mascotas perdidas cerca tuyo</h1>
      <h3 class="location-permission">PARA VER LAS MASCOTAS REPORTADAS CERCA TUYO NECESITAMOS PERMISO PARA CONECTAR TU UBICACIÓN.</h3>
      </div>
      <div class="button-container">
      <custom-button class="button">Dar mi ubicación</custom-button>
        </div>
    </section>
    `;

    this.appendChild(style);

    this.addListeners();
  }
}

customElements.define("home-page", Home);

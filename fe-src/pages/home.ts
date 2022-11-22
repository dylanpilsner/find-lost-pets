import { Router } from "@vaadin/router";
import { state } from "../state";
const husky = require("../assets/husky.jpg");
const closeImg = require("../assets/close.png");

class Home extends HTMLElement {
  connectedCallback() {
    this.render();

    //AGREGAR CONDICIONAL, PARA QUE NO APAREZCA EL BOTÓN DE UBICACIÓN EN CASO DE QUE LA GEOLOCALIZACIÓN EN EL STATE SEA DISTINTA A "" !!!!!
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
      const locationPermission = this.querySelector(
        ".get-location-information"
      );
      locationPermission.remove();
    });

    const reportInformation = this.querySelectorAll(".report-information-link");
    reportInformation.forEach((i) => {
      i.addEventListener("click", (e) => {
        const reportModel = this.querySelector(".report-information");
        reportModel.classList.toggle("active");
      });
    });

    const closeModel = this.querySelector(".close-model");
    closeModel.addEventListener("click", (e) => {
      const reportModel = this.querySelector(".report-information");
      reportModel.classList.toggle("active");
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
      height:100%;
    }
      
      
    .title{
      width:90%;
      font-size:40px;
      font-weight:700;
      align-self:center;
      margin:20px 0;
    }

    .get-location-information{
      width:90%;
    }

    .location-permission{
      font-size:16px;
      align-self:center;
      font-weight:500;
      text-align:center;
    }
    
    .button-container{
      width:100%;
      display:flex;
      justify-content:center;
      margin:20px 0;
    }

    .button{
      width:100%;
      max-width:600px;
    }

    .lost-pet-cards-container {
      display:flex;
      flex-direction:column;
      gap:20px;
      align-items:center;
    }

    .lost-pet-cards-container:last-child {
      margin-bottom:20px;

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
    .report-information-link {
      margin-right:5px;
      color: #3E91DD;
      cursor: pointer;
      text-decoration: underline;
    }
    
    .report-information{
      position:fixed;
      background-color:rgba(0,0,0,.80);
      height:100%;
      width:100%;
      top:0;
      bottom:0;
      left:0;
      right:0;
      justify-content:center;
      opacity:0%;
      display:none;

    }

    .report-information.active{
      display:flex;
      animation-duration: 0.5s;
      animation-name: showsup;
      animation-fill-mode: forwards;
      animation-timing-function: ease-in-out;
    }

    @keyframes showsup{
      50%,
      100% {
        opacity: 100%;
      }
    }

    .report-information-modal-card {
      position:relative;
      width:90%;
      max-width:600px;
      background-color:white;
      margin-top:-301.5px;
      top:50%;
      height:603px;
      border-radius:6px;
      box-shadow:0px 1px 20px 1px rgba(0,0,0,0.85);
      overflow-y:scroll;
    }
    
    .modal-head {
      background-color:#ebebeb;
      border-bottom:3px solid #dbdbdb;
      border-top-left-radius:6px;
      border-top-right-radius:6px;
      height:60px;
      position:relative;
    }

    .close-model{
      height:35px;
      width:35px;
      position:absolute;
      right:5%;
      top:20%
    }

    .informartion-container {
      width:100%;
      padding: 0 20px 20px;
    }
    
    .title.report{
      width:100%;
      margin:0;
      border-bottom:1px solid grey;
    }
    
    .modal-foot{
      background-color:#ebebeb;
      border-top:3px solid #dbdbdb;
      border-bottom-left-radius:6px;
      border-bottom-right-radius:6px;
      height:60px;
      width:100%;
      position:absolute;
      left:0;
    }

    .report-form {
      // height:100%;
      width:100%;
      display:flex;
      flex-direction:column;
      align-items:center;
      gap:30px;
      justify-content:center;
    }
    .form-label {
    }
    .field-label {
      font-size:16px;
      font-weight:500;
    }
    .form-input {
      height:50px;
      width:280px;
      border:2px solid black;
      border-radius:4px;
    }
    .form-textarea {
      height:127px;
      width:280px;
      border:2px solid black;
      border-radius:4px;
    }
    
    
    
    `;

    this.innerHTML = /*html*/ `
    <custom-header></custom-header>
    <section class="lost-pets">
      <h1 class="title">Mascotas perdidas cerca tuyo</h1>
      <div class="get-location-information">
        <h3 class="location-permission">
          PARA VER LAS MASCOTAS REPORTADAS CERCA TUYO NECESITAMOS PERMISO PARA
          CONECTAR TU UBICACIÓN.
        </h3>
        <div class="button-container">
          <custom-button class="button">Dar mi ubicación</custom-button>
        </div>
      </div>
      <div class="lost-pet-cards-container">
        <div class="card">
          <div class="img-container">
            <img class="pet-image" src="${husky}" />
            <div class="pet-information">
              <div class="main-information-container">
                <h1 class="pet-name">Bobby</h1>
                <span class="pet-location">NUÑEZ</span>
              </div>
              <a class="report-information-link"
                >REPORTAR <br />
                INFORMACIÓN</a
              >
            </div>
          </div>
        </div>

        <div class="card">
          <div class="img-container">
            <img class="pet-image" src="${husky}" />
            <div class="pet-information">
              <div class="main-information-container">
                <h1 class="pet-name">Bobby</h1>
                <span class="pet-location">NUÑEZ</span>
              </div>
              <a class="report-information-link"
                >REPORTAR <br />
                INFORMACIÓN</a
              >
            </div>
          </div>
        </div>

        <div class="card">
          <div class="img-container">
            <img class="pet-image" src="${husky}" />
            <div class="pet-information">
              <div class="main-information-container">
                <h1 class="pet-name">Bobby</h1>
                <span class="pet-location">NUÑEZ</span>
              </div>
              <a class="report-information-link"
                >REPORTAR <br />
                INFORMACIÓN</a
              >
            </div>
          </div>
        </div>

        <div class="report-information">
          <div class="report-information-modal-card">
            <div class="modal-head">
              <img src="${closeImg}" class="close-model" />
            </div>
            <div class="informartion-container">
              <h1 class="title report">Reportar info <br />de Bobby</h1>
            </div>
            <form class="report-form">
              <label class="form-label">
                <div class="field-label">TU NOMBRE</div>
                <input type="text" class="form-input" name="name" />
              </label>
              <label class="form-label">
                <div class="field-label">TU TELÉFONO</div>
                <input type="tel" class="form-input" name="phone" />
              </label>

              <label class="form-label">
                <div class="field-label">DÓNDE LO VISTE?</div>
                <textarea class="form-textarea"></textarea>
              </label>
            </form>
            <div class="modal-foot"></div>
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

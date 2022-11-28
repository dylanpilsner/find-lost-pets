import { Router } from "@vaadin/router";
import { state } from "../state";
const defaultImage = require("../assets/default-image.png");
const husky = require("../assets/husky.jpg");
class ReportPet extends HTMLElement {
  async connectedCallback() {
    this.render();
  }

  addListeners() {}

  render() {
    const style = document.createElement("style");

    style.innerHTML =
      /*css*/
      `
      .report-pet-page-container{
        display:flex;
        flex-direction:column;
        align-items:center;
        padding:10px;
      }
      
      .title{
        margin:20px 0;
        font-size:40px;
      }

      .form {
        width:90%;
        display:flex;
        max-width:500px;
        flex-direction:column;
        align-items:center;
        gap:30px;
      }
      .label-form {
        font-size:16px;
        width:100%;
        font-weight:500;
      }
 
      .data-input {
        height:70px;
        border:2px solid black;
        width:100%;
        border-radius: 10px;
        font-size:20px;
        text-align:center;
        outline:none;
      }
      .data-input:read-only {
        background-color:#d6d5da;
      }

      .data-input.name{
        margin-bottom:30px;
      }

      .invisible-button{
        width:100%;
        border:none;
        background-color:transparent;
        margin-bottom:20px;
      }
      
      .img-container {
        width:100%;
        height:150px;
        border:2.5px solid black;
        border-radius:4px;
    }

      @media (min-width:769px){
      .img-container{
        height:250px;
      }
    }
      
      .pet-img {
        width:100%;
        height:100%;
        object-fit:cover;
      }
      
      .button{
        width:100%;
      }
      
      `;

    this.innerHTML = /*html*/ `
    <custom-header></custom-header>
    <div class="report-pet-page-container">
     <h1 class="title">Reportar mascota perdida</h1>
     <form class="form">
     <label class="label-form">
     <div class="nombre">NOMBRE</div>
     <input placeholder="Ingresa tu nombre" type="text" class="data-input name" name="name" required/>
     </label>
      <div class="img-container">
      <img class="pet-img" src=${defaultImage}>
      </div>
      <custom-button color="#D1ADCF" class="button">Agregar/modificar foto</custom-button>
     </form>
     </div>
    `;

    this.appendChild(style);
    this.addListeners();
  }
}

customElements.define("report-pet-page", ReportPet);
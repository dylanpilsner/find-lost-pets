import { Router } from "@vaadin/router";
import { state } from "../state";
const husky = require("../assets/husky.jpg");
class ReportedPets extends HTMLElement {
  async connectedCallback() {
    this.render();
  }

  async getMyPets() {
    const myPets = await state.getMyPets();
    return myPets;
  }

  addListeners() {}

  async render() {
    const style = document.createElement("style");
    const petArray = await this.getMyPets();

    style.innerHTML =
      /*css*/
      `
      .my-pets-page-container{
        display:flex;
        flex-direction:column;
        align-items:center;
        height:100%;
        padding:10px;
      }
      
      .title{
        margin:20px 0;
        font-size:40px;
        text-align:center;
      }

      .subtitle{
        text-align:center;

      }

      .lost-pet-card-container {
        display:flex;
        flex-direction:column;
        gap:20px;
        align-items:center;
      }
  
      .lost-pet-card-container:last-child {
        margin-bottom:20px;
      }
  
      @media (min-width:769px){
        .lost-pet-card-container{
          display:grid;
          gap:50px;
          grid-template-columns:1fr 1fr ;
        }
      }
      
      @media (min-width:1366px){
        .lost-pet-card-container{
          grid-template-columns:1fr 1fr 1fr;
        }
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
      
      `;

    this.innerHTML = /*html*/ `
    <custom-header></custom-header>
    <div class="my-pets-page-container">
      <h1 class="title">Mis mascotas reportadas</h1>

      <div class="lost-pet-card-container">
      ${
        petArray.length == 0
          ? /*html*/ `<h3 class="subtitle">AÚN NO REPORTASTE MASCOTAS PERDIDAS</h3>`
          : petArray
              .map((i) => {
                return /*html*/ `
                <div class="card">
                <div class="img-container">
                  <img class="pet-image" src=${i.pictureURL} />
                  <div class="pet-information">
                    <div class="main-information-container">
                      <h1 class="pet-name">${i.name}</h1>
                      <span class="pet-location">${i.point_of_reference}</span>
                    </div>
                    <a class="report-information-link"
                      >REPORTAR <br />
                      INFORMACIÓN</a
                    >
                  </div>
              </div>
              </div>
              `;
              })
              .join(" ")
      }
      </div>
      </div>
      
      

 

        
      </div>
    </div>
    `;

    this.appendChild(style);
    this.addListeners();
  }
}

customElements.define("reported-pets-page", ReportedPets);

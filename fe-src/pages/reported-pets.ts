import { Router } from "@vaadin/router";
import { state } from "../state";
import * as mapboxgl from "mapbox-gl";
import { MAPBOX_TOKEN, mapboxClient } from "../lib/mapbox";
import Dropzone from "dropzone";
const edit = require("../assets/edit.png");
class ReportedPets extends HTMLElement {
  async connectedCallback() {
    this.render();
  }

  async getMyPets() {
    const myPets = await state.getMyPets();
    return myPets;
  }

  getPetInformation(container, array) {
    const edit = container.querySelectorAll(".edit-information");
    const petInfo = edit.forEach((i) => {
      i.addEventListener("click", async (e) => {
        const id = i.querySelector(".invisible-id");
        const selectedPet = array.filter((i) => {
          return i.id == id.textContent;
        });
        state.setSelectedPet(selectedPet[0]);
      });
    });
  }

  addListeners(lostPetsContainer) {
    const editInfo = lostPetsContainer.querySelectorAll(".edit-information");

    editInfo.forEach((i) => {
      i.addEventListener("click", (e) => {
        Router.go("/edit-pet");
      });
    });
  }

  async render() {
    const style = document.createElement("style");
    const myLostPets = document.createElement("div");
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
        max-height:65px;
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
        word-break:break-word;
      }
      .edit-information {
        margin-right:5px;
        cursor: pointer;
        display:flex;
        flex-direction:column;
        gap:5px;
      }

      .edit{
        height:30px;
        width:30px;
        align-self:end;
        margin-top:15px;
      }
      
      .status{
        margin:0;
      }
      
      .status.span.lost{
        color:red;
      }
      .status.span.found{
        color:green;
      }
      
      .invisible-id{
        display:none;
      }

      .loader{
        height:100%;
        margin:100px 0;
      }
      `;

    this.innerHTML = /*html*/ `
    <custom-header></custom-header>
    <div class="my-pets-page-container">
      <h1 class="title">Mis mascotas reportadas</h1>
      <custom-loader class="loader"></custom-loader>
    </div>
    `;

    this.appendChild(style);
    const petArray = await this.getMyPets();
    const petPageContainer = this.querySelector(".my-pets-page-container");
    const loader = this.querySelector(".loader");
    loader.remove();

    myLostPets.innerHTML = /*html*/ `
    ${
      petArray.length == 0
        ? /*html*/ `<h3 class="subtitle">AÚN NO REPORTASTE MASCOTAS PERDIDAS</h3>`
        : /*html*/ `
        <div class="lost-pet-card-container">
        ${petArray
          .map((i) => {
            return /*html*/ `
            <div class="card">
            <div class="img-container">
              <img class="pet-image" src="${i.pictureURL}" />
              <div class="pet-information">
                <div class="main-information-container">
                  <h1 class="pet-name">${i.name}</h1>
                  <span class="pet-location">${i.point_of_reference}</span>
                </div>
                <div class="edit-information">
                  <img class="edit" src="${edit}" />
                <div class="invisible-id">${i.id}</div>
                <p class="status">Estado:
                <span class="status span ${
                  i.status == "lost" ? "lost" : "found"
                }">
                ${i.status == "lost" ? "Perdido" : "Encontrado"}
                </span>
                </p>
                </div>
              </div>
            </div>
          </div>
          `;
          })
          .join(" ")}
        </div>
        `
    }
    `;

    const petInfo = this.getPetInformation(myLostPets, petArray);

    this.addListeners(myLostPets);

    petPageContainer.appendChild(myLostPets);
  }
}

customElements.define("reported-pets-page", ReportedPets);

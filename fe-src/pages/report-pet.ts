import { Router } from "@vaadin/router";
import { state } from "../state";
import * as mapboxgl from "mapbox-gl";
import { MAPBOX_TOKEN, mapboxClient } from "../lib/mapbox";
import Dropzone from "dropzone";
const defaultImage = require("../assets/default-image.png");
const husky = require("../assets/husky.jpg");
class ReportPet extends HTMLElement {
  async connectedCallback() {
    this.render();
  }

  addListeners() {
    let locationCoordinates;
    let picURL;
    const loader = document.querySelector(".loader");
    function initMap() {
      mapboxgl.accessToken = MAPBOX_TOKEN;
      return new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
      });
    }

    function initSearchForm(callback) {
      const form = document.querySelector(".form") as any;

      const searchInput = document.querySelector(".search-location") as any;
      const saveButton = document.querySelector(".button.save");
      searchInput.addEventListener("keyup", (e) => {
        e.preventDefault();
        const target = e.target as any;
        const event = e as any;
        if (event.keyCode === 13) {
          mapboxClient.geocodeForward(
            target.value,
            {
              country: "ar",
              autocomplete: true,
              language: "es",
            },
            function (err, data, res) {
              if (!err) callback(data.features);
            }
          );
        }
      });
      saveButton.addEventListener("click", (e) => {
        const target = e.target as any;
        if (!locationCoordinates && form["search-location"].value != "") {
          mapboxClient.geocodeForward(
            searchInput.value,
            {
              country: "ar",
              autocomplete: true,
              language: "es",
            },
            function (err, data, res) {
              if (!err) callback(data.features);
            }
          );
        }
      });
    }
    const map = initMap();
    initSearchForm(function (results) {
      const firstResult = results[0];
      const [lng, lat] = firstResult.geometry.coordinates;
      locationCoordinates = { lng, lat };
      const marker = new mapboxgl.Marker()
        .setLngLat(firstResult.geometry.coordinates)
        .addTo();
      map.setCenter(firstResult.geometry.coordinates);
      map.setZoom(17);
    });
    const dropzone = document.querySelector(".img-container");
    const picButton = document.querySelector(".button.pic");

    const myDropzone = new Dropzone(picButton, {
      url: "/falsa",
      autoProcessQueue: false,
      thumbnailWidth: 350,
      thumbnailHeight: 145,
      previewsContainer: dropzone,
    });
    myDropzone.on("thumbnail", (file) => {
      picURL = file.dataURL;
      const details = document.querySelector(".dz-details");
      const successMark = document.querySelector(".dz-success-mark");
      const errorMark = document.querySelector(".dz-error-mark");
      details.remove();
      successMark.remove();
      errorMark.remove();
    });

    const saveButton = document.querySelector(".button.save");
    const cancelButton = document.querySelector(".button.cancel");
    saveButton.addEventListener("click", async (e) => {
      const form = document.querySelector(".form") as any;
      const statusMessage = document.querySelector(".status-message");
      if (form.name.value == "") {
        statusMessage.textContent =
          "Por favor, ingrese el nombre de su mascota";
        statusMessage.classList.add("error");
        return false;
      }
      if (form["search-location"].value == "") {
        statusMessage.textContent =
          "Por favor, ingrese la última ubicación donde viste a tu mascota";
        statusMessage.classList.add("error");
        return false;
      }
      if (!picURL) {
        statusMessage.textContent = "Por favor, ingrese una foto de su mascota";
        statusMessage.classList.add("error");
        return false;
      }

      setTimeout(async () => {
        loader.classList.toggle("active");
        const newPetData = await state.reportLostPet({
          name: form.name.value,
          last_location_lat: locationCoordinates.lat,
          last_location_lng: locationCoordinates.lng,
          pictureURL: picURL,
          point_of_reference: form["search-location"].value.toUpperCase(),
        });
        statusMessage.classList.add("success");
        statusMessage.textContent = "Mascota reportada con éxito!";
        loader.classList.toggle("active");
      }, 500);
    });

    cancelButton.addEventListener("click", (e) => {
      Router.go("/home");
    });
  }

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

      .dz-hidden-input{
        height:100%;
        width:100%;
        position:initial;
        visibility:initial;
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
      
      .dz-preview.dz-image-preview {
        width:100%;
        height:100%;
      }

      .dz-image{
        width:100%;
        height:100%;
      }

      img[data-dz-thumbnail]{
        width:100%;
        height:100%;
        object-fit:cover;
      }
      
      
      .button{
        width:100%;
      }

      .
      
      .map{
        height:150px;
        width:100%;
      }

      @media (min-width:769px){
        .map{
          height:250px;
        }
      }
      
      .instructions{
        margin:0;
        font-weight:500;
        font-size:16px;
      }

      .status-message{
        font-weight:600;
        text-align:center;
      }

      .status-message.error{
        color:red;
      }

      .status-message.success{
        color:blue;
      }

      .loader{
        display:none;
      }
      
      .loader.active{
        display:initial;
      }
      
      `;

    this.innerHTML = /*html*/ `
    <custom-header></custom-header>
    <div class="report-pet-page-container">
     <h1 class="title">Reportar mascota perdida</h1>
     <form class="form">
     <label class="label-form">
     <div class="nombre">NOMBRE</div>
     <input placeholder="Ingresa el nombre de tu mascota" type="text" class="data-input name" name="name" required/>
     </label>
      <div class="img-container">
      </div>
      <custom-button color="#D1ADCF" class="button pic">Agregar/modificar foto</custom-button>
     <div id="map" class="map" style="width: 100%; height: 250px"></div>
     <label class="label-form">
     <div class="nombre">UBICACIÓN</div>
     <input type="text" class="data-input search-location" name="search-location" required/>
     </label>
     <p class="instructions">Buscá un punto de referencia para reportar a tu mascota. Puede ser una dirección, un barrio o una ciudad.</p>
     <span class="status-message"></span>
     <custom-button class="button save" color="#D1ADCF">Guardar</custom-button>
     <custom-button class="button cancel" color="#CDCDCD">Cancelar</custom-button>
     </form>
     <custom-loader class="loader"></custom-loader>
     </div>
    `;

    this.appendChild(style);
    this.addListeners();
  }
}

customElements.define("report-pet-page", ReportPet);

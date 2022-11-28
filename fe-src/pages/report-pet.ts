import { Router } from "@vaadin/router";
import { state } from "../state";

const defaultImage = require("../assets/default-image.png");
const husky = require("../assets/husky.jpg");
class ReportPet extends HTMLElement {
  async connectedCallback() {
    this.render();
  }

  addListeners() {
    let locationCoordinates;
    const MAPBOX_TOKEN =
      "pk.eyJ1IjoiZHlsYW5kZXYiLCJhIjoiY2xiMDNtbHBnMWZxazN2bnBvczJ5MnU0MyJ9.amcslgDMLVFcS3PrmpPSMA";
    const mapboxClient = new MapboxClient(MAPBOX_TOKEN);

    function initMap() {
      mapboxgl.accessToken = MAPBOX_TOKEN;
      return new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
      });
    }

    function initSearchForm(callback) {
      const searchInput = document.querySelector(".search-location");
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
    }

    window.map = initMap();
    initSearchForm(function (results) {
      const firstResult = results[0];
      const [lng, lat] = firstResult.geometry.coordinates;
      locationCoordinates = { lng, lat };
      const marker = new mapboxgl.Marker()
        .setLngLat(firstResult.geometry.coordinates)
        .addTo(map);
      map.setCenter(firstResult.geometry.coordinates);
      map.setZoom(17);
      console.log("hola ", locationCoordinates);
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
     <div id="map" class="map" style="width: 100%; height: 250px"></div>
     <label class="label-form">
     <div class="nombre">UBICACIÓN</div>
     <input type="text" class="data-input search-location" name="search-location" required/>
     </label>
     <p class="instructions">Buscá un punto de referencia para reportar a tu mascota. Puede ser una dirección, un barrio o una ciudad.</p>
     <custom-button class="button" color="#D1ADCF">Guardar</custom-button>
     <custom-button class="button" color="#CDCDCD">Cancelar</custom-button>
    </form>
     </div>
    `;

    this.appendChild(style);
    this.addListeners();
  }
}

customElements.define("report-pet-page", ReportPet);

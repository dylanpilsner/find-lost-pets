import { Router } from "@vaadin/router";
import { state } from "../state";
import * as mapboxgl from "mapbox-gl";
import { MAPBOX_TOKEN, mapboxClient } from "../lib/mapbox";
import Dropzone from "dropzone";

class EditPet extends HTMLElement {
  map: any;

  connectedCallback() {
    this.render();
  }

  initMap() {
    mapboxgl.accessToken = MAPBOX_TOKEN;
    return new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
    });
  }

  setValues() {
    const petInfo = state.getState().lastSelectedPet;
    const form = document.querySelector(".form") as any;
    const petImg = document.querySelector(".pet-img") as any;
    form.name.value = petInfo.name;
    form["search-location"].value = petInfo.point_of_reference;
    petImg.src = petInfo.pictureURL;

    const marker = new mapboxgl.Marker()
      .setLngLat([petInfo.last_location_lng, petInfo.last_location_lat])
      .addTo();
    this.map.setCenter([petInfo.last_location_lng, petInfo.last_location_lat]);
    this.map.setZoom(14);
  }

  addListeners() {
    const cs = state.getState();
    const form = document.querySelector(".form") as any;
    const petInfo = state.getState().lastSelectedPet;
    let locationCoordinates: any = [
      petInfo.last_location_lng,
      petInfo.last_location_lat,
    ];
    let picURL = petInfo.pictureURL;
    const loader = document.querySelector(".loader");

    //DROPZONE SECTION
    const dropzone = document.querySelector(".img");
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
      const petImg = document.querySelector(".pet-img");
      const dropzoneChilds = dropzone.childElementCount;

      if (dropzoneChilds > 1) {
        dropzone.firstElementChild.remove();
      }
      if (petImg) {
        petImg.remove();
      }
      details.remove();
      successMark.remove();
      errorMark.remove();
    });

    //MAP SECTION

    const searchInput = document.querySelector(".search-location") as any;
    const saveButton = document.querySelector(".button.save") as any;

    searchInput.addEventListener("keyup", (e) => {
      e.preventDefault();
      const target = e.target as any;
      const event = e as any;
      if (event.keyCode == 13 && target.value != "") {
        console.log(target.value);

        mapboxClient.geocodeForward(
          target.value,
          {
            country: "ar",
            autocomplete: true,
            language: "es",
          },
          (err, data, res) => {
            const firstResult = data.features[0];
            if (firstResult.geometry.coordinates) {
              locationCoordinates = firstResult.geometry.coordinates;
              console.log(locationCoordinates);
            }

            new mapboxgl.Marker()
              .setLngLat(firstResult.geometry.coordinates)
              .addTo(this.map);
            this.map.setCenter(firstResult.geometry.coordinates);
            this.map.setZoom(14);
          }
        );
      }
    });

    saveButton.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.target as any;
      const event = e as any;
      if (searchInput.value != "") {
        mapboxClient.geocodeForward(
          searchInput.value,
          {
            country: "ar",
            autocomplete: true,
            language: "es",
          },
          (err, data, res) => {
            const firstResult = data.features[0];
            locationCoordinates = firstResult.geometry.coordinates;

            new mapboxgl.Marker()
              .setLngLat(firstResult.geometry.coordinates)
              .addTo(this.map);
            this.map.setCenter(firstResult.geometry.coordinates);
            this.map.setZoom(14);
          }
        );
      }
    });

    // ACCIONES DE BOTONES----------------------------------------------------------------------------------------------------------------------------------------
    const foundButton = document.querySelector(".button.lost-found");
    const goHomeButton = document.querySelector(".button.go-home");
    const unpublish = document.querySelector(".unpublish");
    const statusMessage = document.querySelector(".status-message");
    saveButton.addEventListener("click", async (e) => {
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
        saveButton.remove();
        foundButton.remove();
        unpublish.remove();
        statusMessage.classList.add("success");

        await state.editPet({
          name: form.name.value,
          lat: locationCoordinates[1],
          lng: locationCoordinates[0],
          pictureURL: picURL,
          point_of_reference: form["search-location"].value.toUpperCase(),
        });

        statusMessage.textContent =
          "Información de mascota actualizada con éxito!";
        loader.classList.toggle("active");
        goHomeButton.classList.toggle("active");
      }, 500);
    });

    foundButton.addEventListener("click", async (e) => {
      const status = cs.lastSelectedPet.status == "lost" ? "found" : "lost";
      saveButton.remove();
      foundButton.remove();
      unpublish.remove();
      loader.classList.toggle("active");
      await state.updateStatus(status);
      statusMessage.classList.add("success");
      statusMessage.textContent = "Estado de mascota actualizado con éxito!";
      loader.classList.toggle("active");
      goHomeButton.classList.toggle("active");
    });

    unpublish.addEventListener("click", async (e) => {
      saveButton.remove();
      foundButton.remove();
      unpublish.remove();
      loader.classList.toggle("active");
      await state.deletePost();
      loader.classList.toggle("active");
      statusMessage.classList.add("success");
      statusMessage.textContent = "Mascota despublicada con éxito!";
      goHomeButton.classList.toggle("active");
    });

    goHomeButton.addEventListener("click", (e) => {
      Router.go("/home");
    });
  }

  render() {
    const style = document.createElement("style");
    const cs = state.getState();
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
      .img{
        height:100%;
        width:100%;
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

      .button.go-home{
        display:none;
      }
      .button.go-home.active{
        display:initial;
      }


  

      .pet-img {
        height:100%;
        width:100%;
        object-fit:cover;
      }

      .unpublish{
        font-size:16px;
        font-weight:500;
        text-decoration:underline;
        cursor:pointer;
        text-align:center;
      }
      
      .unpublish:hover{
        color:#FF3A3A;
      }
      
      
    `;

    this.innerHTML = /*html*/ `
    <custom-header></custom-header>
    <div class="report-pet-page-container">
      <h1 class="title">Editar info de mascota</h1>
      <form class="form">
        <label class="label-form">
          <div class="nombre">NOMBRE</div>
          <input
            placeholder="Ingresa el nombre de tu mascota"
            type="text"
            class="data-input name"
            name="name"
            required
          />
        </label>
        <div class="img-container">
          <div class="img">
            <img class="pet-img" />
          </div>
        </div>
        <custom-button color="#D1ADCF" class="button pic"
          >Modificar foto</custom-button
        >
        <div id="map" class="map" style="width: 100%; height: 250px"></div>
        <label class="label-form">
          <div class="nombre">UBICACIÓN</div>
          <input
            type="text"
            class="data-input search-location"
            name="search-location"
            required
          />
        </label>
        <p class="instructions">
          Buscá un punto de referencia para reportar a tu mascota. Puede ser una
          dirección, un barrio o una ciudad.
        </p>
        <span class="status-message"></span>
        <custom-button class="button save" color="#D1ADCF"
          >Guardar</custom-button
        >
        <custom-button class="button lost-found" color=${
          cs.lastSelectedPet.status == "lost" ? "#ADBDD1" : "#FF4949"
        }
          >${
            cs.lastSelectedPet.status == "lost"
              ? "Reportar como encontrado"
              : "Reportar como perdido"
          }</custom-button
        >
        <span class="unpublish">DESPUBLICAR</span>
        <custom-button class="button go-home">Ir a la home</custom-button>
      </form>
      <custom-loader class="loader"></custom-loader>
    </div>
    `;

    this.appendChild(style);
    this.map = this.initMap();
    this.addListeners();
    this.setValues();
  }
}

customElements.define("edit-pet-page", EditPet);

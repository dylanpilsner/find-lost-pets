import { state } from "../state";
const closeImg = require("../assets/close.png");

class Home extends HTMLElement {
  connectedCallback() {
    state.subscribe(async () => {
      const lostPetsContainer = document.querySelector(
        ".lost-pet-cards-container"
      );
      const noNearPets = document.querySelector(".no-near-pets-container");

      if (!lostPetsContainer && !noNearPets && location.pathname == "/home") {
        await this.addNearLostPets();
      }
    });
    this.render();
  }

  async addNearLostPets() {
    const lostPetsContainer = document.createElement("div");
    const noNearPets = document.createElement("div");
    const lostPetsSection = document.querySelector(".lost-pets");
    const loader = document.querySelector(".loader");
    let modelCardId;
    lostPetsContainer.classList.add("lost-pet-cards-container");
    noNearPets.classList.add("no-near-pets-container");
    loader.classList.toggle("active");
    const nearLostPets = await state.getNearLostPets();
    loader.classList.toggle("active");

    noNearPets.innerHTML = /*html*/ `
    <h3 class="no-near-pets">No hay mascotas perdidas cerca de tu ubicación</h3>
    `;

    lostPetsContainer.innerHTML = /*html*/ `

    ${nearLostPets
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
            <div class="report-information-container">
              <span class="report-information-link"
                >REPORTAR <br />
                INFORMACIÓN</span
              >
              <span class="invisible-id">${i.id}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="report-information id${i.id}">
        <div class="report-information-modal-card">
          <div class="modal-head">
            <img src="${closeImg}" class="close-model" />
          </div>
          <div class="informartion-container">
            <h1 class="title report">Reportar info <br />de ${i.name}</h1>
          </div>
          <form class="report-form">
            <label class="form-label">
              <div class="field-label">TU NOMBRE</div>
              <input type="text" class="form-input" name="name" required />
            </label>
            <label class="form-label">
              <div class="field-label">TU TELÉFONO</div>
              <input type="number" class="form-input" name="phone" required />
            </label>
  
            <label class="form-label">
              <div class="field-label">DÓNDE LO VISTE?</div>
              <textarea class="form-textarea" name="description" required></textarea>
            </label>
            <custom-loader class="report-loader id${i.id}"></custom-loader>
            <span class="status-message id${i.id}"></span>
            <button class="invisible-button">
            <custom-button class="button send">Enviar</custom-button>
            </button>
          </form>
          <div class="modal-foot"></div>
        </div>
      </div>
      `;
      })
      .join(" ")}
    `;

    if (nearLostPets.length == 0) {
      lostPetsSection.appendChild(noNearPets);
    } else {
      lostPetsSection.appendChild(lostPetsContainer);
    }

    const reportInformationButton = lostPetsContainer.querySelectorAll(
      ".report-information-container"
    );
    reportInformationButton.forEach((i) => {
      i.addEventListener("click", (e) => {
        const id = i.querySelector(".invisible-id");

        const selectedPet = nearLostPets.filter((i) => {
          return i.id == id.textContent;
        });
        state.setSelectedPet(selectedPet[0]);
        modelCardId = selectedPet[0].id;
        const reportModel = this.querySelector(
          `.report-information.id${modelCardId}`
        );
        reportModel.classList.toggle("active");
      });
    });

    const closeModel = lostPetsContainer.querySelectorAll(".close-model");

    closeModel.forEach((i) => {
      i.addEventListener("click", (e) => {
        const reportModel = lostPetsContainer.querySelector(
          `.report-information.id${modelCardId}`
        );

        reportModel.classList.toggle("active");
      });
    });

    const forms = document.querySelectorAll(".report-form");
    forms.forEach((i) => {
      i.addEventListener("submit", async (e) => {
        e.preventDefault();
        const target = e.target as any;
        const petId = state.getState().lastSelectedPet.id;
        const reportLoader = document.querySelector(
          `.report-loader.id${petId}`
        );
        const statusMessage = document.querySelector(
          `.status-message.id${petId}`
        );

        reportLoader.classList.toggle("active");
        const email = await state.sendLastSeenReport(
          target.phone.value,
          target.description.value,
          target.name.value
        );
        reportLoader.classList.toggle("active");
        statusMessage.classList.toggle("active");
        statusMessage.textContent = "Reporte enviado con éxito!";
        target.reset();
      });
    });
  }

  addListeners() {
    const button = this.querySelector(".button");
    button.addEventListener("click", async (e) => {
      navigator.geolocation.getCurrentPosition((geoposition) => {
        const lat = geoposition.coords.latitude;
        const lng = geoposition.coords.longitude;
        state.setGeolocation(lat, lng);
      });

      const locationPermission = this.querySelector(
        ".get-location-information"
      );
      locationPermission.remove();
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

    @media (min-width:769px){
      .title{
        text-align:center;
      }
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


    .no-near-pets{
      margin-left:20px;
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

    @media (min-width:769px){
      .lost-pet-cards-container{
        display:grid;
        gap:50px;
        grid-template-columns:1fr 1fr ;
      }
    }
    
    @media (min-width:1366px){
      .lost-pet-cards-container{
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
      color: #5f83c7;
      cursor: pointer;
      text-decoration: underline;
      font-weight:500;
    }

    .report-information-link:hover{
      color:#3E91DD;
    }
    
    .invisible-id{
      display:none;
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
      width:100%;
      display:flex;
      flex-direction:column;
      align-items:center;
      gap:30px;
      justify-content:center;
    }
    .form-label {
      width:80%
    }
    .field-label {
      font-size:16px;
      font-weight:500;
    }
    .form-input {
      height:50px;
      width:100%;
      border:2px solid black;
      border-radius:4px;
      font-family:Poppins;
      font-size:16px;
    }
    .form-textarea {
      font-family:Poppins;
      font-size:16px;
      height:127px;
      width:100%;
      border:2px solid black;
      border-radius:4px;
    }

    .invisible-button{
      width:80%;
      background-color:transparent;
      border:none;
      margin-bottom:20px;
    }
    
    
    .button.send{
      width:100%;
      margin-bottom:15px;
    }

    .loader{
      display:none;
    }
    
    .loader.active{
      display:initial;
    }
    
    .report-loader{
      display:none;
    }
    .report-loader.active{
      display:initial;
    }


    .status-message{
      display:none;
    }

    .status-message.active{
      display:initial;
      color:green;
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
      <custom-loader class="loader"></custom-loader>
    </section>
    `;

    const cs = state.getState();

    this.appendChild(style);
    this.addListeners();
    if (cs.geolocation.latitude != "" && cs.geolocation.longitude != "") {
      this.addNearLostPets();
    }
  }
}

customElements.define("home-page", Home);

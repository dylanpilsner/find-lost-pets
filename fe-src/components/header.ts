const logo = require("../assets/logo.png");

class Header extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  addListeners() {}

  render() {
    const shadow = this.attachShadow({ mode: "open" });
    const header = document.createElement("header");
    const style = document.createElement("style");
    header.classList.add("header");
    style.innerHTML =
      /*css*/
      `
        .header{
          height:90px;
          background-color:#79927a;
          display:flex;
          border-bottom:1px solid black;
          align-items: center;
          padding:0 10%;
          justify-content: space-between;
        }

        .logo-container{
          height:100%;
        }
        
        .logo{
          height:55px;
        }

        .open-nav-menu{
          width:55px;
          height:55px;
          display:flex;
          flex-direction:column;
          justify-content:center;
          gap:10px;
          cursor:pointer;
        }
        
        .hamburger-top-bread {
          width:100%;
          height:6px;
          border-radius:4px;
          background-color:black;
        }
        .hamburger-top-patty {
          width:100%;
          height:6px;
          border-radius:4px;
          background-color:black;
        }
        .hamburger-bottom-bread {
          width:100%;
          height:6px;
          border-radius:4px;
          background-color:black;
        }
        
        .nav-menu {
          position:absolute;
          height:100%;
          width:100%;
          background-color:#D1ADCF;
          top:0;
          left:0;
        }

        .nav-item {
          font-size:24px;
          font-weight:700;
        }
        .account-container {
        }
        .user {
          font-size:24px;
          font-weight:400;
        }
        .sign {
        }
        
      `;

    header.innerHTML =
      /*html*/
      `
     <img class="logo" src=${logo} />
     <div class="open-nav-menu">
     <div class="hamburger-top-bread"></div>
     <div class="hamburger-top-patty"></div>
     <div class="hamburger-bottom-bread"></div>
     </div>
     <nav class=nav-menu>
     <nav class="nav-item">Mis datos</nav>
     <nav class="nav-item">Mis mascotas reportadas</nav>
     <nav class="nav-item">Reportar mascota</nav>
     <div class="account-container">
     <span class="user">Invitadx</span>
     </div>
     <a class="sign" href="">INICIAR SESIÓN</a>
     </nav>
    `;

    shadow.appendChild(header);
    shadow.appendChild(style);
  }
}

customElements.define("custom-header", Header);

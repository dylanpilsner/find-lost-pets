import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  {
    path: "/home",
    component: "home-page",
  },
  {
    path: "/auth-page",
    component: "auth-page",
  },
  {
    path: "/profile",
    component: "profile-page",
  },
  {
    path: "/my-reported-pets",
    component: "reported-pets-page",
  },
  {
    path: "/report-pet",
    component: "report-pet-page",
  },
  {
    path: "/edit-pet",
    component: "edit-pet-page",
  },
]);
if (location.pathname == "/") {
  Router.go("/home");
}

export { Router };

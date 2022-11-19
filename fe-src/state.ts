const API_BASE_URL = "http://localhost:3000";

const state = {
  data: {
    geolocation: {
      latitude: "",
      longitude: "",
    },
  },
  listeners: [],

  getState() {
    return this.data;
  },

  setGeolocation(lat, lng) {
    const cs = this.getState();
    cs.geolocation.latitude = lat;
    cs.geolocation.longitude = lng;
    this.setState(cs);
  },

  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    console.log("Soy el state, he cambiado");
    console.log(this.data);
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };

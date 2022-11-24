const API_BASE_URL = process.env.API_BASE_URL;

const state = {
  data: {
    geolocation: {
      latitude: "",
      longitude: "",
    },
    email: "",
    token: "",
  },
  listeners: [],

  init() {
    const state = JSON.parse(localStorage.getItem("saved-state"));

    if (state) {
      this.setState(state);
    }
  },

  getState() {
    return this.data;
  },

  setGeolocation(lat: number, lng: number) {
    const cs = this.getState();
    cs.geolocation.latitude = lat;
    cs.geolocation.longitude = lng;
    this.setState(cs);
  },

  async verifyEmail(email: string) {
    const fetching = await fetch(`${API_BASE_URL}/verify-user`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await fetching.json();

    return data.verifiedEmail;
  },

  async authenticate(email: string, password: string) {
    const fetching = await fetch(`${API_BASE_URL}/user/token`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await fetching.json();
    return data;
  },

  setAccountInformation(email: string, token: string) {
    const cs = state.getState();
    cs.email = email;
    cs.token = token;
    this.setState(cs);
  },

  signOut() {
    const cs = this.getState();
    cs.email = "";
    cs.token = "";
    this.setState(cs);
  },

  setState(newState: Object) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    console.log("Soy el state, he cambiado");
    console.log(this.data);
    localStorage.setItem("saved-state", JSON.stringify(newState));
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };

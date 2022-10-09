import { Modal } from "./UI/Modal.js";
import { Map } from "./UI/Map.js";
import {
  getCoordsFromAddress,
  getAddressFromCoords,
} from "./Utility/Location.js";

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");
    this.shareBtn = document.getElementById("share-btn");
    this.menu = document.getElementById("menu");
    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    this.shareBtn.addEventListener("click", this.sharePlaceHandler);
    addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
  }

  sharePlaceHandler() {
    const sharedLinkInputElement = document.getElementById("share-link");
    if (!navigator.clipboard) {
      sharedLinkInputElement.select();
      return;
    }

    navigator.clipboard.writeText(sharedLinkInputElement.value)
      .then(() => {
        Swal.fire({
          title: "Copied to clipboard!",
          text: "Share this link with your friends!",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch(err => {
        console.log(err);
        sharedLinkInputElement.select();
      })
  }

  selectPlace(coordinates, address) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
    this.shareBtn.disabled = false;
    this.menu.style.display = 'flex';
    const sharedLinkInputElement = document.getElementById("share-link");
    const uriAddress = encodeURI(address);
    sharedLinkInputElement.value = `${location.origin}/my-place?address=${uriAddress}&lat=${coordinates.lat}&lng=${coordinates.lng}`;
  }

  locateUserHandler() {
    //Incase the browser does not support geolocation
    if (!navigator.geolocation) {
      Swal.fire({
        icon: 'info',
        title: 'Geolocation is not supported by your browser',
        showConfirmButton: false,
        timer: 1500,
      })
      return;
    }
    const modal = new Modal("loading-modal-content", "Loading Location...");
    modal.show();
    navigator.geolocation.getCurrentPosition(
      async (successResult) => {
        const coordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };
        const address = await getAddressFromCoords(coordinates);
        console.log(coordinates);
        modal.hide();
        this.selectPlace(coordinates, address);
      },
      (error) => {
        modal.hide();
        Swal.fire({
          icon: 'error',
          text: 'Unable to fetch location, please enter the location manually',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    );
  }

  async findAddressHandler(event) {
    event.preventDefault();
    const address = event.target.querySelector("input").value;
    if (!address || address.trim().length === 0) {
      Swal.fire({
        icon: 'error',
        text: 'Please enter a valid address',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    const modal = new Modal("loading-modal-content", "Loading Location...");
    modal.show();
    try {
      const coordinates = await getCoordsFromAddress(address);
      this.selectPlace(coordinates, address);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: err.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    modal.hide();
  }
}
new PlaceFinder();

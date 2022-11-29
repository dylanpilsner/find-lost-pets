import { index } from "../lib/algolia";
import * as models from "../models/models";
import { cloudinary } from "../lib/cloudinary";

export async function createNewReportedPet(petData: {
  name: string;
  last_location_lat: number;
  last_location_lng: number;
  pictureURL: string;
  userId: number;
  point_of_reference: string;
}) {
  const {
    name,
    last_location_lat,
    last_location_lng,
    pictureURL,
    userId,
    point_of_reference,
  } = petData;

  if (!name) {
    throw "Falta nombre de mascota";
  }
  if (!last_location_lat) {
    throw "Falta última latitud de mascota";
  }
  if (!last_location_lng) {
    throw "Falta última longitud de mascota";
  }
  if (!pictureURL) {
    throw "Falta imagen de mascota";
  }
  if (!userId) {
    throw "Falta userId de mascota";
  }

  const img = await cloudinary.uploader.upload(pictureURL, {
    resource_type: "image",
    discard_original_filename: true,
    width: 1000,
  });

  const reportPet = await models.Pet.create({
    name,
    last_location_lat,
    last_location_lng,
    point_of_reference,
    status: "lost",
    pictureURL: img.secure_url,
    userId,
  });

  const reportPetAlgolia = await index.saveObject({
    objectID: reportPet.get("id"),
    name: reportPet.get("name"),
    _geoloc: {
      lat: reportPet.get("last_location_lat"),
      lng: reportPet.get("last_location_lng"),
    },
    status: reportPet.get("status"),
    userId: reportPet.get("userId"),
    point_of_reference: reportPet.get("point_of_reference"),
  });

  return { reportPet, reportPetAlgolia };
}

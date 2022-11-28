import { index } from "../lib/algolia";
import * as models from "../models/models";

export async function createNewReportedPet(petData: {
  name: string;
  last_location_lat: number;
  last_location_lng: number;
  pictureURL: string;
  userId: number;
}) {
  const { name, last_location_lat, last_location_lng, pictureURL, userId } =
    petData;

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

  const reportPet = await models.Pet.create({
    name,
    last_location_lat,
    last_location_lng,
    status: "lost",
    pictureURL,
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
  });

  return { reportPet, reportPetAlgolia };
}

import { index } from "../lib/algolia";
import * as models from "../models/models";
import { cloudinary } from "../lib/cloudinary";
import { parse } from "path";
import { INTEGER } from "sequelize";

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

export async function editPet(petData: {
  name: string;
  last_location_lat: number;
  last_location_lng: number;
  pictureURL: string;
  point_of_reference: string;
  id: number;
}) {
  const {
    name,
    last_location_lat,
    last_location_lng,
    pictureURL,
    point_of_reference,
    id,
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
  if (!id) {
    throw "Falta id de mascota";
  }

  const img = await cloudinary.uploader.upload(pictureURL, {
    resource_type: "image",
    discard_original_filename: true,
    width: 1000,
  });

  const updatedInfo = {
    name,
    last_location_lat,
    last_location_lng,
    point_of_reference,
    pictureURL: img.secure_url,
  };

  const editPet = await models.Pet.update(updatedInfo, {
    where: {
      id,
    },
  });

  const editPetAlgolia = await index.partialUpdateObject({
    objectID: id,
    name,
    _geoloc: {
      lat: last_location_lat,
      lng: last_location_lng,
    },
    point_of_reference,
  });

  return { editPet, editPetAlgolia };
}

type status = "lost" | "found";
export async function changetPetStatus(status: status, id: number) {
  if (!status) {
    throw "status necesario";
  }
  if (!id) {
    throw "id necesario";
  }

  const statusPet = await models.Pet.update(
    { status },
    {
      where: {
        id,
      },
    }
  );

  const statusPetAlgolia = await index.partialUpdateObject({
    objectID: id,
    status,
  });

  return { statusPet, statusPetAlgolia };
}

export async function deletePost(id: number) {
  const deletedPost = await models.Pet.destroy({
    where: {
      id: id,
    },
  });

  const deletedPetAlgolia = await index.deleteObject(id.toString());

  return { deletedPost, deletedPetAlgolia };
}

export async function getNearLostPets(lat: number, lng: number) {
  if (!lat) {
    throw "La latitud es necesaria";
  }
  if (!lng) {
    throw "La longitud es necesaria";
  }

  const { hits } = await index.search("", {
    aroundLatLng: [lat, lng].join(","),
    aroundRadius: 10000,
  });

  const ids = hits.map((i) => {
    return i.objectID;
  });

  const nearLostPets = await models.Pet.findAll({
    where: {
      id: ids,
      status: "lost",
    },
  });

  return nearLostPets;
}

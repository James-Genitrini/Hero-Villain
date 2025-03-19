import axiosService from './axios.service';

const getHeroAliases = async () => {
  try {
    const aliases = await axiosService.get('/heroes/getaliases');
    console.log("Succès ! Liste des héros récupérée :", aliases);
    return aliases; 
  } catch (error) {
    console.error("Erreur lors de la récupération des alias des héros :", error.message);
    throw error; 
  }
};

const getHeroById = async (id, organizationSecret) => {
  try {
    const url = `/heroes/getbyid/${id}`;
    const response = await axiosService.get(url, {
      params: {
        secret: organizationSecret,
      },
    });
    console.log("Succès ! Héros récupéré :", response.data);
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération du héros :", error.message);
    throw error;
  }
};

const createHero = async (data) => {
  const heroes = await axiosService.post('heroes/create', data);
  return heroes;
};

const updateHero = async (data, organizationSecret) => {
  try {
    const url = '/heroes/update';
    const response = await axiosService.put(url, data, {
      headers: {
        'org-secret': organizationSecret, 
      },
    });
    console.log("Succès ! Héros mis à jour :", response.data);
    return response.data; 
  } catch (error) {
    console.error("Erreur lors de la mise à jour du héros :", error.message);
    throw error;
  }
};

export default {
  getHeroAliases,
  createHero,
  getHeroById,
  updateHero, 
};

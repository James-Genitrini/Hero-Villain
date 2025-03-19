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

const getHeroById = async (heroId, orgSecret) => {
  try {
    const response = await axiosService.get(
      `/heroes/getbyid/${heroId}?org-secret=${orgSecret}`
    );
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

const updateHero = async (heroData, orgSecret) => {
  try {
    const response = await axiosService.put(
      `/heroes/update?org-secret=${orgSecret}`,
      heroData
    );
    return response;
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

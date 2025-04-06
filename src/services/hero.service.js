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

const getHeroById = async (heroId) => {
  try {
    const response = await axiosService.get(`/heroes/getbyid/${heroId}`);
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération du héros :", error.message);
    throw error;
  }
};


const createHero = async (data) => {
  try {
    const heroes = await axiosService.post('heroes/create', data);
    return heroes;
  } catch (error) {
    console.error("Erreur lors de la création du héros :", error.message);
    throw error; 
  }
};


const updateHero = async (heroData) => {
  try {
    const response = await axiosService.put(`/heroes/update`, heroData);
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

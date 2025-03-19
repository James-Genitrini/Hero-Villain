import axiosService from './axios.service';

const getTeams = async () => {
    try {
        const teams = await axiosService.get('/teams/get');
        console.log("🚀 Succès ! Liste des teams récupérée :", teams);
        return teams;
    } catch (error) {
        console.error("💥 Erreur lors de la récupération des teams :", error.message);
        throw error;
    }
};

const createTeam = async (data) => {
    try {
        const response = await axiosService.post('/teams/create', data);
        console.log("✅ Équipe créée avec succès !");
        return response;
    } catch (error) {
        console.error("💥 Erreur lors de la création de l'équipe :", error.message);
        throw error;
    }
};

const addHeroesToTeam = async (data) => {
    try {
        const response = await axiosService.patch('/teams/addheroes', data);
        console.log("✅ Héros ajoutés avec succès !");
        return response;
    } catch (error) {
        console.error("💥 Erreur lors de l'ajout des héros à l'équipe :", error.message);
        throw error;
    }
};

const removeHeroesFromTeam = async (data) => {
    try {
        const response = await axiosService.patch('/teams/removeheroes', data);
        console.log("✅ Héros supprimés avec succès !");
        return response;
    } catch (error) {
        console.error("💥 Erreur lors de la suppression des héros de l'équipe :", error.message);
        throw error;
    }
};

export default {
    getTeams,
    createTeam,
    addHeroesToTeam,
    removeHeroesFromTeam
};

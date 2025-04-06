import axiosService from './axios.service';

const getAllOrgs = async () => {
  try {
    const response = await axiosService.get('/orgs/get');
    console.log("Succès ! Liste des organisations récupérée :", response.data);
    return response.data; 
  } catch (error) {
    console.error("Erreur lors de la récupération des organisations :", error.message);
    throw error;  
  }
};

const createOrg = async (data) => {
  try {
    const response = await axiosService.post('orgs/create', data);
    console.log("Organisation créée avec succès :", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de l'organisation :", error.message);
    throw error; 
  }
};

const addTeamToOrg = async (teamId) => {
  try {
    const response = await axiosService.patch(
      `/orgs/addteam`, 
      { idTeam: teamId }
    );
    return response; 
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'équipe à l'organisation :", error.message);
    throw error; 
  }
};

const removeTeamFromOrg = async (teamId) => {
  try {
    const response = await axiosService.patch(
      `/orgs/removeteam`, 
      { idTeam: teamId }
    );
    return response;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'équipe de l'organisation :", error.message);
    throw error;  
  }
};

const getOrgById = async (orgId) => {
  try {
    const response = await axiosService.get(`/orgs/getbyid/${orgId}`);
    return response.data[0]; 
  } catch (error) {
    console.error("Erreur lors de la récupération de l'organisation :", error.message);
    throw error.response?.data || error; 
  }
};

export default {
  getAllOrgs,
  createOrg,
  addTeamToOrg,
  removeTeamFromOrg,
  getOrgById,
};

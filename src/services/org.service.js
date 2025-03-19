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

const addTeamToOrg = async (orgSecret, teamId) => {
      const response = await axiosService.patch(
        `/orgs/addteam?org-secret=${orgSecret}`, 
        { idTeam: teamId }
      );
      return response; 
  };
    

const removeTeamFromOrg = async (orgId, teamId, secret) => {
  try {
    const response = await axiosService.patch(`/orgs/removeteam?org-secret=${secret}`, { idTeam: teamId });
    console.log("Équipe supprimée de l'organisation avec succès :", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'équipe de l'organisation :", error.message);
    throw error;
  }
};

const getOrgById = async (orgId, secret) => {
  try {
    const response = await axiosService.get(`/orgs/getbyid/${orgId}?org-secret=${secret}`);
    console.log("Organisation récupérée avec succès :", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des détails de l'organisation :", error.message);
    throw error;
  }
};

export default {
  getAllOrgs,
  createOrg,
  addTeamToOrg,
  removeTeamFromOrg,
  getOrgById,
};
import axios from 'axios';

const API_URL = 'https://apidemo.iut-bm.univ-fcomte.fr/authapi';
const API_URL_2 = 'https://apidemo.iut-bm.univ-fcomte.fr/herocorp';

class UserService {
    async login(login, password) {
        try {
            const body = { login, password };
            const response = await axios.post(`${API_URL}/auth/signin`, body, {
                withCredentials: true,
            });

            if (response.data.error === 0) {
                const user = response.data.data;
                localStorage.setItem('xsrfToken', user.xsrfToken);
                localStorage.setItem('login', user.name);
                return user;
            } else {
                throw new Error(response.data.data || 'Erreur inconnue lors de la connexion');
            }
        } catch (error) {
            if (error.response?.data) {
                console.error('Erreur de connexion détaillée:', JSON.stringify(error.response.data, null, 2));
            } else {
                console.error('Erreur de connexion (générale) :', error.message);
            }
            throw new Error('Erreur lors de la connexion: ' + (error.response ? JSON.stringify(error.response.data) : error.message));
        }
    }

    async getUserInfo(login) {
        const xsrfToken = localStorage.getItem('xsrfToken');
        if (!xsrfToken) {
            throw new Error('Token XSRF manquant');
        }

        try {
            const response = await axios.get(`${API_URL}/user/getuser/${login}`, {
                headers: {
                    'x-xsrf-token': xsrfToken,
                },
                withCredentials: true,
            });

            if (response.data.error === 0) {
                return response.data.data;
            } else {
                throw new Error(response.data.data || 'Erreur inconnue lors de la récupération des informations utilisateur');
            }
        } catch (error) {
            console.error('Erreur de récupération des informations utilisateur détaillée:', error.response || error.message);
            throw new Error('Erreur lors de la récupération des informations utilisateur: ' + (error.response ? JSON.stringify(error.response.data) : error.message));
        }
    }

    async updateAuthenticatedHero(heroData) {
        const xsrfToken = localStorage.getItem("xsrfToken");

        try {
            const body = {
                _id: heroData._id,
                publicName: heroData.publicName,
                realName: heroData.realName,
                powers: heroData.powers.map(power => ({
                    name: power.name,
                    type: power.type || 1,
                    level: power.level || 0
                })),
            };
            console.log("Body sent to API:", body); // Affiche le corps de la requête
            const response = await axios.put(`${API_URL_2}/heroes/authupdate`, body, {
                headers: {
                    "x-xsrf-token": xsrfToken,
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (response.data.error === 0) {
                return response.data.data;
            } else {
                throw new Error(response.data.data || "Erreur API");
            }
        } catch (error) {
            console.error("Erreur update hero auth:", error);
            throw new Error("Échec de la mise à jour auth.");
        }
    }

    async register(param) {
        try {
            const body = {
                login: param.login,
                password: param.password,
                hero: param.hero,
                captchaToken: param.captchaToken,
            };
            const response = await axios.post(`${API_URL}/user/register`, body, {
                headers: {
                    'x-xsrf-token': localStorage.getItem('xsrfToken'),
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            if (response.data.error === 0) {
                return response.data.data;
            } else {
                throw new Error(response.data.data || 'Erreur inconnue lors de l\'inscription');
            }
        } catch (error) {
            console.error('Erreur d\'inscription:', error);
            throw new Error('Erreur lors de l\'inscription: ' + error.message);
        }
    }
}

export default new UserService();

const axios = require("axios");

const config = {
    headers: { Authorization: `Bearer ${process.env.CLASH_API_KEY}` }
}

const getClanInfo = async (clanTag) => {
    return new Promise(async (resolve, reject) => {
        try{
            const response = await axios.get(
                'https://api.clashofclans.com/v1/clans/' + clanTag,
                config
            );
            resolve({
                "status": response.status,
                "data": response.data
            });
        }catch(e){
            if(e.response){
                const errorMsg = {
                    "status": e.response.status,
                    "data": e.response.data
                }
                return reject(errorMsg) // think about throwing errors instead!!!
            }
            reject({ error: "Something went wrong!" });
        }
    });
}

const getMembers = async (clanTag) => {
    return new Promise(async (resolve, reject) => {
        try{
            const response = await axios.get(
                'https://api.clashofclans.com/v1/clans/' + clanTag + '/members',
                config
            );
            resolve({
                "status": response.status,
                "data": response.data
            });
        }catch(e){
            if(e.response){
                const errorMsg = {
                    "status": e.response.status,
                    "data": e.response.data
                }
                return reject(errorMsg)
            }
            reject({ error: "Something went wrong!" });
        }
    });
}

const getPlayer = (playerTag) => {
    return new Promise(async (resolve, reject) => {
        try{
            const response = await axios.get(
                'https://api.clashofclans.com/v1/players/' + playerTag,
                config
            );
            resolve({
                "status": response.status,
                "data": response.data
            });
        }catch(e){
            if(e.response){
                const errorMsg = {
                    "status": e.response.status,
                    "data": e.response.data
                }
                return reject(errorMsg)
            }
            reject({ error: "Something went wrong!" });
        }
    });
}

const getWarLog = (clanTag) => {
    return new Promise(async (resolve, reject) => {
        try{
            const response = await axios.get(
                'https://api.clashofclans.com/v1/clans/' + clanTag + '/warlog',
                config
            );
            resolve({
                "status": response.status,
                "data": response.data
            });
        }catch(e){
            if(e.response){
                const errorMsg = {
                    "status": e.response.status,
                    "data": e.response.data
                }
                return reject(errorMsg)
            }
            reject({ error: "Something went wrong!" });
        }
    });
}

const getCurrentWar = (clanTag) => {
    return new Promise(async (resolve, reject) => {
        try{
            const response = await axios.get(
                'https://api.clashofclans.com/v1/clans/' + clanTag + '/currentwar',
                config
            );
            resolve({
                "status": response.status,
                "data": response.data
            });
        }catch(e){
            if(e.response){
                const errorMsg = {
                    "status": e.response.status,
                    "data": e.response.data
                }
                return reject(errorMsg)
            }
            reject({ error: "Something went wrong!" });
        }
    });
}

module.exports = {
    getClanInfo,
    getMembers,
    getPlayer,
    getWarLog,
    getCurrentWar
}
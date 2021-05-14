const axios = require("axios");

const config = {
    headers: { Authorization: `Bearer ${process.env.CLASH_API_KEY}` }
}

const getClanInfo = async (clanTag) => {
    return new Promise(async (resolve, reject) => {
        try{
            const {data = {}} = await axios.get(
                'https://api.clashofclans.com/v1/clans/' + clanTag,
                config
            );
            resolve(data);
        }catch(e){
            if(e.response){
                const errorMsg = {
                    "status": e.response.status,
                    "reason": e.response.data.reason
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
            const {data = {}} = await axios.get(
                'https://api.clashofclans.com/v1/players/' + playerTag,
                config
            );
            resolve(data);
        }catch(e){
            if(e.response){
                const errorMsg = {
                    "status": e.response.status,
                    "reason": e.response.data.reason
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
            const {data = {}} = await axios.get(
                'https://api.clashofclans.com/v1/clans/' + clanTag + '/warlog',
                config
            );
            resolve(data);
        }catch(e){
            if(e.response){
                const errorMsg = {
                    "status": e.response.status,
                    "reason": e.response.data.reason
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
            const {data = {}} = await axios.get(
                'https://api.clashofclans.com/v1/clans/' + clanTag + '/currentwar',
                config
            );
            resolve(data);
        }catch(e){
            if(e.response){
                const errorMsg = {
                    "status": e.response.status,
                    "reason": e.response.data.reason
                }
                return reject(errorMsg)
            }
            reject({ error: "Something went wrong!" });
        }
    });
}

module.exports = {
    getClanInfo,
    getPlayer,
    getWarLog,
    getCurrentWar
}
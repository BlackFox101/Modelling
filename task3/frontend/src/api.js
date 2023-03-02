import axios from "axios";

const API_URL = process.env.REACT_APP_URL + '/api';

console.log(API_URL);

const getLinks = async () => {
    try {
        const res = await axios.get(`${API_URL}/links`);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

const createLink = async (url) => {
    try {
        const domain = (new URL(url));

        const linkObj = {
            "link": url,
            "name": domain.hostname,
            "authorName": ""
        }

        const res = await axios.post(`${API_URL}/links`, linkObj);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

const deleteLink = async (id) => {
    try {
        const res = await axios.delete(`${API_URL}/links/${id}`)
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export {getLinks, createLink, deleteLink}
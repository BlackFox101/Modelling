import React, {useEffect, useState} from "react";
import "./App.css";

import {createLink, deleteLink, getLinks} from "./api";

const API_URL = process.env.REACT_APP_URL;
const INVALID_CLASS = 'invalid';

const isValidUrl = (url) => {
    const objRE = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    return objRE.test(url);
}

function App() {
    const [links, setLinks] = useState([]);

    useEffect(() => {
        updateLinkList()
    }, []);

    const updateLinkList = () =>{
        getLinks().then((data) => {
            setLinks(Object.entries(data));
        });
    }

    const createNewLink = () => {
        const input = document.querySelector('#newLink');
        let url = input.value;
        if (!isValidUrl(url)) {
            url = "https://" + url;
            if (!isValidUrl(url)) {
                console.log(`"${url}" is invalid`);
                input.classList.add(INVALID_CLASS);
                return;
            }
        }
        input.classList.remove(INVALID_CLASS);

        input.value = "";
        createLink(url).then(() => updateLinkList());
    }

    const deleteUrl = (id) => {
        deleteLink(id).then(() => updateLinkList())
    }

    return (
        <div className="container">
            <h1>Сервис сокращения ссылок</h1>
            <div>
                <input id="newLink" type="text" placeholder="Введите ссылку"/>
                <button onClick={() => createNewLink()} >Сохранить</button>
            </div>
            <div>
                <ul>
                    {links.map(([id, value]) => {
                        const link = `${API_URL}/${value.shortLink}`;
                        return (
                            <li>
                                <a className={link} id={id} href={link}>{link}</a>
                                <button onClick={() => deleteUrl(id)}>Delete</button>
                            </li>
                        )}
                    )}
                </ul>
            </div>
        </div>
    );
}

export default App;

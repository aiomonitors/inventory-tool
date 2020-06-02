import React from 'react';
import { ipcRenderer } from 'electron';
import '../styles/Trafic.scss';

const Traffic = () => {
    const closeWindow = () => {
        ipcRenderer.send('close-main-window');
    }

    const minimizeWindow = () => {
        ipcRenderer.send('minimize-main-window');
    }

    const maximizeWindow = () => {
        ipcRenderer.send('maximize-main-window')
    }

   return (
        <div className="traffic-lights">
            <button className="traffic-light traffic-light-close" id="close" onClick={closeWindow}></button>
            <button className="traffic-light traffic-light-minimize" id="minimize" onClick={minimizeWindow}></button>
            <button className="traffic-light traffic-light-maximize" id="maximize" onClick={maximizeWindow}></button>
        </div>
   )
}

export default Traffic;
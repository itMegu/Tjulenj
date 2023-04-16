import React, {Fragment, useEffect, useState} from "react"; 

const PrikazPodatkov = () => {
    const [podatki, setPodatki] = useState([]);
    const getPodatki = async () => { 
        try {
            const resp = await fetch("http://192.168.50.5:5000/ustvaritev"); 
            //parsing v mojo vednost
            const jsonData = await resp.json(); 
            setPodatki(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(()=>{
        getPodatki(); 
    }, []);


    return (
        <Fragment>
            <h1>Prikaz Test</h1>
            <table className="table mt-3">
                <thead>
                <tr>
                    <th>Ime</th>
                    <th>Priimek</th>
                    <th>Funkcija</th>
                </tr>
                </thead>
                <tbody>
                    {podatki.map(podatek => (
                        <tr>
                            <td>{podatek.ime}</td>
                            <td>{podatek.priimek}</td>
                            <td>{podatek.funkcija}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
}; 

export default PrikazPodatkov; 
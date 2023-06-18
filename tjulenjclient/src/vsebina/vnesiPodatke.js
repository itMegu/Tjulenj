import React, { Fragment, useState } from "react";



const Vnos = () =>{
    const [ime , vnesiIme] = useState("");
    const [priimek , vnesiPriimek] = useState("");
    const [funkcija , vnesiFunkcijo] = useState("");

    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            const resp = await fetch("http://192.168.50.5:5000/ustvaritev", {
                method: "POST",
                headers: {"Content-Type": "application/json"}, 
                body: JSON.stringify({ime, priimek, funkcija})
            });
            console.log(resp);
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <h1>Tjulenj Admin Page</h1>
            <form onSubmit={onSubmit}>
                <div className="form">
                    <input type="text" value={ime} onChange={(e) => vnesiIme(e.target.value)} placeholder="Ime / Name" />
                    <input type="text" value={priimek} onChange={(e) => vnesiPriimek(e.target.value)} placeholder="Priimek / Surname" />
                    <input type="text" value={funkcija} onChange={(e) => vnesiFunkcijo(e.target.value)} placeholder="Funkcija / Role" />
                    <button>Dodaj</button>
                </div>
            </form>
        </Fragment>
    )
};

export default Vnos;
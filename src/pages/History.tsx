import React from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import { useAuth0 } from "@auth0/auth0-react";


const HistoryPage = async () => {
    const { getAccessTokenSilently } = useAuth0();
    const token = await getAccessTokenSilently();

    const fetchHistory = async () => {
        const response = await fetch("/api/itemHistory/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const result = await response.json();
        return result.data;
    };
    // result.data: 
    // "data": [
    //     {
    //       "item": {..., name: 'Broccoli', imageUrl: 'https://images.pexels.com/photos/47347/broccoli-vegetable-food-healthy-47347.jpeg', ...},       //only this two info is useful here
    //       "num": 0,
    //       "time": "string"
    //     }
    //   ]

    return (
        // press a button to show this QR code in the page
        ReactDOM.render(<QRCode value = {token} />, document.getElementById("Container"));
        // else:
        <div>
        <h1>History Page</h1>
        <p>This is the history page where users can view their past activities.</p>
        </div>
    );
}


export default HistoryPage;
import React, { useState } from 'react'

export default function Introduction() {
    const [bins, setBins] = useState([]);

    const fetchBinStatus = async () => {
        let response = await fetch(`/bins/checkBinStatus`);
        const data = await response.json();
        setBins(data);
    };

    const changeBinStatus = async (event) => {
        const binId = event.target.value;
        let response = await fetch(`/bins/emptyBin/${binId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({ 'isFull' : '0' })
        });
        await fetchBinStatus();
    };

    return (
        <div>
            <p>This is where the status for all bins gets displayed.</p>
            <button onClick={(e) => fetchBinStatus(e)}>Get Status for all bins</button>
            <p>Note: this can take a few seconds to update.</p>
            <div></div>
            <table>
                <tbody>
            {bins && 
                bins.map((i) => {
                    return ( 
                        <tr key={i.id}> 
                            <td>{i.id}</td>
                            <td>{i.id_council}</td>
                            <td>{i.gps_north}</td>
                            <td>{i.gps_west}</td>
                            <td>{i.isFull === 0 ? "empty" : "full"}</td>
                            {i.id == 1 ? <td>Smart Bin</td> :
                            <td><button name="binName" value={i.id} onClick={(e) => changeBinStatus(e)}>Empty Bin</button></td>
                            }
                        </tr>
                    )

                })
            }
            </tbody>
            </table>
        </div>
    )
}
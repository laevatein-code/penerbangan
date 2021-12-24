class airflight {
    static root_url = 'http://flask-flight-radar-apps.azurewebsites.net';
    //details
    static async getAirportDetails({
        url=`${airflight.root_url}`, 
        iata='BKS', 
        pages=1}={}
        ){
        try{
            const response = await fetch(`${url}/${iata}/details/${pages}`);
            const responseJSON = await response.json();
            return responseJSON;
        } catch(err){
            console.log(err);
        }
    }
    //arrivals
    static async getAirportArrivals({
        url=`${airflight.root_url}`, 
        iata='BKS', 
        pages=1}={}){
        try{
            const response = await fetch(`${url}/${iata}/arrivals/${pages}`);
            const responseJSON = await response.json();
            return responseJSON;
        } catch(err){
            console.log(err);
        }
    }
    //departures
    static async getAirportDepartures({
        url=`${airflight.root_url}`, 
        iata='BKS', 
        pages=1}={}){
        try{
            const response = await fetch(`${url}/${iata}/departures/${pages}`);
            const responseJSON = await response.json();
            return responseJSON;
        } catch(err){
            console.log(err);
        }
    }
    //onground
    static async getAirportOnground({
        url=`${airflight.root_url}`, 
        iata='BKS', 
        pages=1}={}){
        try{
            const response = await fetch(`${url}/${iata}/onground/${pages}`);
            const responseJSON = await response.json();
            return responseJSON;
        } catch(err){
            console.log(err);
        }
    }
    //weather
    static async getAirportWeather({
        url=`${airflight.root_url}`, 
        iata='BKS', 
        pages=1}={}){
        try{
            const response = await fetch(`${url}/${iata}/weather/${pages}`);
            const responseJSON = await response.json();
            return responseJSON;
        } catch(err){
            console.log(err);
        }
    }
    //stat
    static async getAirportStat({
        url=`${airflight.root_url}`, 
        iata='BKS', 
        pages=1}={}){
        try{
            const response = await fetch(`${url}/${iata}/stat/${pages}`, iata='BKS', pages=1);
            const responseJSON = await response.json();
            return responseJSON;
        } catch(err){
            console.log(err);
        }
    }
}

async function renderData(){
//     try{
//             const response = await fetch('https://flask-flight-radar-apps.azurewebsites.net/BKS/details/0');
//             const responseJson = await response.json();
//             const airport_name = document.getElementById('airport-name');
//             airport_name.innerText = responseJson.name;
//             const airport_code = document.getElementById('airport-code');
//             airport_code.innerText = responseJson.code.iata;
//             console.log(responseJson);   
// } catch(err){
//         console.log(err);
//     }

//memasukkan nama airport menggunakan data response
    const data_details = await airflight.getAirportDetails({iata:'BKS'});
    const airport_name = document.getElementById('airport-name');

    airport_name.innerText = data_details.name;

    const data_kedatangan = await airflight.getAirportArrivals({iata:'BKS'});

    const data_keberangkatan = await airflight.getAirportDepartures({iata:'BKS'});

    function data_arr(){
        const kedatangan = [];
        const waktu = [];
        const dari = [];
        const airline = [];
        const aircraft = [];
        const flight = [];
        for(i=0;i<data_kedatangan.length;i++){
            flight[i] = data_kedatangan[i].flight.identification.number.default;
            slice = data_kedatangan[i].flight.time.scheduled.arrival_time;
            waktu[i] = slice.slice(0,2)+":"+slice.slice(2,4);
            dari[i] = data_kedatangan[i].flight.airport.origin.code.iata;
            airline[i] = data_kedatangan[i].flight.airline.name;
            aircraft[i] = data_kedatangan[i].flight.aircraft.model.code;

            kedatangan[i] = [waktu[i],flight[i],dari[i],airline[i],aircraft[i]]
        }

        // const kedatangan = [waktu,flight,dari,airline,aircraft];        

        return kedatangan;
    }

    data_arriv = data_arr();

    var bodyArriv = "<tr>";
    for(i=0;i<data_arriv.length;i++){
        bodyArriv += "<tr>";
        for(j=0;j<data_arriv[i].length;j++){
            bodyArriv += "<td>" + data_arriv[i][j] + "</td>";
        }
        bodyArriv += "</tr>";
    }
    bodyArriv += "</tr>";

    const data_arriva = document.getElementById("airport-arrival");
    data_arriva.innerHTML = bodyArriv;

    function data_ber(){
        const keberangkatan = [];
        const waktu = [];
        const ke = [];
        const flight = [];
        const airline = [];
        const aircraft = [];

        for(i=0;i<data_keberangkatan.length;i++){
            flight[i] = data_keberangkatan[i].flight.identification.number.default;
            slice = data_keberangkatan[i].flight.time.scheduled.departure_time;
            waktu[i] = slice.slice(0,2)+":"+slice.slice(2,4);
            ke[i] = data_keberangkatan[i].flight.airport.destination.code.iata;
            airline[i] = data_keberangkatan[i].flight.airline.name;
            aircraft[i] = data_keberangkatan[i].flight.aircraft.model.code;

            keberangkatan[i] = [waktu[i],flight[i],ke[i],airline[i],aircraft[i]]
        }

        return keberangkatan;
    }

    data_berangkat = data_ber();

    var bodyBer = "<tr>";
    for(i=0;i<data_berangkat.length;i++){
        bodyBer += "<tr>";
        for(j=0;j<data_berangkat[i].length;j++){
            bodyBer += "<td>" + data_berangkat[i][j] + "</td>";
        }
        bodyBer += "</tr>";
    }
    bodyBer += "</tr>";

    const departured = document.getElementById("airport-departure");
    departured.innerHTML = bodyBer;

    // const arrival = await airflight.getAirportArrivals({iata: 'BKS'});
    // const data_arrivals = document.getElementById('arrival-data');
    // data_arrivals.innerText = arrival.registration;

}

document.addEventListener('DOMContentLoaded', renderData);
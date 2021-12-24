class statflight {
    static root_url = 'http://flask-flight-radar-apps.azurewebsites.net';
    //details
    static async getAirportDetails({
        url=`${statflight.root_url}`, 
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
        url=`${statflight.root_url}`, 
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
        url=`${statflight.root_url}`, 
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
        url=`${statflight.root_url}`, 
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
        url=`${statflight.root_url}`, 
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
        url=`${statflight.root_url}`, 
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
    const data_kedatangan = await statflight.getAirportArrivals({iata:'BKS'});

    const data_keberangkatan = await statflight.getAirportDepartures({iata:'BKS'});

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

    var lalu_lintas = "<tr>";
    lalu_lintas += "<td>" + data_arriv.length + " Penerbangan</td>";
    lalu_lintas += "<td>" + data_berangkat.length + " Penerbangan</td>";
    lalu_lintas += "</tr>";
    document.getElementById("lalu-lintas").innerHTML = lalu_lintas;


    const data1 = {
        labels:[
            'Kedatangan',
            'Keberangkatan',
        ],
        datasets: [{
            label: 'Arrival vs Departure',
            data: [data_arriv.length, data_berangkat.length],
            backgroundColor: [
                'red',
                'blue',
            ],
            hoverOffset: 4
        }]
    };

    const config1 = {
        type: 'pie',
        data: data1
    };

    const chartLaluLintas = new Chart(
        document.getElementById("chart-lalu-lintas"),
        config1,
    );

}

document.addEventListener('DOMContentLoaded', renderData);
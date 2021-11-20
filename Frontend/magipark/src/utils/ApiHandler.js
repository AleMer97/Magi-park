import axios from 'axios';

export default class apiHandler {

    static getParkingspaces({swlat, swlon, nelat, nelon, length}){
        return new Promise((resolve, reject) => {
            axios
                .get("http://10.0.0.118:8080/getParkingSport?swlat="+{swlat}+"&swlon="+{swlon}+"&nelat"+{nelat}+"&nelon"+{nelon}+"&length"+{length})
                .then((response) => {
                    console.log(response);
                    resolve(response);
                })
                .catch((err) => {
                    console.log(err.response.data)
                    return reject(err.response.data);
                });
        })
    }

    static getParkingspaces2({lat, lon, radius, length}){
        return new Promise((resolve, reject) => {
            axios
                .get("http://10.0.0.118:8080/getParkingSport?lat="+{lat}+"&lon="+{lon}+"&radius="+{radius}+"&length"+{length})
                .then((response) => {
                    console.log(response);
                    resolve(response);
                })
                .catch((err) => {
                    console.log(err.response.data)
                    return reject(err.response.data);
                });
        })
    }
}

//http://10.0.0.20:8080/getParkingSpot?swlat=47.1674716&swlon=10.6522781&nelat=49.1701965&nelon=12.6611461&length=3
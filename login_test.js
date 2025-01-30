import http from 'k6/http';
import { check, sleep } from 'k6';



// export const options={
//     vus:3,
//     duration:'2s'
// }


export const options={
    vus:2,
    iterations:3
}

// Configuration options
// export let options = {
//     stages: [
//         { duration: '5', target: 5 }, // Ramp-up to 50 users in 30 seconds
//         { duration: '1m', target: 50 },  // Stay at 50 users for 1 minute
//         { duration: '30s', target: 0 }    // Ramp-down to 0 users in 30 seconds
//     ],
//     thresholds: {
//         http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
//     },
// };



// Define the login credentials
const LOGIN_PAYLOAD = JSON.stringify({
    email: 'kaka3@yopmail.com',
    password: '1qazZAQ!',
});

const LOGIN_URL = 'https://ronbro.b2clogin.com/ronbro.onmicrosoft.com/b2c_1_ronsigning/oauth2/v2.0/authorize?client_id=6c8924a1-d842-49eb-b1d2-e8857b26dfbc&redirect_uri=https%3A%2F%2Fron-backend.seliselocal.com%2Flogin%2Fazureadb2c%2Fcallback&scope=openid&response_type=code&state=9bD3IJYqd5Bgpm3aBameF2CTUDFjZxutHtUhhjQk'; // Replace with your login endpoint

export default function () {
    // Send POST request to the login URL with the payload
    let response = http.post(LOGIN_URL, LOGIN_PAYLOAD, {
        headers: { 'Content-Type': 'application/json' }
    });

    // Check if the login request was successful
    check(response, {
        'is status 200': (r) => r.status === 200,
        // 'response time is less than 500ms': (r) => r.timings.duration < 500,
    });

    // Optional: add a delay between requests
    // sleep(1); // Sleep for 1 second
}

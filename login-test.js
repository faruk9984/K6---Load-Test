import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { Trend } from 'k6/metrics';
import { Rate } from 'k6/metrics';
import { Counter  } from 'k6/metrics';
// import { group  } from 'k6/metrics';
 
const myTrend = new Trend('waiting_time');
export let errorRate = new Rate('errors')
 
let TrendRTT = new Trend('RTT');
let SuccessRate = new Rate('successful_requests');
let FailureRate = new Rate('failed_requests');
let RequestCounter = new Counter('requests');
 
 
// Load user credentials from a CSV file
const users = new SharedArray('users', function () {
    return open('./users.csv').split('\n').slice(1).map(line => {
        const [username, password] = line.split(',');
        return { username: username.trim(), password: password.trim() };
    });
});
 
// k6 options for the test
// export const options = {
//     vus: 10, // Simulate 3 users
//     duration: '10s', // Run the test for 1 minute
// };
 
export let options = {
    stages: [
        { duration: '1m', target: 50 }, // Ramp up to 100 users over 1 minute
        // { duration: '10s', target: 50 }, // Stay at 100 users for 5 minutes
        // { duration: '5s', target: 100 }, // Ramp up to 200 users over 1 minute
        // { duration: '10s', target: 100 }, // Stay at 200 users for 5 minutes
        // { duration: '5s', target: 0 },   // Ramp down to 0 users over 1 minute
    ],
};
 
export default function () {
    // Select a user based on the VU index
    const user = users[__VU % users.length];
 
    const url = 'https://ronbro.b2clogin.com/ronbro.onmicrosoft.com/b2c_1_ronsigning/oauth2/v2.0/authorize?client_id=6c8924a1-d842-49eb-b1d2-e8857b26dfbc&redirect_uri=https%3A%2F%2Fron-backend.seliselocal.com%2Flogin%2Fazureadb2c%2Fcallback&scope=openid&response_type=code&state=EDbOQ7bIByI2iIbJ9QRN016a2gGNfmlvwQzcqBnG'; // Replace with your login URL
    const payload = JSON.stringify({
        username: user.username,
        password: user.password,
    });
 
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJpdiI6IkJOdE9iUVNIYVpsTjZ1ajN3ZXN5THc9PSIsInZhbHVlIjoiUjhndGNPcHBiWkpHQ3RjbDN0NkxVSWtFZUx3emZMSDBQMFlOSkc0OG1NZUJjcGVpbHJCdmFEM0NWNSsxcGlMYnAzMTRHYzR5Z2hZR25XenE0NEw5RXc0eS9PK2V5SWhQclJGc25xc3dQSkc3cktyL1RabDlyV0g4WjJMZWJGNHoiLCJtYWMiOiIyNWUxMjMyYTA2NmIzODdkNjBhZTA0MzA3MjU2NGJlZTU4OGU1ZDA5YWRkZDZjNjU5YTZjY2M5ZTM0MWM0NGMxIiwidGFnIjoiIn0%3D',
        },
    };
 
    // const params={
    //     headers:{
    //         'Authorization': 'Bearer eyJpdiI6IkJOdE9iUVNIYVpsTjZ1ajN3ZXN5THc9PSIsInZhbHVlIjoiUjhndGNPcHBiWkpHQ3RjbDN0NkxVSWtFZUx3emZMSDBQMFlOSkc0OG1NZUJjcGVpbHJCdmFEM0NWNSsxcGlMYnAzMTRHYzR5Z2hZR25XenE0NEw5RXc0eS9PK2V5SWhQclJGc25xc3dQSkc3cktyL1RabDlyV0g4WjJMZWJGNHoiLCJtYWMiOiIyNWUxMjMyYTA2NmIzODdkNjBhZTA0MzA3MjU2NGJlZTU4OGU1ZDA5YWRkZDZjNjU5YTZjY2M5ZTM0MWM0NGMxIiwidGFnIjoiIn0%3D',
    //     }
    // }
 
    // Send the login request
    const res = http.post(url, payload, params);
 
    // Validate the response
    let Success=check(res, {
        'status is 200': (r) => r.status === 200,
        'response contains token': (r) => r.json('token') !== params,
    });
    errorRate.add(!Success)
    myTrend.add(res.timings.waiting);
    TrendRTT.add(res.timings.duration);
    SuccessRate.add(res.status === 200);
    FailureRate.add(res.status !== 200);
    RequestCounter.add(1);
 
    // Simulate user think time
    sleep(1);
}





/*
{
"CurrentCash": 10,
"UserCount": 40,
"RemoteControl": 10,
"TotalCashReceivedByCashPayment" : 5000,
"TotalCashPaymentUsed": 10,
"TotalRFIDUsed": 10,
"TotalEPaymentUsed": 10,
"TotalFingerprintUsed": 10,
"Shower": 10,
"RequestDateTime": "${__timeShift(yyyy-MM-dd'T'HH:mm:ss.SSS+07:00,,PT1H,,)}",
"LocationId": "${locationId}",
"CountryCode": "${countryId}",
"TurnstileMachineId": "${turnstileMachineId}"

{
"username": "${username}",
"password": "${password}"
}

}
*/
import http from 'k6/http';
// import { sleep } from 'k6';
// import { check } from 'k6';
import { Trend } from 'k6/metrics';
import { sleep, check, group } from 'k6';



const myTrend = new Trend('waiting_time');


export let options = {
    stages: [
        { duration: '1m', target: 100 },  // ramp up to 100 users over 1 minute
        { duration: '5m', target: 100 },  // stay at 100 users for 5 minutes
        { duration: '1m', target: 200 },  // ramp up to 200 users over 1 minute
        { duration: '5m', target: 200 },  // stay at 200 users for 5 minutes
        { duration: '1m', target: 300 },  // ramp up to 300 users over 1 minute
        { duration: '5m', target: 300 },  // stay at 300 users for 5 minutes
        { duration: '1m', target: 0 },    // ramp down to 0 users over 1 minute
    ],
};

// export default function () {
//     let res = http.get('https://ronreload.selisestage.com/?city=Zurich%20(EN)');
//     check(res, {
//         'is status 200': (r) => r.status === 200,
//     });
//     sleep(1);
// }

export default function () {
    group('User scenario 1 - Browse homepage and click button', function () {
        let res = http.get('https://ronreload.selisestage.com/');
        check(res, { 'status was 200': (r) => r.status === 200 });
        myTrend.add(res.timings.waiting);
        sleep(1);

        // res = http.get('https://ronbro.b2clogin.com/ronbro.onmicrosoft.com/b2c_1_ronsigning/oauth2/v2.0/authorize?client_id=6c8924a1-d842-49eb-b1d2-e8857b26dfbc&redirect_uri=https%3A%2F%2Fron-backend.selisestage.com%2Flogin%2Fazureadb2c%2Fcallback&scope=openid&response_type=code&state=bQaSYpja7xnpiSxFgWDoIqRXlIcjSGiva2oVzQcL');
        // check(res, { 'status was 200': (r) => r.status === 200 });
        // myTrend.add(res.timings.waiting);
        // sleep(1);
    });

    group('User scenario 2 - Login and fetch data', function () {
        let loginRes = http.post('https://ronbro.b2clogin.com/ronbro.onmicrosoft.com/b2c_1_ronsigning/oauth2/v2.0/authorize?client_id=6c8924a1-d842-49eb-b1d2-e8857b26dfbc&redirect_uri=https%3A%2F%2Fron-backend.selisestage.com%2Flogin%2Fazureadb2c%2Fcallback&scope=openid&response_type=code&state=bQaSYpja7xnpiSxFgWDoIqRXlIcjSGiva2oVzQcL', JSON.stringify({
            username: 'superadmin@ronorptest.com',
            password: '12345678',
        }), { headers: { 'Content-Type': 'application/json' } });
        check(loginRes, { 'login status was 200': (r) => r.status === 200 });
        myTrend.add(loginRes.timings.waiting);
        sleep(1);

        let dataRes = http.get('https://ronreload.selisestage.com/rons-tips?city=Zurich%20(EN');
        check(dataRes, { 'data status was 200': (r) => r.status === 200 });
        myTrend.add(dataRes.timings.waiting);
        sleep(1);
    });
}
import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { Trend } from 'k6/metrics';

// Custom metrics to track performance
const myTrend = new Trend('waiting_time');

export let options = {
    stages: [
        { duration: '1m', target: 100 }, // Ramp up to 100 users over 1 minute
        { duration: '5m', target: 100 }, // Stay at 100 users for 5 minutes
        { duration: '1m', target: 200 }, // Ramp up to 200 users over 1 minute
        { duration: '5m', target: 200 }, // Stay at 200 users for 5 minutes
        { duration: '1m', target: 0 },   // Ramp down to 0 users over 1 minute
    ],
};

export default function () {
    group('User scenario 1 - Browse homepage and search', function () {
        let res = http.get('https://example.com');
        check(res, { 'status was 200': (r) => r.status === 200 });
        myTrend.add(res.timings.waiting);
        sleep(1);

        res = http.get('https://example.com/search?q=k6');
        check(res, { 'status was 200': (r) => r.status === 200 });
        myTrend.add(res.timings.waiting);
        sleep(1);
    });

    group('User scenario 2 - Login and fetch data', function () {
        let loginRes = http.post('https://example.com/api/login', JSON.stringify({
            username: 'testuser',
            password: 'testpassword',
        }), { headers: { 'Content-Type': 'application/json' } });
        check(loginRes, { 'login status was 200': (r) => r.status === 200 });
        myTrend.add(loginRes.timings.waiting);
        sleep(1);

        let dataRes = http.get('https://example.com/api/data');
        check(dataRes, { 'data status was 200': (r) => r.status === 200 });
        myTrend.add(dataRes.timings.waiting);
        sleep(1);
    });
}
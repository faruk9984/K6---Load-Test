import http from 'k6/http';
import { check, sleep } from 'k6';

const url = 'https://qa2.gim.com.bd/ejogajog/api/v1/auth/adminLogIn';

export default function () {
    // Authentication Success Test
    const successPayload = JSON.stringify({
        email: "assignmentuser@gmail.com",
        password: "qwerty123"
    });

    let response = http.post(url, successPayload, { headers: { 'Content-Type': 'application/json' } });
    check(response, {
        'Authentication success status 200': (r) => r.status === 200,
    });

    // Authentication Failure Test
    const failurePayload = JSON.stringify({
        email: "wronguser@gmail.com",
        password: "wrongpassword"
    });

    response = http.post(url, failurePayload, { headers: { 'Content-Type': 'application/json' } });
    check(response, {
        'Authentication failure status 406': (r) => r.status === 406,
    });

    sleep(1); // Sleep to mimic user think time
}

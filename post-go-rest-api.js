import http from 'k6/http'
import { check } from 'k6'

const url = "https://gorest.co.in/public/v2/users"

const payload = {

    "name": "AB Automation Hub",
    "email": "AB_6May1@dispostable.com",
    "gender": "female",
    "status": "active"
}


export default function () {
    const response = http.post(url, payload, {
        headers: { 'Authorization': 'Bearer 43cc56002d15c443892b0a38bc7c459c2bf4b988e559a2a2af16aca1eccf3910' }
    })
    console.log("*** printing response ***", JSON.stringify(response.body))

    check(response, { 
            "status code validation": (response) => response.status === 201   
        })
}
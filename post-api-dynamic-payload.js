import http from 'k6/http'
import { check } from 'k6'
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import faker from 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.0.1/faker.min.js'


export const options={
    vus:5,
    duration:'2s'
}

const payload={
    "EMAIL":faker.internet.email(),
    "name":faker.name.findName(),
    // "name":'AB'+randomString(10),
    "job":"QA",
}

const url="https://reqres.in/api/users"

export default function(){
    const response=http.post(url, payload)
    console.log("printting payload == ",payload)
    console.log("printting response == ",response.body)

    check(response,{
        'status code validation':(response)=>response.status===201,
        'response id validation':(response)=>response.body.includes('id')
    })
 
}
import http from 'k6/http'
import { check } from 'k6'


export const options={
    vus:10,
    duration:'5s'
}

const payload={
    "name":"Faruk",
    "job":"QA"
}

const data=JSON.parse(open('./payload.json'))

const url="https://reqres.in/api/users"

export default function(){
    const response=http.post(url, data)
    console.log("printting payload == ",data)
    console.log("printting response == ",response.body)

    check(response,{
        'status code validation':(response)=>response.status===201,
        'response id validation':(response)=>response.body.includes('id')
    })
 
}
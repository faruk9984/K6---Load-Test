import http from 'k6/http'
import { check } from 'k6'


export const options = {
 stages:[

    // {duration:'3s',target:6},
    {duration:'5m',target:200},
    {duration:'30s',target:0}
 ]
}

export default function () {
    const response = http.get("https://toffeelive.com/en")

    // const response = http.get("https://ronreload.selisestage.com/?city=Zurich%20(EN)")
    // const response = http.get("https://ronreload.seliselocal.com/?city=Zurich%20(EN)")


    check(response,{
        'status code validation':(response)=>response.status===200
    })
}
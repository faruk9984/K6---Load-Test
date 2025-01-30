import http from 'k6/http'
import { check } from 'k6'
 
// export const options={
//     stages:[
//         {duration:'1m',target:200},
//         {duration:'5m',target:200},
//         {duration:'30s',target:0}
//     ]
// }
 
export const options={
    vus:1000,
    duration:'5m',
    // iterations:20
}
 
const params={
    headers:{
        'Authorization':'Bearer eyJpdiI6ImZldEViQTZGZFVlNWk5bDhZRHBSanc9PSIsInZhbHVlIjoiMDBQV0hubFdrZmlWZktkVE5Ba1ZBdmhlMHNtYjZKOFU4SFNxbXZidDNRc0NlUnJWcjdqTStQVVpDdG1NK2w0UmNpd1VDNUFpbHVVYklDd2hvNzVmWUpkQkZGV28vVjdIbHZkdVNNN0xTa2tpQUhVYTBBdWExSEc2ZGxENjY4R1QiLCJtYWMiOiIzYjE0OWM1MTU5NmQ5MTdiMDJkZTI4MDVmZGVmMmE0NGUxYTk4MGYzNTMxZmM3MmRlYWVhN2ZiYmVlNzEyYWIxIiwidGFnIjoiIn0%3D'
    }
}
 
 
let headers_api={
    'Authorization':'Bearer eyJpdiI6ImZldEViQTZGZFVlNWk5bDhZRHBSanc9PSIsInZhbHVlIjoiMDBQV0hubFdrZmlWZktkVE5Ba1ZBdmhlMHNtYjZKOFU4SFNxbXZidDNRc0NlUnJWcjdqTStQVVpDdG1NK2w0UmNpd1VDNUFpbHVVYklDd2hvNzVmWUpkQkZGV28vVjdIbHZkdVNNN0xTa2tpQUhVYTBBdWExSEc2ZGxENjY4R1QiLCJtYWMiOiIzYjE0OWM1MTU5NmQ5MTdiMDJkZTI4MDVmZGVmMmE0NGUxYTk4MGYzNTMxZmM3MmRlYWVhN2ZiYmVlNzEyYWIxIiwidGFnIjoiIn0%3D'
}
 
// const url="https://gorest.co.in/public/v2/users/"
const url="https://ronreload.selisestage.com/?city=Zurich%20(EN)"
 
 
export default function(){
    // const response=http.get("https://gorest.co.in/public/v2/users/",{headers:headers_api})
    const response=http.get(url,params)
 
    check(response,{
        'status code validation':(response)=>response.status===200
    })
}
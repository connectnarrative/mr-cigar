import {validateInquiry} from '../../../lib/validation';
export async function POST(request:Request){
 const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)return Response.json({error:'Forbidden'},{status:403});
 if(Number(request.headers.get('content-length'))>12000)return Response.json({error:'Too large'},{status:413});
 let data;try{const raw=await request.text();if(raw.length>12000)return Response.json({error:'Too large'},{status:413});data=validateInquiry(JSON.parse(raw))}catch{return Response.json({error:'Invalid request'},{status:400})}
 if(!data)return Response.json({error:'Invalid inquiry'},{status:400});
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key)return Response.json({code:'NOT_CONFIGURED'},{status:503});
 try{const r=await fetch(`${url}/rest/v1/rpc/mc_submit_inquiry`,{method:'POST',headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({payload:data}),signal:AbortSignal.timeout(8000)});if(!r.ok)return Response.json({error:'Unable to store inquiry'},{status:r.status===429?429:502});return Response.json({ok:true},{status:201})}catch{return Response.json({error:'Unable to store inquiry'},{status:502})}
}

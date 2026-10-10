export type InquiryData={name:string;contact:string;date:string;guests:number;occasion:string;details:string;lang:'es'|'en';consent:boolean};
export function validateInquiry(body:unknown,today=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Bogota',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())):InquiryData|null{
 if(!body||typeof body!=='object')return null;const d=body as Record<string,unknown>;
 const str=(k:string,min:number,max:number)=>typeof d[k]==='string'&&(d[k] as string).trim().length>=min&&(d[k] as string).length<=max;
 if(!str('name',2,120)||!str('contact',5,160)||!str('date',10,10)||!str('occasion',1,120)||!str('details',0,2000)||d.consent!==true||!['es','en'].includes(String(d.lang))||!Number.isInteger(d.guests)||Number(d.guests)<1||Number(d.guests)>200||d.website)return null;
 const date=String(d.date);if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||Number.isNaN(Date.parse(date))||new Date(date).toISOString().slice(0,10)!==date||date<today)return null;
 const contact=String(d.contact).trim();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)&&!/^[+\d\s().-]{7,25}$/.test(contact))return null;
 return {name:String(d.name).trim(),contact,date,guests:Number(d.guests),occasion:String(d.occasion),details:String(d.details),lang:d.lang as 'es'|'en',consent:true};
}

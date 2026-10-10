const fs=require('node:fs'),ts=require('typescript'),assert=require('node:assert/strict'),path=require('node:path');
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(module,name)=>{module._compile(ts.transpileModule(fs.readFileSync(name,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,name)};
const React=require('react'),{renderToString}=require('react-dom/server');
const {initial,sections}=require('../lib/content.ts');
const Experience=require('../components/experience.tsx').default;
const {validateInquiry}=require('../lib/validation.ts');
let count=0;function check(name,fn){fn();count++;console.log('PASS '+name)}
for(const lang of ['es','en'])for(const page of ['home',...sections,'privacy'])check(`${lang}/${page} server render`,()=>{const html=renderToString(React.createElement(Experience,{lang,page,content:initial}));assert(html.includes('id="main"'));assert(!html.includes('undefined'));assert(html.includes('connectnarrative.com'));assert(html.includes('/media/official-logo.webp'));if(['events','visit'].includes(page))assert(html.includes('name="consent"'));for(const m of html.matchAll(/(?:src|poster)="(\/[^"?]+)"/g)){assert(fs.existsSync(path.join(process.cwd(),'public',m[1])),m[1]+' missing')} });
check('Gallery may be empty without crashing any page',()=>{for(const page of ['home',...sections])renderToString(React.createElement(Experience,{lang:'es',page,content:{...initial,photos:[]}}))});
check('Complete bilingual text key parity',()=>assert.deepEqual(Object.keys(initial.text.es).sort(),Object.keys(initial.text.en).sort()));
check('Original logo preserved',()=>assert.equal(require('node:crypto').createHash('sha256').update(fs.readFileSync('public/media/official-logo-original.jpg')).digest('hex'),'c3bce99ce2305af38cac8510001618f32e32b3839ce8ebd76fb1518130ed5427'));
const valid={name:'Guest Test',contact:'guest@example.com',date:'2027-02-26',guests:4,occasion:'Lounge visit',details:'Hello',lang:'en',consent:true};
check('Valid inquiry accepted',()=>assert(validateInquiry(valid,'2026-10-09')));
for(const [name,change] of [['no consent',{consent:false}],['negative guests',{guests:-1}],['fractional guests',{guests:2.5}],['past date',{date:'2026-01-01'}],['impossible date',{date:'2027-02-30'}],['malformed contact',{contact:'abcde'}],['honeypot',{website:'bot'}],['oversized detail',{details:'x'.repeat(2001)}],['unsupported language',{lang:'fr'}]])check('Reject '+name,()=>assert.equal(validateInquiry({...valid,...change},'2026-10-09'),null));
(async()=>{const {POST}=require('../app/api/inquiries/route.ts');const req=(body,origin='https://example.com')=>new Request('https://example.com/api/inquiries',{method:'POST',headers:{'Content-Type':'application/json',Origin:origin},body:JSON.stringify(body)});
for(const [name,request,status] of [['cross-origin denied',req(valid,'https://other.example'),403],['invalid data denied',req({...valid,consent:false}),400],['unconfigured storage returns honest fallback',req(valid),503]]){const r=await POST(request);assert.equal(r.status,status);console.log('PASS '+name);count++}
const originalFetch=global.fetch;process.env.NEXT_PUBLIC_SUPABASE_URL='https://dedicated.supabase.co';process.env.SUPABASE_SERVICE_ROLE_KEY='test-server-only';
global.fetch=async()=>new Response('{}',{status:500});assert.equal((await POST(req(valid))).status,502);console.log('PASS storage failure never confirms inquiry');count++;
global.fetch=async(url,opts)=>{assert(url.endsWith('/rpc/mc_submit_inquiry'));assert.equal(JSON.parse(opts.body).payload.consent,true);return new Response('"test-id"',{status:200})};assert.equal((await POST(req(valid))).status,201);console.log('PASS successful persistence acknowledges inquiry');count++;
global.fetch=originalFetch;delete process.env.NEXT_PUBLIC_SUPABASE_URL;delete process.env.SUPABASE_SERVICE_ROLE_KEY;
console.log(`\n${count} checks passed. Browser, live Supabase and legal review not covered.`)})().catch(e=>{console.error(e);process.exitCode=1});

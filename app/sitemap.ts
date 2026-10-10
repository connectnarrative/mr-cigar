import type {MetadataRoute} from 'next';
import {sections} from '../lib/content';
export default function sitemap():MetadataRoute.Sitemap{const origin=process.env.NEXT_PUBLIC_SITE_URL;if(!origin)return [];return ['es','en'].flatMap(lang=>['',...sections,'privacy'].map(s=>({url:`${origin}/${lang}${s?'/'+s:''}`,alternates:{languages:{es:`${origin}/es${s?'/'+s:''}`,en:`${origin}/en${s?'/'+s:''}`}}})))}

import type {MetadataRoute} from 'next';
export default function robots():MetadataRoute.Robots{return {rules:process.env.PUBLIC_LAUNCH==='true'?{userAgent:'*',allow:'/',disallow:['/admin','/api/']}:{userAgent:'*',disallow:'/'},sitemap:process.env.NEXT_PUBLIC_SITE_URL?`${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`:undefined}}

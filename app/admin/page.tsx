import {getContent} from '../../lib/content';
import Admin from '../../components/admin';
export const dynamic='force-dynamic';
export const metadata={title:'Administración | Mr. Cigar',robots:{index:false,follow:false}};
export default async function Page(){return <Admin initial={await getContent()}/>}

import { lusitana } from '@/app/ui/fonts';
import Logo from '@/app/ui/logo.jpg';
import Image from  'next/image';

export default function PhysTLogo() {
    return (
        <div
            className={`${lusitana.className} flex flex-colitems-center leading-none text-white`}>
            <Image className='h-14 w-14 rounded-full' 
             src={Logo} alt="Great Blue Heron Logo" width={1024} height={1024} />
             <p className='text-[42px]'>The Physics Tutorials</p> 
        </div>
    )
}
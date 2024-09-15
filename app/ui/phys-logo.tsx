import { lusitana } from '@/app/ui/fonts';
import Logo from '@/app/ui/logo.png';
import Image from  'next/image';

export default function PhysTLogo() {
    return (
        <div
            // className={`${lusitana.className} flex flex-col items-center leading-none text-white`}>
            className="flex flex-col items-center leading-none text-white">
           <Image className='h-20 w-20 rounded-full' 
             src={Logo} alt="Electromageticsm Maxwell Equations Logo" width={1024} height={1024} />
             <div><p className='text-[42px]'>The Physics Tutorials</p> </div>
        </div>
    )
}
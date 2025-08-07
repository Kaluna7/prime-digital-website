import { FaWhatsapp } from 'react-icons/fa';

export function WhatsappBtn(){
    return(
        <div className="fixed right-3 bottom-8 sm:right-5 sm:bottom-8 md:right-8 md:bottom-10 bg-green-400 rounded-[100%] w-fit h-fit z-80 hover:bg-green-500 hover:translate-y-[2px]">
            <a href='https://wa.me/qr/K5GKCLOXIZ3CE1'>
                <FaWhatsapp className='w-[3rem] h-[3rem] xl:w-[4rem] xl:h-[4rem]'/>
            </a>
        </div>
    );
}
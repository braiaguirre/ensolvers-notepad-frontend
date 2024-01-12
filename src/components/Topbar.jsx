import { useSelector } from 'react-redux';
import Menu from './Menu';
import Logo from './Logo';
import Hamburger from './Hamburger';

const Topbar = () => {
    const mobileMenu = useSelector(state => state.config.mobileMenu);

    return (
        <div className='flex flex-col items-center mt-8 sm:visible md:hidden'>
            <div className='flex flex-row justify-between w-[320px] items-center pl-2 pr-2 mb-2'>
                <Logo />
                <Hamburger mobileMenu={ mobileMenu } />
            </div>
            { mobileMenu 
                ? <div className='flex flex-col mt-6 mb-6 md:hidden'><Menu /></div>    
                : null }
        </div>
    );
};

export default Topbar;
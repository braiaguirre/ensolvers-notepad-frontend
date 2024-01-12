import Menu from './Menu';
import Logo from './Logo';

const Sidebar = () => {

    return (
        <div className='flex flex-col pt-6 h-screen fixed sm:invisible md:visible space-y-6 w-[300px]'>
            <Logo />
            <Menu />
        </div>
    );
};

export default Sidebar;

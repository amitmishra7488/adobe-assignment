import React from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css"
import { FiSend } from "react-icons/fi"
import { IoPersonOutline } from 'react-icons/io5'
import { FiLogOut } from 'react-icons/fi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IconButton, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip, useMediaQuery } from '@chakra-ui/react';

const Navbar = () => {
    const [isLargerThan768] = useMediaQuery("(min-width: 768px)")
    return (
        <nav>
            <div className="navbar-left">
                <img src="https://www.pngfind.com/pngs/m/494-4941182_analog-for-mac-photography-logo-icon-png-transparent.png" alt="Instagram logo" className="navbar-logo" />
            </div>

            {isLargerThan768 ?
                <div className="navbar-right">


                    <Link to='/' className='nav-links'>
                        <Text>Analytics</Text>
                        <FiSend size={30} />
                    </Link>



                    <Link to='/profile' className='nav-links'>
                        <Text>Profile</Text>
                        <IoPersonOutline size={30} />
                    </Link>



                    <Link to='/login' className='nav-links'  >
                        <Text>Logout</Text>
                        <FiLogOut size={30} />
                    </Link>

                </div>
                :
                <Menu className="menu-bar">
                    <MenuButton
                        as={IconButton}
                        aria-label='Options'
                        icon={<GiHamburgerMenu size={30} />}
                        variant='outline'
                    />
                    <MenuList bg='#FAFAFA'>
                        <MenuItem >
                            <Link to='/' className='nav-links'>
                                <Text>Analytics</Text>
                                <FiSend size={30} />
                            </Link>
                        </MenuItem>
                        <MenuItem >
                            <Link to='/profile' className='nav-links'>
                                <Text>Profile</Text>
                                <IoPersonOutline size={30} />
                            </Link>
                        </MenuItem>
                        <MenuItem >
                            <Link to='/login' className='nav-links'  >
                                <Text>Logout</Text>
                                <FiLogOut size={30} />
                            </Link>
                        </MenuItem>

                    </MenuList>
                </Menu>}
        </nav>
    );
};

export default Navbar;
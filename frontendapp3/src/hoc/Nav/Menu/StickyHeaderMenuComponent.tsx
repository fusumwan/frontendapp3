import React, { useState } from 'react';
import { ComponentProps } from '../../../interfaces/ComponentProps';


const StickyHeaderMenuComponent: React.FC<ComponentProps> = ({appContent}) => {
    const menuOptions = appContent?.applicationUserDataSetting.applicationUserData.selectedMenu.options || [];
    const isLoggedIn = appContent?.applicationUserDataSetting.applicationUserData.sessionState.isLoggedIn || false;

    // Filter root menus based on login requirements
    const rootMenu = menuOptions.filter(
        (item: any) => item.type === 'root' && (!item.login_required || (item.login_required && isLoggedIn))
    );
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const getChildMenu = (parentId: string) =>
        menuOptions.filter(
            (item: any) =>
                item.root_id === parentId &&
                (!item.login_required || (item.login_required && isLoggedIn)) // Filter child menus
        );

    const handleMouseOut = (menuId: string) => {
        if (openDropdown === menuId) {
            setOpenDropdown(null);
        }
    };

    const handleMenuClick = (menuId: string, hasChildren: boolean) => {
        if (hasChildren) {
            setOpenDropdown(openDropdown === menuId ? null : menuId);
        } else {
            setOpenDropdown(null);
            appContent?.pageSetting.setActivePage(menuId);
        }
    };

    return (
        <div>
            <div className="container mx-auto flex justify-between items-center p-4">
                <div className="text-xl font-bold">{appContent?.applicationUserDataSetting.applicationUserData.logoName}</div>
                <nav className="hidden md:flex space-x-6">
                    {rootMenu.map((menu: any) => {
                        const childMenu = getChildMenu(menu.child_id);
                        const hasChildren = childMenu.length > 0;

                        return (
                            <div key={menu.child_id} className="relative group">
                                <button
                                    onClick={() => handleMenuClick(menu.child_id, hasChildren)}
                                    className={`hover:text-gray-400 ${
                                        appContent?.pageSetting.activePage === menu.child_id ? 'text-gray-400' : ''
                                    }`}
                                >
                                    {menu.title}
                                </button>
                                {hasChildren && openDropdown === menu.child_id && (
                                    <div style={{ position: 'absolute', zIndex: 1050 }}
                                        className="absolute top-full mt-3 bg-gray-700 text-white rounded shadow-lg"
                                        onMouseLeave={() => handleMouseOut(menu.child_id) }
                                    >
                                        {childMenu.map((child: any) => (
                                            <button
                                                key={child.child_id}
                                                onClick={() => appContent?.pageSetting.setActivePage(child.child_id)}
                                                className="block px-4 py-2 text-left hover:bg-gray-600"
                                            >
                                                {child.title}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>
                <button
                    className="md:hidden focus:outline-none"
                    onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </button>
            </div>
            {isMobileMenuOpen && (
                <nav className="md:hidden bg-gray-700" >
                    {rootMenu.map((menu: any) => {
                        const childMenu = getChildMenu(menu.child_id);
                        const hasChildren = childMenu.length > 0;

                        return (
                            <div key={menu.child_id}>
                                <button
                                    onClick={() => handleMenuClick(menu.child_id, hasChildren)}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                                >
                                    {menu.title}
                                </button>
                                {hasChildren && openDropdown === menu.child_id && (
                                    <div className="pl-4" style={{ position: 'absolute', zIndex: 1050 }}>
                                        {childMenu.map((child: any) => (
                                            <button
                                                key={child.child_id}
                                                onClick={() => appContent?.pageSetting.setActivePage(child.child_id)}
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                                            >
                                                {child.title}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>
            )}
        </div>
    );
};

export default StickyHeaderMenuComponent;

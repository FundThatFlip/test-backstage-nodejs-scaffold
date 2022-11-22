import React from "react";
import { Logo } from '@fundthatflip/ftf-ui-component-library';
import { NavigationLinks } from '../../molecules/NavigationLinks/NavigationLinks';

const Header: React.FC = () => {
  return (
    <div className="flex justify-between align-center py-2 px-4 border-b border-gray-400 mb-4 w-full">
      <Logo />
      <NavigationLinks />
    </div>
  );
};

export { Header };

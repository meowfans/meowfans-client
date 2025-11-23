import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from '@radix-ui/react-menubar';
import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, Fragment, RefAttributes } from 'react';

interface Props {
  menuItems: { title: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>; itemNames: string[] };
}

export const FilterMenuBar: React.FC<Props> = ({ menuItems }) => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <menuItems.title />
        </MenubarTrigger>
        <MenubarContent className="bg-indigo-200">
          {menuItems.itemNames.map((itemName, idx) => (
            <Fragment key={idx}>
              <MenubarItem>{itemName}</MenubarItem>
              <MenubarSeparator />
            </Fragment>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

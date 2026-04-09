import { useSidebar } from '@workspace/ui/components/sidebar';

export const useToggleSidebar = () => {
  const { setOpen, toggle, setToggle } = useSidebar();

  const handleToggleSidebar = () => {
    if (toggle) {
      setOpen(false);
      setToggle(false);
    } else {
      setOpen(true);
      setToggle(true);
    }
  };

  return { toggle, setToggle, handleToggleSidebar };
};

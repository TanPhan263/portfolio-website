'use client';

import { AnimatedThemeToggler } from '@/components/magicui/animated-theme-toggler';
import useHomePage from '@/shared/hooks/queries/useHomePage';
import { cn } from '@/shared/utils/common';
import { IconArrowUp, IconBrandGithub } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import AppImage from '../ui/app-image';
import { Button } from '../ui/button';
import { ModeToggle } from '../ui/mode-toggle';

const pathNameDisableHeaderScroll = [''];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();

  const isDisableHeaderScroll = pathNameDisableHeaderScroll.includes(pathname as string);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (isDisableHeaderScroll) {
      setIsScrolled(false);
      return;
    }

    if (currentScrollY === 0) {
      setIsScrolled(false);
    } else if (currentScrollY > 0) {
      setIsScrolled(true);
    }

    lastScrollY.current = currentScrollY;
  }, [isDisableHeaderScroll]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, isDisableHeaderScroll]);

  const { data } = useHomePage();
  if (!data) return <></>;

  // const { menu } = data;

  return (
    <>
      <header className={cn('top-8 sm:top-10 z-50', !isDisableHeaderScroll && 'sticky')}>
        <div
          className={cn(
            'mx-auto flex justify-between items-center transition-all duration-300 p-4 z-50',
            isScrolled
              ? 'bg-white/80 backdrop-blur-md md:px-6 md:py-3 dark:bg-zinc-900/80 w-[90%] shadow -translate-y-8 rounded-xl md:rounded-3xl'
              : 'bg-transparent w-full xl:w-[70%]'
          )}
        >
          <div className="flex items-center gap-2">
            <AppImage
              className="hidden dark:block"
              src="/logo-dark.png"
              alt="Logo"
              width={56}
              height={56}
            />
            <AppImage
              className="dark:hidden"
              src="/logo-light.png"
              alt="Logo"
              width={56}
              height={56}
            />
          </div>
          {/* <div className="flex-1 items-center gap-3 justify-center hidden sm:flex">
            {menu.map((link) => (
              <HeaderLink key={link.text} title={link.text} href={link.url} />
            ))}
          </div> */}
          <div className="flex items-center gap-2">
            <ModeToggle />
            <a
              href={'https://github.com/TanPhan263/portfolio-website'}
              target="_blank"
              rel="noopener noreferrer"
              className="border p-2 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors duration-300"
            >
              <IconBrandGithub />
            </a>
            <AnimatedThemeToggler className="border p-2 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors duration-300" />

            {/* <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border size-10 rounded-xl p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors duration-300 sm:hidden"
                >
                  <IconMenu2 />
                  <span className="sr-only">Menu</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="min-h-dvh">
                <DrawerHeader className="flex justify-between">
                  <DrawerTitle className="flex items-center gap-2">
                    <AppImage
                      className="hidden dark:block"
                      src="/logo-dark.png"
                      alt="Logo"
                      width={56}
                      height={56}
                    />
                    <AppImage
                      className="dark:hidden"
                      src="/logo-light.png"
                      alt="Logo"
                      width={56}
                      height={56}
                    />
                    tanteck.net
                  </DrawerTitle>
                  <DrawerClose
                    asChild
                    className="self-end -translate-y-14 z-50"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="size-8"
                    >
                      <IconX />
                    </Button>
                  </DrawerClose>
                </DrawerHeader>

                <div className="px-6 flex flex-col gap-4">
                  {menu.map((link) => (
                    <Link
                      key={link.text}
                      href={link.url}
                      className="flex items-center gap-2 font-medium text-xl"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      {link.text}
                      {link.isComingSoon && (
                        <span className="text-sm bg-blue-300/10 text-blue-500 px-2 py-1 rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </Link>
                  ))}
                  <Separator />
                </div>
              </DrawerContent>
            </Drawer> */}
          </div>
        </div>
      </header>

      {isDisableHeaderScroll && <ScrollToTopButton />}
    </>
  );
};

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      className="size-10 !bg-zinc-900/80 backdrop-blur-md rounded-xl p-2 hover:scale-110 duration-300 fixed bottom-4 right-8 md:right-20 z-[9999]"
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }}
    >
      <IconArrowUp className="text-white" />
    </Button>
  );
};

// const HeaderLink = ({ title, href }: { title: string; href: string }) => {
//   const pathname = usePathname() || '/';
//   const isActive = href === pathname;
//   return (
//     <div
//       className={cn(
//         'flex items-center gap-2 px-3 py-2 rounded-full transition-colors',
//         isActive
//           ? 'dark:bg-white dark:text-black bg-zinc-900 text-white'
//           : 'dark:hover:bg-zinc-800 hover:bg-zinc-100'
//       )}
//     >
//       <Link href={href}>{title}</Link>
//     </div>
//   );
// };


import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { site } from '../../config/site';

const links = [
  { label: 'Inicio', to: '/' },
  { label: 'Programas', to: '/programas' },
  { label: 'Asesoramiento', to: '/asesoramiento' },
  { label: 'Nuestro gimnasio', to: '/nuestro-gimnasio' },
];

function normalizePath(path: string) {
  return path.replace(/\/+$/, '') || '/';
}

export function Header() {
  const [open, setOpen] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  const { pathname } = useLocation();
  const previousPathnameRef = useRef(pathname);
  const currentPath = normalizePath(pathname);

  const closeMenu = (restoreFocus = false) => {
    setOpen(false);

    if (restoreFocus) {
      menuButtonRef.current?.focus({
        preventScroll: true,
      });
    }
  };

  // Bloquea el desplazamiento del fondo sin modificar
  // la posición del body ni del encabezado sticky.
  useEffect(() => {
    if (!open) return;

    const nav = mobileNavRef.current;

    const preventOutsideWheel = (event: WheelEvent) => {
      if (
        nav &&
        event.target instanceof Node &&
        nav.contains(event.target)
      ) {
        return;
      }

      event.preventDefault();
    };

    const preventOutsideTouch = (event: TouchEvent) => {
      if (
        nav &&
        event.target instanceof Node &&
        nav.contains(event.target)
      ) {
        return;
      }

      event.preventDefault();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);

        menuButtonRef.current?.focus({
          preventScroll: true,
        });

        return;
      }

      const navigationLinks = Array.from(
        nav?.querySelectorAll<HTMLAnchorElement>('a[href]') ?? [],
      );

      const firstLink = navigationLinks[0];
      const lastLink = navigationLinks[navigationLinks.length - 1];
      const menuButton = menuButtonRef.current;

      if (event.key === 'Tab') {
        if (
          event.shiftKey &&
          firstLink &&
          document.activeElement === firstLink
        ) {
          event.preventDefault();
          menuButton?.focus();
          return;
        }

        if (
          !event.shiftKey &&
          menuButton &&
          document.activeElement === menuButton
        ) {
          event.preventDefault();
          firstLink?.focus();
          return;
        }

        if (
          !event.shiftKey &&
          lastLink &&
          document.activeElement === lastLink
        ) {
          event.preventDefault();
          menuButton?.focus();
          return;
        }

        if (
          event.shiftKey &&
          menuButton &&
          document.activeElement === menuButton
        ) {
          event.preventDefault();
          lastLink?.focus();
          return;
        }
      }

      const scrollKeys = [
        'ArrowDown',
        'ArrowUp',
        'PageDown',
        'PageUp',
        'Home',
        'End',
        ' ',
      ];

      const targetIsInsideMenu =
        nav &&
        event.target instanceof Node &&
        nav.contains(event.target);

      if (scrollKeys.includes(event.key) && !targetIsInsideMenu) {
        event.preventDefault();
      }
    };

    nav?.querySelector<HTMLAnchorElement>('a[href]')?.focus({
      preventScroll: true,
    });

    window.addEventListener('wheel', preventOutsideWheel, {
      passive: false,
    });

    window.addEventListener('touchmove', preventOutsideTouch, {
      passive: false,
    });

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('wheel', preventOutsideWheel);
      window.removeEventListener('touchmove', preventOutsideTouch);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  // Cierra el menú al cambiar de ruta.
  useEffect(() => {
    if (previousPathnameRef.current === pathname) return;

    previousPathnameRef.current = pathname;

    if (open) {
      setOpen(false);

      menuButtonRef.current?.focus({
        preventScroll: true,
      });
    }
  }, [pathname, open]);

  // Cierra el menú si se pasa a escritorio.
  useEffect(() => {
    const desktopMedia = window.matchMedia('(min-width: 1024px)');

    const handleViewportChange = (
      event: MediaQueryListEvent,
    ) => {
      if (!event.matches) return;

      setOpen(false);

      document
        .querySelector<HTMLAnchorElement>(
          '.desktop-nav a.is-active',
        )
        ?.focus({ preventScroll: true });
    };

    desktopMedia.addEventListener('change', handleViewportChange);

    return () => {
      desktopMedia.removeEventListener(
        'change',
        handleViewportChange,
      );
    };
  }, []);

  const mobileNavigation = (
    <nav
      ref={mobileNavRef}
      id="mobile-navigation"
      className={`mobile-nav ${
        open ? 'mobile-nav--open' : ''
      }`}
      aria-label="Principal móvil"
      aria-hidden={!open}
      inert={!open}
    >
      <span className="mobile-nav__eyebrow">
        EXPLORÁ FORMA
      </span>

      {links.map((link, index) => {
        const isActive = currentPath === link.to;

        return (
          <Link
            key={link.to}
            to={link.to}
            onClick={() => closeMenu(true)}
            className={`mobile-nav__link mobile-nav__link--${
              index + 1
            }${isActive ? ' is-active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <span>
              {String(index + 1).padStart(2, '0')}
            </span>

            {link.label}

            <ArrowUpRight size={23} aria-hidden="true" />
          </Link>
        );
      })}

      <Link
        className="mobile-nav__cta"
        to="/empezar"
        onClick={() => closeMenu(true)}
      >
        Quiero empezar a entrenar

        <ArrowUpRight size={18} aria-hidden="true" />
      </Link>

      <small className="mobile-nav__footer">
        FORMA STUDIO · MOVIMIENTO A TU MANERA
      </small>
    </nav>
  );

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link
            className="brand"
            to="/"
            onClick={() => closeMenu()}
            aria-label={`${site.brand.name}, inicio`}
          >
            {site.brand.name.toLowerCase()}

            <i aria-hidden="true">.</i>

            <span>{site.brand.suffix}</span>
          </Link>

          <nav className="desktop-nav" aria-label="Principal">
            {links.map((link) => (
              <NavLink
                key={link.to}
                className={({ isActive }) =>
                  isActive ? 'is-active' : ''
                }
                to={link.to}
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <Link className="header-cta" to="/empezar">
            Quiero entrenar
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>

          <button
            ref={menuButtonRef}
            className="menu-toggle"
            type="button"
            aria-controls="mobile-navigation"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X size={25} aria-hidden="true" />
            ) : (
              <Menu size={25} aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      {typeof document !== 'undefined' &&
        createPortal(mobileNavigation, document.body)}
    </>
  );
}

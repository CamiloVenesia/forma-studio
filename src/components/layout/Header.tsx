import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { site } from '../../config/site';

const links = [
  { label: 'Inicio', to: '/' },
  { label: 'Programas', to: '/programas' },
  { label: 'Asesoramiento', to: '/asesoramiento' },
  { label: 'Espacio alumno', to: '/espacio' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onEscape);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onEscape);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          className="brand"
          to="/"
          onClick={() => setOpen(false)}
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
              className={({ isActive }) => (isActive ? 'is-active' : '')}
              to={link.to}
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <Link className="header-cta" to="/empezar">
          Empezar <ArrowUpRight aria-hidden="true" size={17} />
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-controls="mobile-navigation"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className={`mobile-nav ${open ? 'mobile-nav--open' : ''}`}
        aria-label="Principal móvil"
        aria-hidden={!open}
      >
        <span className="mobile-nav__eyebrow">EXPLORÁ FORMA</span>
        {links.map((link, index) => (
          <Link
            key={link.to}
            to={link.to}
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
            className={pathname === link.to ? 'is-active' : ''}
          >
            <span>0{index + 1}</span>
            {link.label}
            <ArrowUpRight size={23} aria-hidden="true" />
          </Link>
        ))}
        <Link
          className="mobile-nav__cta"
          tabIndex={open ? 0 : -1}
          to="/empezar"
          onClick={() => setOpen(false)}
        >
          Empezar ahora <ArrowUpRight size={18} />
        </Link>
        <small>CONCEPTO DEMOSTRATIVO · FORMA STUDIO</small>
      </nav>
    </header>
  );
}

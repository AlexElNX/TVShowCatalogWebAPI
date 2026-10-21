import {Clapperboard, Plus, Tv2} from 'lucide-react';
import {Link, NavLink, Outlet} from 'react-router-dom';

export default function SiteLayout() {
    return <div className="app-shell">
        <header className="topbar">
            <div className="topbar-inner">
                <Link to="/" className="brand" aria-label="ReelRank home"><span className="brand-mark"><Clapperboard
                    size={21} strokeWidth={2.4}/></span><span>REEL<span className="brand-accent">RANK</span><small>THE SERIES ARCHIVE</small></span></Link>
                <nav className="main-nav"><NavLink to="/" end>Discover</NavLink><a href="#catalog" onClick={e => {
                    if (location.pathname !== '/') return;
                    e.preventDefault();
                    document.getElementById('catalog')?.scrollIntoView({behavior: 'smooth'});
                }}>The collection</a></nav>
                <Link to="/shows/new" className="nav-cta"><Plus size={17}/> Add a show</Link>
            </div>
        </header>
        <main className="site-main"><Outlet/></main>
        <footer className="footer">
            <div className="footer-inner"><Link to="/" className="footer-brand"><Tv2 size={18}/> REELRANK</Link><span>A personal collection of television worth remembering.</span><span
                className="footer-note">MADE FOR THE LOVE OF STORIES <span>●</span></span></div>
        </footer>
    </div>;
}

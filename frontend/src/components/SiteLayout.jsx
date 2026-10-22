import {Clapperboard, Plus, Tv2, UserRound} from 'lucide-react';
import {Link, Outlet} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import LanguageSelector from './LanguageSelector';

export default function SiteLayout() {
    const {t} = useTranslation();
    return <div className="app-shell">
        <header className="topbar">
            <div className="topbar-inner">
                <Link to="/" className="brand" aria-label={t('nav.home')}><span className="brand-mark"><Clapperboard
                    size={21} strokeWidth={2.4}/></span><span>PLOT<span className="brand-accent">TWISTED</span><small>THE SERIES ARCHIVE</small></span></Link>
                <div className="topbar-actions"><LanguageSelector/><Link to="/login" className="login-cta"><UserRound
                    size={16}/><span>{t('nav.login')}</span></Link><Link to="/shows/new" className="nav-cta"><Plus
                    size={17}/><span>{t('nav.add')}</span></Link></div>
            </div>
        </header>
        <main className="site-main"><Outlet/></main>
        <footer className="footer">
            <div className="footer-inner"><Link to="/" className="footer-brand"><Tv2
                size={18}/> PLOTTWISTED</Link><span>{t('footer.tagline')}</span><span
                className="footer-note">{t('footer.note')} <span>●</span></span></div>
        </footer>
    </div>;
}

import {useEffect, useState} from 'react';
import {ArrowLeft, LogOut, ShieldCheck, Clapperboard, CircleAlert} from 'lucide-react';
import {onAuthStateChanged, signInWithPopup, signOut} from 'firebase/auth';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {auth, firebaseConfigured, githubProvider} from '../firebase';

// Простой SVG для GitHub иконки
const GithubIcon = ({size = 20}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round">
        <path
            d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
        <path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
);

export default function LoginPage() {
    const {t} = useTranslation();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => auth ? onAuthStateChanged(auth, setUser) : undefined, []);

    const login = async () => {
        if (!auth) {
            setError(t('login.setup'));
            return;
        }
        setLoading(true);
        setError('');
        try {
            const result = await signInWithPopup(auth, githubProvider);
            const syncUrl = import.meta.env.VITE_AUTH_SYNC_URL;
            if (syncUrl) {
                const token = await result.user.getIdToken();
                const response = await fetch(syncUrl, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
                    body: JSON.stringify({
                        uid: result.user.uid,
                        email: result.user.email,
                        displayName: result.user.displayName,
                        photoURL: result.user.photoURL,
                        provider: 'github'
                    })
                });
                if (!response.ok) setError(t('login.syncError'));
            }
        } catch (e) {
            console.error('GitHub sign-in error:', e);
            setError(e.code === 'auth/unauthorized-domain' ? t('login.setup') : t('login.popupError'));
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        if (!auth) return;
        await signOut(auth);
        setError('');
    };

    return (
        <section className="login-page">
            <div className="login-ambient" aria-hidden="true"><span/><span/><span/></div>
            <div className="login-card">
                <Link to="/" className="login-back"><ArrowLeft size={15}/>{t('login.back')}</Link>
                <div className="login-emblem"><Clapperboard size={25}/></div>
                <div className="eyebrow"><span className="eyebrow-line"/>{t('login.eyebrow')}</div>
                <h1>{t('login.title')}<br/><span>{t('login.brand')}.</span></h1>
                <p className="login-copy">{t('login.copy')}</p>
                {user ? (
                    <div className="signed-in-panel">
                        {user.photoURL ? (
                            <img className="user-avatar" src={user.photoURL} alt=""/>
                        ) : (
                            <span className="user-avatar user-avatar-fallback"><GithubIcon size={22}/></span>
                        )}
                        <div className="user-summary">
                            <strong>{user.displayName || user.email || 'GitHub user'}</strong>
                            <span>{t('login.signedIn')}</span>
                        </div>
                        <button className="button button-ghost login-signout" onClick={logout}>
                            <LogOut size={16}/>{t('login.signOut')}
                        </button>
                    </div>
                ) : (
                    <button className="github-login-button" onClick={login} disabled={loading}>
                        <GithubIcon size={20}/>
                        <span>{loading ? t('login.working') : t('login.github')}</span>
                        {!loading && <span className="github-button-arrow">↗</span>}
                    </button>
                )}
                {error && <div className="login-error"><CircleAlert size={17}/><span>{error}</span></div>}
                {!firebaseConfigured && <p className="login-setup-hint">{t('login.setup')}</p>}
                <div className="login-privacy"><ShieldCheck size={16}/><span>{t('login.privacy')}</span></div>
            </div>
            <div className="login-side-note"><span>PT / AUTH</span><span>YOUR WATCHLIST. YOUR STORIES.</span></div>
        </section>
    );
}
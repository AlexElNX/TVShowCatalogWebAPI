import {useEffect, useMemo, useState} from 'react';
import {ArrowDown, Film, Search, SlidersHorizontal, Sparkles, Tv2} from 'lucide-react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {tvShowApi} from '../api/tvShowApi';
import TvShowCard from '../components/TvShowCard';
import StyledSelect from '../components/StyledSelect';

export default function CatalogPage() {
    const {t, i18n} = useTranslation();
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState('__all__');
    const [sort, setSort] = useState('newest');
    const load = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await tvShowApi.getAll();
            setShows(Array.isArray(data) ? data : data?.$values || []);
        } catch (e) {
            setError(e.message || t('catalog.failedTitle'));
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        load();
    }, []);
    const genres = useMemo(() => [...new Set(shows.map(s => s.genre ?? s.Genre).filter(Boolean).flatMap(g => g.split(',').map(x => x.trim())).filter(Boolean))].sort((a, b) => a.localeCompare(b, i18n.language)), [shows, i18n.language]);
    const filtered = useMemo(() => shows.filter(s => {
        const title = s.title ?? s.Title ?? '';
        const runner = s.showrunner ?? s.Showrunner ?? '';
        const g = s.genre ?? s.Genre ?? '';
        return `${title} ${runner} ${g}`.toLowerCase().includes(search.toLowerCase()) && (genre === '__all__' || g.split(',').some(x => x.trim() === genre));
    }).sort((a, b) => {
        if (sort === 'title') return (a.title ?? a.Title ?? '').localeCompare(b.title ?? b.Title ?? '', i18n.language);
        const da = new Date(a.premiere ?? a.Premiere).getTime() || 0;
        const db = new Date(b.premiere ?? b.Premiere).getTime() || 0;
        return sort === 'oldest' ? da - db : db - da;
    }), [shows, search, genre, sort, i18n.language]);
    return <>
        <section className="hero">
            <div className="hero-grain"/>
            <div className="hero-content">
                <div className="eyebrow"><span className="eyebrow-line"/> {t('hero.eyebrow')}</div>
                <h1>{t('hero.title1')}<br/>{t('hero.title2')}
                    <span>{i18n.language.startsWith('ru') ? ' тобой.' : ' you.'}</span></h1><p
                className="hero-copy">{t('hero.copy')}</p>
                <div className="hero-index"><span>01</span><span className="index-rule"/><span>{t('hero.index')}</span>
                </div>
            </div>
            <div className="hero-art" aria-hidden="true">
                <div className="art-ring ring-one"/>
                <div className="art-ring ring-two"/>
                <div className="art-glow"/>
                <div className="art-orbit-core"><span/><span/><span/></div>
                <div className="art-caption"><span>FRAME 001</span><span>EVERY STORY MATTERS</span></div>
                <div className="art-vertical">PLOTTWISTED / SERIES ARCHIVE / EST. 2025</div>
            </div>
            <div className="hero-bottom"><span>{t('hero.bottom1')}</span><span>{t('hero.bottom2')}</span></div>
        </section>
        <section className="catalog-section" id="catalog">
            <div className="section-heading">
                <div>
                    <div className="eyebrow"><span className="eyebrow-line"/> {t('catalog.eyebrow')}</div>
                    <h2>{t('catalog.title')}<span className="heading-period">.</span></h2><p>{t('catalog.subtitle')}</p>
                </div>
                <div className="collection-count">
                    <strong>{String(shows.length).padStart(2, '0')}</strong><span>{t('catalog.count').split('|')[0]}<br/>{t('catalog.count').split('|')[1]}</span>
                </div>
            </div>
            <div className="filter-bar">
                <div className="search-box"><Search size={17}/><input aria-label={t('catalog.searchLabel')}
                                                                      value={search}
                                                                      onChange={e => setSearch(e.target.value)}
                                                                      placeholder={t('catalog.search')}/><kbd>⌕</kbd>
                </div>
                <div className="filter-controls"><StyledSelect className="filter-select" icon={SlidersHorizontal}
                                                               value={genre} onChange={setGenre}
                                                               ariaLabel={t('catalog.genreLabel')} options={[{
                    value: '__all__',
                    label: t('catalog.allGenres')
                }, ...genres.map(g => ({value: g, label: g}))]}/><StyledSelect className="filter-select sort-select"
                                                                               value={sort} onChange={setSort}
                                                                               ariaLabel={t('catalog.sortLabel')}
                                                                               options={[{
                                                                                   value: 'newest',
                                                                                   label: t('catalog.newest')
                                                                               }, {
                                                                                   value: 'oldest',
                                                                                   label: t('catalog.oldest')
                                                                               }, {
                                                                                   value: 'title',
                                                                                   label: t('catalog.titleAZ')
                                                                               }]}/></div>
            </div>
            {loading ? <div className="loading-grid">{[1, 2, 3].map(n => <div className="skeleton-card" key={n}>
                <div/>
                <span/><span/></div>)}</div> : error ?
                <div className="state-panel error-panel"><span className="state-icon"><Tv2 size={25}/></span>
                    <h3>{t('catalog.failedTitle')}</h3><p>{error}</p>
                    <button className="button button-primary" onClick={load}>{t('catalog.tryAgain')}</button>
                    <small>{t('catalog.apiHelp')}</small></div> : filtered.length ? <>
                    <div className="results-line"><span>{t('catalog.showing')}
                        <strong>{filtered.length}</strong> {t('catalog.series')}</span><span><Sparkles
                        size={13}/> {t('catalog.selected')}</span></div>
                    <div className="show-grid">{filtered.map((show, i) => <TvShowCard key={show.id ?? show.Id ?? i}
                                                                                      show={show} index={i}/>)}</div>
                </> : <div className="state-panel"><span className="state-icon"><Film size={25}/></span>
                    <h3>{shows.length ? t('catalog.noResults') : t('catalog.noShows')}</h3>
                    <p>{shows.length ? t('catalog.tryFilter') : t('catalog.firstShow')}</p>{shows.length ?
                        <button className="button button-ghost" onClick={() => {
                            setSearch('');
                            setGenre('__all__');
                        }}>{t('catalog.clear')}</button> :
                        <Link to="/shows/new" className="button button-primary">{t('catalog.addFirst')}</Link>}</div>}
        </section>
        <section className="quote-strip"><span className="quote-mark">“</span>
            <p>{t('quote.line1')}<br/><em>{t('quote.line2')}</em></p><span
                className="quote-credit">{t('quote.credit')}</span></section>
    </>;
}

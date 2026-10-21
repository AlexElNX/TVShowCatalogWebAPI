import {useEffect, useMemo, useState} from 'react';
import {ArrowDown, Clapperboard, Film, Search, SlidersHorizontal, Sparkles, Tv2} from 'lucide-react';
import {Link} from 'react-router-dom';
import {tvShowApi} from '../api/tvShowApi';
import TvShowCard from '../components/TvShowCard';

export default function CatalogPage() {
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState('All genres');
    const [sort, setSort] = useState('newest');
    const load = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await tvShowApi.getAll();
            setShows(Array.isArray(data) ? data : data?.$values || []);
        } catch (e) {
            setError(e.message || 'Could not load the catalog.');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        load();
    }, []);
    const genres = useMemo(() => ['All genres', ...new Set(shows.map(s => s.genre ?? s.Genre).filter(Boolean).flatMap(g => g.split(',').map(x => x.trim())).filter(Boolean))].sort((a, b) => a === 'All genres' ? -1 : b === 'All genres' ? 1 : a.localeCompare(b)), [shows]);
    const filtered = useMemo(() => shows.filter(s => {
        const title = s.title ?? s.Title ?? '';
        const runner = s.showrunner ?? s.Showrunner ?? '';
        const g = s.genre ?? s.Genre ?? '';
        return `${title} ${runner} ${g}`.toLowerCase().includes(search.toLowerCase()) && (genre === 'All genres' || g.split(',').some(x => x.trim() === genre));
    }).sort((a, b) => {
        if (sort === 'title') return (a.title ?? a.Title ?? '').localeCompare(b.title ?? b.Title ?? '');
        const da = new Date(a.premiere ?? a.Premiere).getTime() || 0;
        const db = new Date(b.premiere ?? b.Premiere).getTime() || 0;
        return sort === 'oldest' ? da - db : db - da;
    }), [shows, search, genre, sort]);
    return <>
        <section className="hero">
            <div className="hero-grain"/>
            <div className="hero-content">
                <div className="eyebrow"><span className="eyebrow-line"/> THE ART OF GREAT TELEVISION</div>
                <h1>Some stories<br/>stay with <span>you.</span></h1><p className="hero-copy">A handpicked archive of
                the series that made us laugh, kept us up, and changed the way we see the world.</p><a href="#catalog"
                                                                                                       className="hero-link">Explore
                the collection <ArrowDown size={16}/></a>
                <div className="hero-index"><span>01</span><span className="index-rule"/><span>THE COLLECTION</span>
                </div>
            </div>
            <div className="hero-art" aria-hidden="true">
                <div className="art-ring ring-one"/>
                <div className="art-ring ring-two"/>
                <div className="art-glow"/>
                <div className="art-monogram">R<span>.</span></div>
                <div className="art-caption"><span>FRAME 001</span><span>EVERY STORY MATTERS</span></div>
                <div className="art-vertical">REELRANK / SERIES ARCHIVE / EST. 2025</div>
            </div>
            <div className="hero-bottom"><span>CURATED FOR THE CURIOUS</span><span>NO SKIPS. JUST CLASSICS.</span></div>
        </section>
        <section className="catalog-section" id="catalog">
            <div className="section-heading">
                <div>
                    <div className="eyebrow"><span className="eyebrow-line"/> THE WATCHLIST</div>
                    <h2>The collection<span className="heading-period">.</span></h2><p>Great television, one
                    unforgettable series at a time.</p></div>
                <div className="collection-count">
                    <strong>{String(shows.length).padStart(2, '0')}</strong><span>SERIES<br/>IN THE ARCHIVE</span></div>
            </div>
            <div className="filter-bar">
                <div className="search-box"><Search size={17}/><input aria-label="Search series" value={search}
                                                                      onChange={e => setSearch(e.target.value)}
                                                                      placeholder="Search titles, creators, genres…"/><kbd>⌕</kbd>
                </div>
                <div className="filter-controls"><label className="select-wrap"><SlidersHorizontal size={15}/><select
                    value={genre} onChange={e => setGenre(e.target.value)} aria-label="Filter by genre">{genres.map(g =>
                    <option key={g}>{g}</option>)}</select></label><label className="select-wrap"><select value={sort}
                                                                                                          onChange={e => setSort(e.target.value)}
                                                                                                          aria-label="Sort series">
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                    <option value="title">Title A–Z</option>
                </select></label></div>
            </div>
            {loading ? <div className="loading-grid">{[1, 2, 3].map(n => <div className="skeleton-card" key={n}>
                <div/>
                <span/><span/></div>)}</div> : error ?
                <div className="state-panel error-panel"><span className="state-icon"><Tv2 size={25}/></span><h3>We
                    couldn't reach the archive.</h3><p>{error}</p>
                    <button className="button button-primary" onClick={load}>Try again</button>
                    <small>Check that the API is running at https://localhost:7010 and open it once in your browser to
                        trust its development certificate.</small></div> : filtered.length ? <>
                    <div className="results-line">
                        <span>SHOWING <strong>{filtered.length}</strong> {filtered.length === 1 ? 'SERIES' : 'SERIES'}</span><span><Sparkles
                        size={13}/> SELECTED STORIES</span></div>
                    <div className="show-grid">{filtered.map((show, i) => <TvShowCard key={show.id ?? show.Id ?? i}
                                                                                      show={show} index={i}/>)}</div>
                </> : <div className="state-panel"><span className="state-icon"><Film size={25}/></span>
                    <h3>{shows.length ? 'Nothing in this frame.' : 'The story starts here.'}</h3>
                    <p>{shows.length ? 'Try a different search or filter.' : 'Your collection is ready for its first great series.'}</p>{shows.length ?
                        <button className="button button-ghost" onClick={() => {
                            setSearch('');
                            setGenre('All genres');
                        }}>Clear filters</button> :
                        <Link to="/shows/new" className="button button-primary">Add the first show</Link>}</div>}
        </section>
        <section className="quote-strip"><span className="quote-mark">“</span><p>Television is not just something we
            watch.<br/><em>It’s somewhere we go.</em></p><span className="quote-credit">THE REELRANK PHILOSOPHY</span>
        </section>
    </>;
}

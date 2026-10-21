import {useEffect, useState} from 'react';
import {ArrowLeft, CalendarDays, Clapperboard, Pencil, Trash2} from 'lucide-react';
import {Link, useParams} from 'react-router-dom';
import {getYear, posterUrl, tvShowApi} from '../api/tvShowApi';

export default function ShowDetailsPage() {
    const {id} = useParams();
    const [show, setShow] = useState(null);
    const [error, setError] = useState('');
    useEffect(() => {
        tvShowApi.getById(id).then(setShow).catch(e => setError(e.message));
    }, [id]);
    if (error) return <div className="state-panel detail-state"><h3>We couldn't find this series.</h3><p>{error}</p>
        <Link to="/" className="button button-ghost">Back to collection</Link></div>;
    if (!show) return <div className="state-panel detail-state"><span className="spinner spinner-large"/>Loading series…
    </div>;
    const title = show.title ?? show.Title;
    const genre = show.genre ?? show.Genre;
    const runner = show.showrunner ?? show.Showrunner;
    const date = show.premiere ?? show.Premiere;
    const description = show.description ?? show.Description;
    const poster = posterUrl(show.poster ?? show.Poster);
    return <section className="detail-page"><Link to="/" className="back-link"><ArrowLeft size={15}/> Back to collection</Link>
        <div className="detail-layout">
            <div className="detail-poster">{poster ? <img src={poster} alt={`${title} poster`} onError={e => {
                e.currentTarget.style.display = 'none';
            }}/> : <div className="detail-poster-placeholder"><Clapperboard size={54}/><span>{title}</span></div>}<span
                className="poster-label">REELRANK / FEATURED ENTRY</span></div>
            <div className="detail-copy">
                <div className="eyebrow"><span className="eyebrow-line"/> THE SERIES FILE</div>
                <div className="detail-year">{getYear(date)} <span>—</span> SERIES ARCHIVE</div>
                <h1>{title}<span>.</span></h1>
                <div className="detail-tags"><span>{genre}</span></div>
                <div className="detail-facts">
                    <div><span className="fact-icon"><Clapperboard
                        size={17}/></span><span><small>CREATED / SHOWRUNNER</small><strong>{runner || 'Not specified'}</strong></span>
                    </div>
                    <div><span className="fact-icon"><CalendarDays
                        size={17}/></span><span><small>PREMIERE DATE</small><strong>{date ? new Date(date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        timeZone: 'UTC'
                    }) : 'Not specified'}</strong></span></div>
                </div>
                <div className="detail-description"><h2>The story</h2>
                    <p>{description || 'No description has been added to this entry yet.'}</p></div>
                <div className="detail-actions"><Link to={`/shows/${id}/edit`} className="button button-gold"><Pencil
                    size={16}/> Edit series</Link><Link to={`/shows/${id}/delete`}
                                                        className="button button-danger-outline"><Trash2
                    size={16}/> Remove entry</Link></div>
                <div className="detail-id">CATALOG ENTRY <span>#{String(id).padStart(4, '0')}</span></div>
            </div>
        </div>
    </section>;
}

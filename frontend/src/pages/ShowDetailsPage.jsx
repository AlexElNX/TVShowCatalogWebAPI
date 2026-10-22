import {useEffect, useState} from 'react';
import {ArrowLeft, CalendarDays, Clapperboard, Pencil, Trash2} from 'lucide-react';
import {Link, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {getYear, posterUrl, tvShowApi} from '../api/tvShowApi';

export default function ShowDetailsPage() {
    const {t, i18n} = useTranslation();
    const {id} = useParams();
    const [show, setShow] = useState(null);
    const [error, setError] = useState('');
    useEffect(() => {
        tvShowApi.getById(id).then(setShow).catch(e => setError(e.message));
    }, [id]);
    if (error) return <div className="state-panel detail-state"><h3>{t('details.missing')}</h3><p>{error}</p><Link
        to="/" className="button button-ghost">{t('details.back')}</Link></div>;
    if (!show) return <div className="state-panel detail-state"><span
        className="spinner spinner-large"/>{t('details.loading')}</div>;
    const title = show.title ?? show.Title;
    const genre = show.genre ?? show.Genre;
    const runner = show.showrunner ?? show.Showrunner;
    const date = show.premiere ?? show.Premiere;
    const description = show.description ?? show.Description;
    const poster = posterUrl(show.poster ?? show.Poster);
    const formattedDate = date ? new Date(date).toLocaleDateString(i18n.language === 'ru' ? 'ru-RU' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
    }) : t('details.notSpecified');
    return <section className="detail-page"><Link to="/" className="back-link"><ArrowLeft
        size={15}/> {t('details.back')}</Link>
        <div className="detail-layout">
            <div className="detail-poster">{poster ? <img src={poster} alt={t('card.poster', {title})} onError={e => {
                e.currentTarget.style.display = 'none';
            }}/> : <div className="detail-poster-placeholder"><Clapperboard size={54}/><span>{title}</span></div>}<span
                className="poster-label">{t('details.featured')}</span></div>
            <div className="detail-copy">
                <div className="eyebrow"><span className="eyebrow-line"/> {t('details.file')}</div>
                <div className="detail-year">{getYear(date)} <span>—</span> {t('details.archive')}</div>
                <h1>{title}<span>.</span></h1>
                <div className="detail-tags"><span>{genre}</span></div>
                <div className="detail-facts">
                    <div><span className="fact-icon"><Clapperboard
                        size={17}/></span><span><small>{t('details.creator')}</small><strong>{runner || t('details.notSpecified')}</strong></span>
                    </div>
                    <div><span className="fact-icon"><CalendarDays
                        size={17}/></span><span><small>{t('details.premiere')}</small><strong>{formattedDate}</strong></span>
                    </div>
                </div>
                <div className="detail-description"><h2>{t('details.story')}</h2>
                    <p>{description || t('details.noDescription')}</p></div>
                <div className="detail-actions"><Link to={`/shows/${id}/edit`} className="button button-gold"><Pencil
                    size={16}/> {t('details.edit')}</Link><Link to={`/shows/${id}/delete`}
                                                                className="button button-danger-outline"><Trash2
                    size={16}/> {t('details.remove')}</Link></div>
                <div className="detail-id">{t('details.entry')} <span>#{String(id).padStart(4, '0')}</span></div>
            </div>
        </div>
    </section>;
}

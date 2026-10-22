import {ArrowUpRight, CalendarDays, Clapperboard, Pencil, Trash2} from 'lucide-react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {getYear, posterUrl} from '../api/tvShowApi';

export default function TvShowCard({show, index = 0}) {
    const {t} = useTranslation();
    const id = show.id ?? show.Id;
    const title = show.title ?? show.Title ?? t('card.untitled');
    const genre = show.genre ?? show.Genre ?? t('card.uncategorized');
    const premiere = show.premiere ?? show.Premiere;
    const showrunner = show.showrunner ?? show.Showrunner ?? t('card.unknown');
    const description = show.description ?? show.Description ?? '';
    const poster = posterUrl(show.poster ?? show.Poster);
    return <article className="show-card" style={{'--card-index': index}}>
        <Link to={`/shows/${id}`} className="poster-link" aria-label={t('card.view', {title})}>
            <div className="poster-frame">{poster ?
                <img src={poster} alt={t('card.poster', {title})} loading="lazy" onError={e => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextSibling.style.display = 'grid';
                }}/> : null}
                <div className="poster-placeholder" style={{display: poster ? 'none' : 'grid'}}><Clapperboard
                    size={36}/><span>{title}</span></div>
                <div className="poster-shade"/>
                <span className="genre-pill">{genre}</span><span className="poster-open"><ArrowUpRight
                    size={19}/></span></div>
        </Link>
        <div className="show-card-content">
            <div className="show-meta"><span><CalendarDays size={13}/>{getYear(premiere)}</span><span
                className="showrunner"><Clapperboard size={13}/>{showrunner}</span></div>
            <Link to={`/shows/${id}`} className="show-title-link"><h3>{title}</h3></Link><p
            className="show-description">{description || t('catalog.emptyDescription')}</p>
            <div className="card-actions"><Link to={`/shows/${id}`} className="details-link">{t('catalog.explore')}
                <ArrowUpRight size={15}/></Link>
                <div className="icon-actions"><Link to={`/shows/${id}/edit`} aria-label={`${t('card.edit')}: ${title}`}
                                                    title={t('card.edit')}><Pencil size={15}/></Link><Link
                    to={`/shows/${id}/delete`} aria-label={`${t('card.delete')}: ${title}`} title={t('card.delete')}
                    className="delete-icon"><Trash2 size={15}/></Link></div>
            </div>
        </div>
    </article>;
}

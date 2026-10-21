import {useEffect, useState} from 'react';
import {AlertTriangle, ArrowLeft, Clapperboard, LoaderCircle, Trash2} from 'lucide-react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {getYear, posterUrl, tvShowApi} from '../api/tvShowApi';

export default function DeleteShowPage() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [show, setShow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState('');
    useEffect(() => {
        tvShowApi.getById(id).then(setShow).catch(e => setError(e.message)).finally(() => setLoading(false));
    }, [id]);
    const remove = async () => {
        setDeleting(true);
        setError('');
        try {
            await tvShowApi.remove(id);
            navigate('/', {replace: true});
        } catch (e) {
            setError(e.message || 'Could not delete this series.');
            setDeleting(false);
        }
    };
    if (loading) return <div className="state-panel detail-state"><span className="spinner spinner-large"/>Loading
        series…</div>;
    if (!show) return <div className="state-panel detail-state"><h3>Could not load this series.</h3><p>{error}</p><Link
        to="/" className="button button-ghost">Back to collection</Link></div>;
    const title = show.title ?? show.Title;
    const poster = posterUrl(show.poster ?? show.Poster);
    return <section className="delete-page">
        <div className="delete-mark"><AlertTriangle size={26}/></div>
        <div className="eyebrow"><span className="eyebrow-line"/> ONE LAST THING</div>
        <h1>Remove this<br/><span>series?</span></h1><p className="delete-intro">This will permanently remove the entry
        from your collection. There’s no undo button for this one.</p>
        <div className="delete-preview">{poster ? <img src={poster} alt=""/> :
            <div className="delete-preview-fallback"><Clapperboard size={23}/></div>}
            <div>
                <strong>{title}</strong><span>{show.genre ?? show.Genre} · {getYear(show.premiere ?? show.Premiere)}</span><small>CATALOG
                ENTRY #{String(id).padStart(4, '0')}</small></div>
        </div>
        {error && <div className="notice notice-error">{error}</div>}
        <div className="delete-actions"><Link to={`/shows/${id}`} className="button button-ghost"><ArrowLeft
            size={16}/> Keep this series</Link>
            <button className="button button-danger" onClick={remove} disabled={deleting}>{deleting ?
                <LoaderCircle size={16} className="spin"/> :
                <Trash2 size={16}/>} {deleting ? 'Removing…' : 'Yes, remove it'}</button>
        </div>
        <p className="delete-footnote">YOU’RE REMOVING THE CATALOG ENTRY, NOT THE STORY ITSELF.</p></section>;
}

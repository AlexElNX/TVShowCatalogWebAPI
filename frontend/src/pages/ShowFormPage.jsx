import {useEffect, useState} from 'react';
import {ArrowLeft, Clapperboard, PencilLine, Plus} from 'lucide-react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {tvShowApi} from '../api/tvShowApi';
import TvShowForm from '../components/TvShowForm';

export default function ShowFormPage({mode}) {
    const {id} = useParams();
    const navigate = useNavigate();
    const [show, setShow] = useState(null);
    const [loading, setLoading] = useState(mode === 'edit');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    useEffect(() => {
        if (mode !== 'edit') return;
        tvShowApi.getById(id).then(setShow).catch(e => setError(e.message)).finally(() => setLoading(false));
    }, [id, mode]);
    const submit = async data => {
        setSubmitting(true);
        setError('');
        try {
            if (mode === 'edit') await tvShowApi.update(id, data); else await tvShowApi.create(data);
            navigate(mode === 'edit' ? `/shows/${id}` : '/', {replace: true});
        } catch (e) {
            setError(e.message || 'Could not save this series.');
        } finally {
            setSubmitting(false);
        }
    };
    const isEdit = mode === 'edit';
    return <section className="editor-page">
        <div className="editor-topline"><Link to={isEdit ? `/shows/${id}` : '/'} className="back-link"><ArrowLeft
            size={15}/> {isEdit ? 'Back to show' : 'Back to collection'}
        </Link><span>REELRANK / {isEdit ? 'EDIT ENTRY' : 'NEW ENTRY'}</span></div>
        <div className="editor-heading"><span className="editor-icon">{isEdit ? <PencilLine size={22}/> :
            <Plus size={23}/>}</span>
            <div>
                <div className="eyebrow"><span
                    className="eyebrow-line"/> {isEdit ? 'REFINE THE RECORD' : 'ADD TO THE ARCHIVE'}</div>
                <h1>{isEdit ? 'Edit a series' : 'Every classic starts somewhere'}<span>.</span></h1>
                <p>{isEdit ? 'Update the details and keep the collection in good shape.' : 'Give a great story the place in the archive it deserves.'}</p>
            </div>
        </div>
        {error && <div className="notice notice-error">{error}</div>}{loading ?
        <div className="state-panel"><span className="spinner spinner-large"/>Loading series…
        </div> : !show && isEdit && error ?
            <div className="state-panel"><Clapperboard size={26}/><h3>Could not load this series.</h3><Link
                className="button button-ghost" to="/">Return to collection</Link></div> :
            <TvShowForm mode={mode} initialShow={show} onSubmit={submit} submitting={submitting}/>}<p
        className="form-disclaimer">FIELDS MARKED <span>*</span> ARE REQUIRED. YOUR CHANGES ARE SAVED TO THE CATALOG
        DATABASE.</p></section>;
}

import {useEffect, useState} from 'react';
import {ArrowLeft, Clapperboard, PencilLine, Plus} from 'lucide-react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {tvShowApi} from '../api/tvShowApi';
import TvShowForm from '../components/TvShowForm';

export default function ShowFormPage({mode}) {
    const {t} = useTranslation();
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
            setError(e.message || t('formPage.saveError'));
        } finally {
            setSubmitting(false);
        }
    };
    const isEdit = mode === 'edit';
    return <section className="editor-page">
        <div className="editor-topline"><Link to={isEdit ? `/shows/${id}` : '/'} className="back-link"><ArrowLeft
            size={15}/> {isEdit ? t('formPage.backShow') : t('formPage.backCollection')}
        </Link><span>PLOTTWISTED / {isEdit ? t('formPage.editTag') : t('formPage.newTag')}</span></div>
        <div className="editor-heading"><span className="editor-icon">{isEdit ? <PencilLine size={22}/> :
            <Plus size={23}/>}</span>
            <div>
                <div className="eyebrow"><span
                    className="eyebrow-line"/> {isEdit ? t('formPage.refine') : t('formPage.addTag')}</div>
                <h1>{isEdit ? t('formPage.editTitle') : t('formPage.createTitle')}<span>.</span></h1>
                <p>{isEdit ? t('formPage.editCopy') : t('formPage.createCopy')}</p></div>
        </div>
        {error && <div className="notice notice-error">{error}</div>}{loading ?
        <div className="state-panel"><span className="spinner spinner-large"/>{t('formPage.loading')}
        </div> : !show && isEdit && error ?
            <div className="state-panel"><Clapperboard size={26}/><h3>{t('formPage.loadError')}</h3><Link
                className="button button-ghost" to="/">{t('common.returnHome')}</Link></div> :
            <TvShowForm mode={mode} initialShow={show} onSubmit={submit} submitting={submitting}/>}<p
        className="form-disclaimer">{t('formPage.disclaimer')}
        <span>{t('formPage.required')}</span> {t('formPage.disclaimerEnd')}</p></section>;
}

import {useEffect, useState} from 'react';
import {ArrowLeft, ImagePlus, Save, UploadCloud} from 'lucide-react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {posterUrl} from '../api/tvShowApi';

const emptyForm = {title: '', showrunner: '', premiere: '', genre: '', description: ''};
export default function TvShowForm({mode = 'create', initialShow, onSubmit, submitting}) {
    const {t} = useTranslation();
    const [form, setForm] = useState(emptyForm);
    const [posterFile, setPosterFile] = useState(null);
    const [preview, setPreview] = useState('');
    const [errors, setErrors] = useState({});
    useEffect(() => {
        if (!initialShow) return;
        setForm({
            title: initialShow.title ?? initialShow.Title ?? '',
            showrunner: initialShow.showrunner ?? initialShow.Showrunner ?? '',
            premiere: String(initialShow.premiere ?? initialShow.Premiere ?? '').slice(0, 10),
            genre: initialShow.genre ?? initialShow.Genre ?? '',
            description: initialShow.description ?? initialShow.Description ?? ''
        });
        setPreview(posterUrl(initialShow.poster ?? initialShow.Poster));
    }, [initialShow]);
    useEffect(() => {
        if (!posterFile) return;
        const url = URL.createObjectURL(posterFile);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [posterFile]);
    const change = e => setForm(prev => ({...prev, [e.target.name]: e.target.value}));
    const validate = () => {
        const next = {};
        if (!form.title.trim()) next.title = t('form.titleRequired');
        if (!form.showrunner.trim()) next.showrunner = t('form.showrunnerRequired');
        if (!form.premiere) next.premiere = t('form.premiereRequired');
        if (!form.genre.trim()) next.genre = t('form.genreRequired');
        setErrors(next);
        return Object.keys(next).length === 0;
    };
    const submit = async e => {
        e.preventDefault();
        if (!validate()) return;
        const data = new FormData();
        data.append('Title', form.title.trim());
        data.append('Showrunner', form.showrunner.trim());
        data.append('Premiere', form.premiere);
        data.append('Genre', form.genre.trim());
        data.append('Description', form.description.trim());
        if (initialShow) data.append('Id', String(initialShow.id ?? initialShow.Id));
        if (posterFile) data.append('posterFile', posterFile);
        await onSubmit(data);
    };
    return <form className="form-panel" onSubmit={submit} noValidate>
        <div className="form-grid">
            <div className="field field-wide"><label htmlFor="title">{t('form.title')} <span>*</span></label><input
                id="title" name="title" value={form.title} onChange={change} placeholder={t('form.titlePlaceholder')}
                maxLength={150}/>{errors.title && <small className="field-error">{errors.title}</small>}</div>
            <div className="field"><label htmlFor="showrunner">{t('form.showrunner')} <span>*</span></label><input
                id="showrunner" name="showrunner" value={form.showrunner} onChange={change}
                placeholder={t('form.showrunnerPlaceholder')} maxLength={120}/>{errors.showrunner &&
                <small className="field-error">{errors.showrunner}</small>}</div>
            <div className="field"><label htmlFor="premiere">{t('form.premiere')} <span>*</span></label><input
                id="premiere" name="premiere" type="date" value={form.premiere} onChange={change}/>{errors.premiere &&
                <small className="field-error">{errors.premiere}</small>}</div>
            <div className="field field-wide"><label htmlFor="genre">{t('form.genre')} <span>*</span></label><input
                id="genre" name="genre" value={form.genre} onChange={change} placeholder={t('form.genrePlaceholder')}
                maxLength={100}/>{errors.genre && <small className="field-error">{errors.genre}</small>}</div>
            <div className="field field-wide"><label htmlFor="description">{t('form.story')}
                <small>{t('form.optional')}</small></label><textarea id="description" name="description"
                                                                     value={form.description} onChange={change} rows={5}
                                                                     placeholder={t('form.descriptionPlaceholder')}
                                                                     maxLength={3000}/>
                <div className="char-count">{form.description.length}/3000</div>
            </div>
            <div className="field field-wide"><label>{t('form.poster')}
                <small>{t('form.optional')}</small></label><label className="upload-zone"
                                                                  htmlFor="posterFile">{preview ?
                <img className="upload-preview" src={preview} alt={t('form.preview')}/> :
                <span className="upload-icon"><ImagePlus size={25}/></span>}<span
                className="upload-copy"><strong>{posterFile ? posterFile.name : t('form.choosePoster')}</strong><span>{t('form.fileTypes')}</span></span><span
                className="upload-action"><UploadCloud size={16}/> {t('form.browse')}</span></label><input
                className="visually-hidden" id="posterFile" type="file" accept="image/*"
                onChange={e => setPosterFile(e.target.files?.[0] || null)}/>{mode === 'edit' &&
                <p className="field-hint">{t('form.keepPoster')}</p>}</div>
        </div>
        <div className="form-footer"><Link to="/" className="button button-ghost"><ArrowLeft
            size={16}/> {t('form.back')}</Link>
            <button type="submit" className={`button ${mode === 'edit' ? 'button-gold' : 'button-primary'}`}
                    disabled={submitting}>{submitting ? <span className="spinner"/> : <Save
                size={16}/>} {submitting ? t('form.saving') : mode === 'edit' ? t('form.save') : t('form.add')}</button>
        </div>
    </form>;
}

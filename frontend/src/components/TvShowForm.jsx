import {useEffect, useState} from 'react';
import {ArrowLeft, ImagePlus, Save, UploadCloud} from 'lucide-react';
import {Link} from 'react-router-dom';
import {posterUrl} from '../api/tvShowApi';

const emptyForm = {title: '', showrunner: '', premiere: '', genre: '', description: ''};
export default function TvShowForm({mode = 'create', initialShow, onSubmit, submitting}) {
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
            description: initialShow.description ?? initialShow.Description ?? '',
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
        if (!form.title.trim()) next.title = 'Please enter a title.';
        if (!form.showrunner.trim()) next.showrunner = 'Please enter the showrunner.';
        if (!form.premiere) next.premiere = 'Please choose the premiere date.';
        if (!form.genre.trim()) next.genre = 'Please enter at least one genre.';
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
            <div className="field field-wide"><label htmlFor="title">Series title <span>*</span></label><input
                id="title" name="title" value={form.title} onChange={change} placeholder="e.g. Breaking Bad"
                maxLength={150}/>{errors.title && <small className="field-error">{errors.title}</small>}</div>
            <div className="field"><label htmlFor="showrunner">Showrunner <span>*</span></label><input id="showrunner"
                                                                                                       name="showrunner"
                                                                                                       value={form.showrunner}
                                                                                                       onChange={change}
                                                                                                       placeholder="e.g. Vince Gilligan"
                                                                                                       maxLength={120}/>{errors.showrunner &&
                <small className="field-error">{errors.showrunner}</small>}</div>
            <div className="field"><label htmlFor="premiere">Premiere date <span>*</span></label><input id="premiere"
                                                                                                        name="premiere"
                                                                                                        type="date"
                                                                                                        value={form.premiere}
                                                                                                        onChange={change}/>{errors.premiere &&
                <small className="field-error">{errors.premiere}</small>}</div>
            <div className="field field-wide"><label htmlFor="genre">Genre <span>*</span></label><input id="genre"
                                                                                                        name="genre"
                                                                                                        value={form.genre}
                                                                                                        onChange={change}
                                                                                                        placeholder="Crime, Drama, Thriller"
                                                                                                        maxLength={100}/>{errors.genre &&
                <small className="field-error">{errors.genre}</small>}</div>
            <div className="field field-wide"><label htmlFor="description">The
                story <small>OPTIONAL</small></label><textarea id="description" name="description"
                                                               value={form.description} onChange={change} rows={5}
                                                               placeholder="What makes this series unforgettable?"
                                                               maxLength={3000}/>
                <div className="char-count">{form.description.length}/3000</div>
            </div>
            <div className="field field-wide"><label>Poster
                artwork <small>{mode === 'edit' ? 'OPTIONAL' : 'OPTIONAL'}</small></label><label className="upload-zone"
                                                                                                 htmlFor="posterFile">{preview ?
                <img className="upload-preview" src={preview} alt="Poster preview"/> :
                <span className="upload-icon"><ImagePlus size={25}/></span>}<span
                className="upload-copy"><strong>{posterFile ? posterFile.name : 'Choose poster artwork'}</strong><span>PNG, JPG, WEBP · up to 10 MB</span></span><span
                className="upload-action"><UploadCloud size={16}/> Browse</span></label><input
                className="visually-hidden" id="posterFile" type="file" accept="image/*"
                onChange={e => setPosterFile(e.target.files?.[0] || null)}/>{mode === 'edit' &&
                <p className="field-hint">Leave this empty to keep the current poster.</p>}</div>
        </div>
        <div className="form-footer"><Link to="/" className="button button-ghost"><ArrowLeft size={16}/> Back to
            collection</Link>
            <button type="submit" className={`button ${mode === 'edit' ? 'button-gold' : 'button-primary'}`}
                    disabled={submitting}>{submitting ? <span className="spinner"/> : <Save
                size={16}/>} {submitting ? 'Saving…' : mode === 'edit' ? 'Save changes' : 'Add to collection'}</button>
        </div>
    </form>;
}

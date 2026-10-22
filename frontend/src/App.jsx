import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import SiteLayout from './components/SiteLayout';
import CatalogPage from './pages/CatalogPage';
import ShowDetailsPage from './pages/ShowDetailsPage';
import ShowFormPage from './pages/ShowFormPage';
import DeleteShowPage from './pages/DeleteShowPage';
import LoginPage from './pages/LoginPage';
import './styles.css';

function NotFound() {
    const {t} = useTranslation();
    return <div className="state-panel detail-state"><h1>404<span>.</span></h1><h3>{t('common.notFound')}</h3><Link
        to="/" className="button button-primary">{t('common.returnHome')}</Link></div>;
}

export default function App() {
    return <BrowserRouter><Routes><Route element={<SiteLayout/>}><Route index element={<CatalogPage/>}/><Route
        path="login" element={<LoginPage/>}/><Route path="shows/new" element={<ShowFormPage mode="create"/>}/><Route
        path="shows/:id" element={<ShowDetailsPage/>}/><Route path="shows/:id/edit"
                                                              element={<ShowFormPage mode="edit"/>}/><Route
        path="shows/:id/delete" element={<DeleteShowPage/>}/><Route path="*" element={
        <NotFound/>}/></Route></Routes></BrowserRouter>;
}

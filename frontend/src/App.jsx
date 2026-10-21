import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SiteLayout from './components/SiteLayout';
import CatalogPage from './pages/CatalogPage';
import ShowDetailsPage from './pages/ShowDetailsPage';
import ShowFormPage from './pages/ShowFormPage';
import DeleteShowPage from './pages/DeleteShowPage';
import './styles.css';

function NotFound() {
    return (<>
        <div className="state-panel detail-state">
            <h1>404<span>.</span></h1>
            <h3>This page isn't in the archive.</h3>
            <a href="/" className="button button-primary">Return home</a>
        </div>
    </>)
}

export default function App() {
    return (<>
        <BrowserRouter>
            <Routes>
                <Route element={<SiteLayout/>}>
                    <Route index element={<CatalogPage/>}/>
                    <Route path="shows/new" element={<ShowFormPage mode="create"/>}/>
                    <Route path="shows/:id" element={<ShowDetailsPage/>}/>
                    <Route path="shows/:id/edit" element={<ShowFormPage mode="edit"/>}/>
                    <Route path="shows/:id/delete" element={<DeleteShowPage/>}/>
                    <Route path="*" element={<NotFound/>}/></Route>
            </Routes>
        </BrowserRouter>
    </>)
}

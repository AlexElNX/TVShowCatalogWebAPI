import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
    en: {
        translation: {
            language: 'Language', english: 'English', russian: 'Русский',
            nav: {
                discover: 'Discover',
                collection: 'The collection',
                add: 'Add a show',
                home: 'PlotTwisted home',
                login: 'Sign in',
                account: 'Account'
            },
            footer: {
                tagline: 'A personal collection of television worth remembering.',
                note: 'MADE FOR THE LOVE OF STORIES'
            },
            hero: {
                eyebrow: 'THE ART OF GREAT TELEVISION',
                title1: 'Some stories',
                title2: 'stay with',
                copy: 'A handpicked archive of the series that made us laugh, kept us up, and changed the way we see the world.',
                explore: 'Explore the collection',
                index: 'THE COLLECTION',
                bottom1: 'CURATED FOR THE CURIOUS',
                bottom2: 'NO SKIPS. JUST CLASSICS.'
            },
            catalog: {
                eyebrow: 'THE WATCHLIST',
                title: 'The collection',
                subtitle: 'Great television, one unforgettable series at a time.',
                count: 'SERIES|IN THE ARCHIVE',
                search: 'Search titles, creators, genres…',
                searchLabel: 'Search series',
                genreLabel: 'Filter by genre',
                sortLabel: 'Sort series',
                allGenres: 'All genres',
                newest: 'Newest first',
                oldest: 'Oldest first',
                titleAZ: 'Title A–Z',
                showing: 'SHOWING',
                series: 'SERIES',
                selected: 'SELECTED STORIES',
                noResults: 'Nothing in this frame.',
                noShows: 'The story starts here.',
                tryFilter: 'Try a different search or filter.',
                firstShow: 'Your collection is ready for its first great series.',
                clear: 'Clear filters',
                addFirst: 'Add the first show',
                failedTitle: "We couldn't reach the archive.",
                tryAgain: 'Try again',
                apiHelp: 'Check that the API is running at https://localhost:7010 and open it once in your browser to trust its development certificate.',
                emptyDescription: 'No description has been added yet.',
                explore: 'Explore show'
            },
            quote: {
                line1: 'Television is not just something we watch.',
                line2: 'It’s somewhere we go.',
                credit: 'THE PLOTTWISTED PHILOSOPHY'
            },
            card: {
                untitled: 'Untitled show',
                uncategorized: 'Uncategorized',
                unknown: 'Unknown creator',
                edit: 'Edit',
                delete: 'Delete',
                view: 'View {{title}}',
                poster: '{{title}} poster'
            },
            details: {
                missing: "We couldn't find this series.",
                back: 'Back to collection',
                loading: 'Loading series…',
                featured: 'PLOTTWISTED / FEATURED ENTRY',
                file: 'THE SERIES FILE',
                archive: 'SERIES ARCHIVE',
                creator: 'CREATED / SHOWRUNNER',
                premiere: 'PREMIERE DATE',
                notSpecified: 'Not specified',
                story: 'The story',
                noDescription: 'No description has been added to this entry yet.',
                edit: 'Edit series',
                remove: 'Remove entry',
                entry: 'CATALOG ENTRY'
            },
            formPage: {
                backShow: 'Back to show',
                backCollection: 'Back to collection',
                editTag: 'EDIT ENTRY',
                newTag: 'NEW ENTRY',
                refine: 'REFINE THE RECORD',
                addTag: 'ADD TO THE ARCHIVE',
                editTitle: 'Edit a series',
                createTitle: 'Every classic starts somewhere',
                editCopy: 'Update the details and keep the collection in good shape.',
                createCopy: 'Give a great story the place in the archive it deserves.',
                loading: 'Loading series…',
                loadError: 'Could not load this series.',
                saveError: 'Could not save this series.',
                disclaimer: 'FIELDS MARKED',
                required: '*',
                disclaimerEnd: 'ARE REQUIRED. YOUR CHANGES ARE SAVED TO THE CATALOG DATABASE.'
            },
            form: {
                title: 'Series title',
                showrunner: 'Showrunner',
                premiere: 'Premiere date',
                genre: 'Genre',
                story: 'The story',
                optional: 'OPTIONAL',
                poster: 'Poster artwork',
                choosePoster: 'Choose poster artwork',
                fileTypes: 'PNG, JPG, WEBP · up to 10 MB',
                browse: 'Browse',
                keepPoster: 'Leave this empty to keep the current poster.',
                back: 'Back to collection',
                save: 'Save changes',
                add: 'Add to collection',
                saving: 'Saving…',
                titlePlaceholder: 'e.g. Breaking Bad',
                showrunnerPlaceholder: 'e.g. Vince Gilligan',
                genrePlaceholder: 'Crime, Drama, Thriller',
                descriptionPlaceholder: 'What makes this series unforgettable?',
                preview: 'Poster preview',
                titleRequired: 'Please enter a title.',
                showrunnerRequired: 'Please enter the showrunner.',
                premiereRequired: 'Please choose the premiere date.',
                genreRequired: 'Please enter at least one genre.'
            },
            delete: {
                oneLast: 'ONE LAST THING',
                title1: 'Remove this',
                title2: 'series?',
                intro: 'This will permanently remove the entry from your collection. There’s no undo button for this one.',
                entry: 'CATALOG ENTRY',
                keep: 'Keep this series',
                confirm: 'Yes, remove it',
                removing: 'Removing…',
                footnote: 'YOU’RE REMOVING THE CATALOG ENTRY, NOT THE STORY ITSELF.',
                loadError: 'Could not load this series.',
                deleteError: 'Could not delete this series.'
            },
            login: {
                eyebrow: 'YOUR STORY STARTS HERE',
                title: 'Welcome to',
                brand: 'PlotTwisted',
                copy: 'Sign in with GitHub to keep your collection close and make this archive yours.',
                github: 'Continue with GitHub',
                working: 'Connecting to GitHub…',
                signedIn: 'You are signed in',
                signOut: 'Sign out',
                back: 'Back to the collection',
                setup: 'Firebase is not configured yet. Add the Firebase settings to .env.local and enable GitHub in Firebase Authentication.',
                syncError: 'You signed in, but saving your profile to the application database failed. Configure VITE_AUTH_SYNC_URL if your backend supports profile sync.',
                popupError: 'GitHub sign-in failed. Check Firebase Authentication settings and authorized domains.',
                privacy: 'Authentication is handled by Firebase. Your GitHub password is never shared with this site.'
            },
            common: {returnHome: 'Return home', notFound: "This page isn't in the archive.", retry: 'Try again'},
            api: {
                connection: 'Could not connect to the API ({{url}}). Make sure the backend is running and the localhost HTTPS certificate is trusted.',
                requestFailed: 'The request failed ({{status}}).'
            }
        }
    },
    ru: {
        translation: {
            language: 'Язык', english: 'English', russian: 'Русский',
            nav: {
                discover: 'Обзор',
                collection: 'Коллекция',
                add: 'Добавить сериал',
                home: 'На главную PlotTwisted',
                login: 'Войти',
                account: 'Аккаунт'
            },
            footer: {tagline: 'Личная коллекция сериалов, которые стоит помнить.', note: 'С ЛЮБОВЬЮ К ИСТОРИЯМ'},
            hero: {
                eyebrow: 'ИСКУССТВО ХОРОШЕГО ТЕЛЕВИДЕНИЯ',
                title1: 'Некоторые истории',
                title2: 'остаются с',
                copy: 'Коллекция сериалов, которые заставляли нас смеяться, не давали спать и меняли наш взгляд на мир.',
                explore: 'Перейти к коллекции',
                index: 'КОЛЛЕКЦИЯ',
                bottom1: 'ДЛЯ ЛЮБОПЫТНЫХ',
                bottom2: 'НИЧЕГО ЛИШНЕГО. ТОЛЬКО КЛАССИКА.'
            },
            catalog: {
                eyebrow: 'СПИСОК ДЛЯ ПРОСМОТРА',
                title: 'Коллекция',
                subtitle: 'Великолепные сериалы — одна незабываемая история за раз.',
                count: 'СЕРИАЛОВ|В КОЛЛЕКЦИИ',
                search: 'Поиск по названию, автору, жанру…',
                searchLabel: 'Поиск сериалов',
                genreLabel: 'Фильтр по жанру',
                sortLabel: 'Сортировка сериалов',
                allGenres: 'Все жанры',
                newest: 'Сначала новые',
                oldest: 'Сначала старые',
                titleAZ: 'По названию А–Я',
                showing: 'ПОКАЗАНО',
                series: 'СЕРИАЛОВ',
                selected: 'ИЗБРАННЫЕ ИСТОРИИ',
                noResults: 'В этом кадре пока пусто.',
                noShows: 'Всё начинается с первой истории.',
                tryFilter: 'Попробуй изменить запрос или фильтр.',
                firstShow: 'Коллекция готова принять свой первый великий сериал.',
                clear: 'Сбросить фильтры',
                addFirst: 'Добавить первый сериал',
                failedTitle: 'Не удалось открыть архив.',
                tryAgain: 'Повторить',
                apiHelp: 'Проверь, что API запущен по адресу https://localhost:7010, и открой этот адрес в браузере, чтобы подтвердить сертификат разработки.',
                emptyDescription: 'Описание пока не добавлено.',
                explore: 'Подробнее'
            },
            quote: {
                line1: 'Телевидение — это не просто то, что мы смотрим.',
                line2: 'Это место, куда мы отправляемся.',
                credit: 'ФИЛОСОФИЯ PLOTTWISTED'
            },
            card: {
                untitled: 'Без названия',
                uncategorized: 'Без категории',
                unknown: 'Автор не указан',
                edit: 'Редактировать',
                delete: 'Удалить',
                view: 'Открыть сериал «{{title}}»',
                poster: 'Постер сериала «{{title}}»'
            },
            details: {
                missing: 'Не удалось найти этот сериал.',
                back: 'Назад к коллекции',
                loading: 'Загрузка сериала…',
                featured: 'PLOTTWISTED / ВЫБРАННЫЙ СЕРИАЛ',
                file: 'КАРТОЧКА СЕРИАЛА',
                archive: 'АРХИВ СЕРИАЛОВ',
                creator: 'СОЗДАТЕЛЬ / ШОУРАННЕР',
                premiere: 'ДАТА ПРЕМЬЕРЫ',
                notSpecified: 'Не указано',
                story: 'О сериале',
                noDescription: 'Описание этого сериала пока не добавлено.',
                edit: 'Редактировать',
                remove: 'Удалить из коллекции',
                entry: 'ЗАПИСЬ В КАТАЛОГЕ'
            },
            formPage: {
                backShow: 'Назад к сериалу',
                backCollection: 'Назад к коллекции',
                editTag: 'РЕДАКТИРОВАНИЕ',
                newTag: 'НОВАЯ ЗАПИСЬ',
                refine: 'ОБНОВЛЕНИЕ ДАННЫХ',
                addTag: 'ДОБАВЛЕНИЕ В АРХИВ',
                editTitle: 'Редактирование сериала',
                createTitle: 'У каждой классики есть начало',
                editCopy: 'Обнови информацию, чтобы коллекция оставалась в порядке.',
                createCopy: 'Добавь хорошую историю в архив, которого она заслуживает.',
                loading: 'Загрузка сериала…',
                loadError: 'Не удалось загрузить сериал.',
                saveError: 'Не удалось сохранить сериал.',
                disclaimer: 'ПОЛЯ, ОТМЕЧЕННЫЕ',
                required: '*',
                disclaimerEnd: 'ОБЯЗАТЕЛЬНЫ. ИЗМЕНЕНИЯ СОХРАНЯЮТСЯ В БАЗЕ КАТАЛОГА.'
            },
            form: {
                title: 'Название сериала',
                showrunner: 'Шоураннер',
                premiere: 'Дата премьеры',
                genre: 'Жанр',
                story: 'Описание',
                optional: 'НЕОБЯЗАТЕЛЬНО',
                poster: 'Постер сериала',
                choosePoster: 'Выбрать изображение постера',
                fileTypes: 'PNG, JPG, WEBP · до 10 МБ',
                browse: 'Обзор',
                keepPoster: 'Оставь поле пустым, чтобы сохранить текущий постер.',
                back: 'Назад к коллекции',
                save: 'Сохранить изменения',
                add: 'Добавить в коллекцию',
                saving: 'Сохранение…',
                titlePlaceholder: 'например, Во все тяжкие',
                showrunnerPlaceholder: 'например, Винс Гиллиган',
                genrePlaceholder: 'Криминал, драма, триллер',
                descriptionPlaceholder: 'Чем этот сериал запоминается?',
                preview: 'Предпросмотр постера',
                titleRequired: 'Введи название сериала.',
                showrunnerRequired: 'Укажи шоураннера.',
                premiereRequired: 'Выбери дату премьеры.',
                genreRequired: 'Укажи хотя бы один жанр.'
            },
            delete: {
                oneLast: 'ПОСЛЕДНИЙ МОМЕНТ',
                title1: 'Удалить этот',
                title2: 'сериал?',
                intro: 'Запись будет безвозвратно удалена из коллекции. Отменить это действие не получится.',
                entry: 'ЗАПИСЬ В КАТАЛОГЕ',
                keep: 'Оставить сериал',
                confirm: 'Да, удалить',
                removing: 'Удаление…',
                footnote: 'УДАЛЯЕТСЯ ЗАПИСЬ В КАТАЛОГЕ, А НЕ САМА ИСТОРИЯ.',
                loadError: 'Не удалось загрузить сериал.',
                deleteError: 'Не удалось удалить сериал.'
            },
            login: {
                eyebrow: 'ТВОЯ ИСТОРИЯ НАЧИНАЕТСЯ ЗДЕСЬ',
                title: 'Добро пожаловать в',
                brand: 'PlotTwisted',
                copy: 'Войди через GitHub, чтобы сохранить доступ к своей коллекции и сделать этот архив своим.',
                github: 'Продолжить через GitHub',
                working: 'Подключаем GitHub…',
                signedIn: 'Ты вошёл в аккаунт',
                signOut: 'Выйти',
                back: 'Вернуться к коллекции',
                setup: 'Firebase ещё не настроен. Добавь параметры Firebase в .env.local и включи GitHub в Firebase Authentication.',
                syncError: 'Вход выполнен, но не удалось сохранить профиль в базе приложения. Настрой VITE_AUTH_SYNC_URL, если бэкенд поддерживает синхронизацию профиля.',
                popupError: 'Не удалось войти через GitHub. Проверь настройки Firebase Authentication и список разрешённых доменов.',
                privacy: 'Авторизация выполняется через Firebase. Пароль от GitHub не передаётся этому сайту.'
            },
            common: {returnHome: 'На главную', notFound: 'Такой страницы нет в архиве.', retry: 'Повторить'},
            api: {
                connection: 'Не удалось подключиться к API ({{url}}). Убедись, что бэкенд запущен и HTTPS-сертификат localhost доверенный.',
                requestFailed: 'Ошибка запроса ({{status}}).'
            }
        }
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: typeof window !== 'undefined' ? (window.localStorage.getItem('plottwisted-language') || 'en') : 'en',
    fallbackLng: 'en',
    interpolation: {escapeValue: false},
    returnNull: false,
});

if (typeof window !== 'undefined') {
    i18n.on('languageChanged', (language) => {
        window.localStorage.setItem('plottwisted-language', language);
        document.documentElement.lang = language.startsWith('ru') ? 'ru' : 'en';
    });
    document.documentElement.lang = i18n.resolvedLanguage?.startsWith('ru') ? 'ru' : 'en';
}

export default i18n;

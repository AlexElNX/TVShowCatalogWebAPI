import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import StyledSelect from './StyledSelect';

export default function LanguageSelector() {
  const { i18n, t } = useTranslation();
  const language = (i18n.resolvedLanguage || i18n.language || 'en').startsWith('ru') ? 'ru' : 'en';
  return <StyledSelect className="language-picker" ariaLabel={t('language')} icon={Languages} value={language} onChange={value => i18n.changeLanguage(value)} options={[{ value: 'en', label: 'English · EN' }, { value: 'ru', label: 'Русский · RU' }]} />;
}

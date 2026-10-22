import {Check, ChevronDown} from 'lucide-react';
import {useEffect, useRef, useState} from 'react';

export default function StyledSelect({value, onChange, options, ariaLabel, icon: Icon, className = ''}) {
    const [open, setOpen] = useState(false);
    const root = useRef(null);
    const selected = options.find(option => option.value === value) || options[0];
    useEffect(() => {
        const onPointerDown = event => {
            if (!root.current?.contains(event.target)) setOpen(false);
        };
        const onKeyDown = event => {
            if (event.key === 'Escape') setOpen(false);
        };
        document.addEventListener('pointerdown', onPointerDown);
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('pointerdown', onPointerDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, []);
    return <div className={`styled-select ${className} ${open ? 'is-open' : ''}`} ref={root}>
        <button type="button" className="styled-select-trigger" aria-label={ariaLabel} aria-haspopup="listbox"
                aria-expanded={open} onClick={() => setOpen(v => !v)}>
            {Icon && <Icon size={15} className="styled-select-leading"/>}<span>{selected?.label}</span><ChevronDown
            size={15} className="styled-select-chevron"/>
        </button>
        {open &&
            <div className="styled-select-menu" role="listbox" aria-label={ariaLabel}>{options.map(option => <button
                type="button" role="option" aria-selected={option.value === value} key={option.value}
                className={`styled-select-option ${option.value === value ? 'selected' : ''}`} onClick={() => {
                onChange(option.value);
                setOpen(false);
            }}><span>{option.label}</span>{option.value === value && <Check size={15}/>}</button>)}</div>}
    </div>;
}

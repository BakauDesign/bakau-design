import {
  $,
  component$,
  useSignal,
  useVisibleTask$
} from '@builder.io/qwik';

import {
  useLocation,
  useNavigate
} from '@builder.io/qwik-city';

import { Toggle } from './toggle';

import UKFlag from "~/assets/icons/uk-flag.png?jsx";

export const ToggleLanguage = component$(() => {
    const language = useSignal('indonesia');
    const location = useLocation();
    const nav = useNavigate();

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {
        track(() => language.value);

        const localLanguage = localStorage.getItem('bakau-design-language');
        const langInUrl = location.url.searchParams.get('locale');

        if (localLanguage && localLanguage !== language.value) {
            language.value = localLanguage;
        } else if (!localLanguage && !langInUrl) {
            localStorage.setItem('bakau-design-language', 'indonesia');
        }

        const langToUse = language.value === 'indonesia' ? 'id' : 'en';
        
        if (langToUse !== langInUrl) {
            nav(`?locale=${langToUse}`, { replaceState: true });
        }
    });

    const toggleLanguage = $(() => {
        const newLanguage = language.value === 'indonesia' ? 'inggris' : 'indonesia';
        language.value = newLanguage;
        localStorage.setItem('bakau-design-language', newLanguage);

        const langToUse = newLanguage === 'indonesia' ? 'id' : 'en';
        nav(`?locale=${langToUse}`);
    });

    return (
        <section class="flex items-center gap-3">
            <UKFlag />
            <Toggle
                toggleClick$={toggleLanguage}
                value={language.value === 'inggris'}
            />
        </section>
    );
});
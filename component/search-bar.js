import { ButtonIcon, Field, Input } from '@orderandchaos/react-components';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SearchBar = (
    {
        onClick,
        className = '',
        name = 'search',
        label = 'Search',
        type = 'text',
        valid = false,
        error = false,
        ...props
    }) =>
    <form>
        <Field
            className={'form-field--search form-field--inline ' + className}
            type='text'
            error={error}
        >
            <Input
                className={'input--search border-radius--right--flat ' +
                className} error={error} label='Search'
                {...props}
            />
            <ButtonIcon
                ariaLabel='Search'
                icon={<FontAwesomeIcon icon={['fas', 'search']}/>}
                onClick={onClick}
                className={'border-radius--left--flat'}
            />
        </Field>
    </form>
;

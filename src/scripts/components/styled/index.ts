import styled from 'styled-components';

export const HighlightTitle = styled.h1`
    &::after {
        content: " ";
        display: block;
        width: 75px;
        height: 3px;
        background: var(--${(props) => props.color || 'danger'});
        margin-top: 6px;
    }
`;

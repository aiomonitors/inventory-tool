import * as React from 'react';
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'sidebar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'main' : React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}
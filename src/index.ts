import './styles.scss';

import { startup } from './scripts';

const runTheApp = () => {
    const rootElement = window.document.getElementById('root');
    startup(rootElement);

    if (module.hot) {
        module.hot.accept(['./scripts'], () => {
            const { startup: nextStartup } = require('./scripts');
            nextStartup(rootElement);
        });
    }
};

runTheApp();
import { AppCoreContext } from 'qoobee';
import { WithContextProps } from 'react-context-service';
import { RouteComponentProps } from 'react-router';
import { ModalProps } from 'reactstrap';

import { AuthClient } from './AuthClient';

interface GlobalModalModalProps extends ModalProps {
    readonly onOk: () => void;
    readonly okLabel: string;
}

interface DomainContext extends AppCoreContext<{}> {
    readonly authClient: AuthClient<{}>;
    readonly globalModal?: GlobalModalModalProps;
    readonly globalModalProgressing?: boolean;
    readonly globalModalVisibled?: boolean;
}

export type WithDomainContext = WithContextProps<DomainContext, {}>;

export type AppPageProps<T = {}> =
    RouteComponentProps<T> &
    WithDomainContext;
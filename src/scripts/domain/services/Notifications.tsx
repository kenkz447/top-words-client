import { events } from 'qoobee';
import * as React from 'react';
import { ToastProvider, withToastManager } from 'react-toast-notifications';

interface NotificationsProps {
    // tslint:disable-next-line:no-any
    readonly toastManager: any;
}

class Notifications extends React.PureComponent<NotificationsProps> {

    private readonly onShowNotification = ({ type, content }) => {
        const { toastManager } = this.props;
        if (!toastManager) {
            return;
        }

        toastManager.add(content, {
            appearance: type,
            autoDismiss: true,
            pauseOnHover: true,
        });
    }

    public componentDidMount() {
        events.addListener('SHOW_NOTIFICATION', this.onShowNotification);
    }

    public render() {
        return null;
    }
}

const ToastManager = withToastManager(Notifications);

export default () => <ToastProvider><ToastManager /></ToastProvider>;
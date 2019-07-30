import * as React from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';

import { BaseComponent } from '@/domain';

interface TopicFilterProps {
    readonly currentLevel: string;
}

export class TopicFilter extends BaseComponent<TopicFilterProps> {
    public render() {
        const { currentLevel } = this.props;

        const beginnerUrl = new URL(location.href);
        beginnerUrl.searchParams.set('level', 'beginner');

        const intermediateUrl = new URL(location.href);
        intermediateUrl.searchParams.set('level', 'intermediate');

        return (
            <Nav pills={true} className={this.classNames('nav-pills-danger', 'text-center')}>
                <NavItem className="w-50">
                    <NavLink
                        tag={Link}
                        to={`${beginnerUrl.pathname}${beginnerUrl.search}`}
                        replace={true}
                        active={currentLevel === 'beginner'}
                    >
                        Beginner
                    </NavLink>
                </NavItem>
                <NavItem className="w-50">
                    <NavLink
                        tag={Link}
                        to={`${intermediateUrl.pathname}${intermediateUrl.search}`}
                        replace={true}
                        active={currentLevel === 'intermediate'}
                    >
                        Intermediate
                    </NavLink>
                </NavItem>
            </Nav>
        );
    }
}
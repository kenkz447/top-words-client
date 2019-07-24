import * as classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import {
    Pagination as BootstrapPagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';
import styled from 'styled-components';

const PaginationWrapper = styled.div`
    &.vertical {
        .pagination {
            display: inline-block;
        }
        .page-item {
            margin-bottom: 5px;
        }
    }
`;

interface PaginationProps {
    readonly className?: string;
    readonly start: number;
    readonly limit: number;
    readonly totalItem?: number;
    readonly getPagerUrl: (pageIndex: number) => void;
    readonly vetical?: boolean;
}

export class Pagination extends React.PureComponent<PaginationProps> {

    public static readonly defaultProps = {
        totalItem: 0
    };

    public render() {
        const { getPagerUrl, className, totalItem, limit, start, vetical } = this.props;
        const totalPage = Math.ceil(totalItem! / limit);

        if (totalPage <= 0) {
            return null;
        }

        const currentPageIndex = start / limit;

        const pagers: React.ReactElement[] = [];
        for (let pageIndex = 0; pageIndex < totalPage; pageIndex++) {
            pagers.push(
                <PaginationItem active={currentPageIndex === pageIndex}>
                    <PaginationLink tag={Link} to={getPagerUrl(pageIndex)}>
                        {pageIndex + 1}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return (
            <PaginationWrapper className={classNames(className, { 'vertical': vetical === true })}>
                <BootstrapPagination >
                    {pagers}
                </BootstrapPagination>
            </PaginationWrapper>
        );
    }
}

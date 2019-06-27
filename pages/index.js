import 'isomorphic-unfetch';
import Link from 'next/link';
import Page from '../layout/main.js';
import React, { Fragment } from 'react';
import {
    Column,
    Container,
    Pretitle,
    Row,
    Text,
    Title,
} from '@orderandchaos/react-components';
import { baseUrl } from '../constants';
import { withRouter } from 'next/router';

class CommonsDivisionList extends React.Component {

    static async getInitialProps({query}) {
        const page = query.page || 1;
        const search = query.search || '';
        let url = baseUrl + '/commons-division/page/' + page;
        if(search !== '') {
            url += '?filter=title:' + search;
        }
        const res = await fetch(url);
        const json = await res.json();

        return {json};
    };

    prevLink = ({page, total, limit}, search) => {
        const hasPrev = page > 1;
        if(!hasPrev) {
            return null;
        }
        let params = `/?page=${page - 1}`;
        let pretty = '/page/' - 1;
        if(search) {
            params = `${params}&search=${search}`;
            pretty = `${pretty}/search/${search}`;
        }

        return (
            <Link
                href={params} as={pretty}
            >
                <a className="pagination--button">Prev</a>
            </Link>
        );
    };
    // Todo: Finish these links
    nextLink = ({page, total, limit}, search) => {
        const hasNext = page < total / limit;
        if(!hasNext) {
            return null;
        }
        let params = `/?page=${page + 1}`;
        let pretty = '/page/' + 1;
        if(search) {
            params = `${params}&search=${search}`;
            pretty = `${pretty}/search/${search}`;
        }

        return (
            <Link
                href={params} as={pretty}
            >
                <a className="pagination--button">Next</a>
            </Link>
        );
    };

    render() {
        const {search} = this.props.router.query;
        const {data, meta} = this.props.json;
        return (
            <Page>
                <Container>
                    <Row>
                        <Column>
                            <header>
                                <Pretitle>Found {meta.total} results</Pretitle>
                                <Title tag={'h2'}>
                                    Searched for: {search || 'All'}
                                </Title>
                                {search
                                    ? <Link
                                        href={`/`} as={`/`}
                                    >Clear</Link>
                                    : null}
                            </header>
                            <hr/>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            {data.map(commonsDivision => (
                                <Fragment>
                                    <Link
                                        href={`/commons-division/?id=${commonsDivision.id}`}
                                        as={`/commons-division/${commonsDivision.id}`}
                                    >
                                        <a>
                                            <Title tag="h3">{commonsDivision.title}</Title>
                                        </a>
                                    </Link>
                                    <Text>{commonsDivision.date.replace(/\d{2}:\d{2}:\d{2} GMT/i, '')}</Text>
                                    <Text>Margin: {commonsDivision.margin}</Text>
                                    <Text>
                                        <Link
                                            href={`/commons-division/?id=${commonsDivision.id}`}
                                            as={`/commons-division/${commonsDivision.id}`}
                                        >
                                            <a className="button">View</a>
                                        </Link>
                                    </Text>
                                    <hr/>
                                </Fragment>
                            ))}
                            <Text>Total: {meta.total}</Text>
                            <Text>Page: {meta.page}</Text>
                            <nav className="pagination">
                                {this.prevLink(meta, search)}
                                {this.nextLink(meta, search)}
                            </nav>
                        </Column>
                    </Row>
                </Container>
            </Page>
        );
    }
}

CommonsDivisionList = withRouter(CommonsDivisionList);

export default CommonsDivisionList;

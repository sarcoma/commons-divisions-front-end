import 'isomorphic-unfetch';
import Link from 'next/link';
import Page from '../layout/main.js';
import React, { Fragment } from 'react';
import {
    Column,
    Container,
    Row,
    Text,
    Title,
} from '@orderandchaos/react-components';

function CommonsDivisionList({commonsDivisionList}) {
    const {page} = commonsDivisionList.meta;
    const next = page < commonsDivisionList.meta.total /
    commonsDivisionList.meta.limit ? page + 1 : false;
    const prev = page > 0 ? page + 1 : false;
    return (
        <Page>
            <Container>
                <Row>
                    <Column>
                        {commonsDivisionList.data.map(commonsDivision => (
                            <Fragment>
                                <Title tag="h2">{commonsDivision.title}</Title>
                                <Text>{commonsDivision.date}</Text>
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
                        <Text>Total: {commonsDivisionList.meta.total}</Text>
                        <Text>Page: {commonsDivisionList.meta.page}</Text>
                        <nav className="pagination">
                            {
                                prev
                                    ? <Link
                                        href={`/?page=${prev}`} as={`/page/${prev}`}
                                    >
                                        <a className="pagination--button">Prev</a>
                                    </Link>
                                    : null
                            }
                            {
                                next
                                    ? <Link
                                        href={`/?page=${next}`} as={`/page/${next}`}
                                    >
                                        <a className="pagination--button">Next</a>
                                    </Link>
                                    : null
                            }
                        </nav>
                    </Column>
                </Row>
            </Container>
        </Page>
    );
}

CommonsDivisionList.getInitialProps = async({req, query}) => {
    const page = query.page || 1;
    const res = await fetch(
        'https://commonsdivisionsapi.orderandchaoscreative.com/commons-division/page/' +
        page);
    const json = await res.json();
    return {commonsDivisionList: json};
};

export default CommonsDivisionList;


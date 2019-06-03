import 'isomorphic-unfetch';
import Link from 'next/link';
import Page from '../layout/main.js';
import React, { Fragment } from 'react';
import {
    Button,
    Column,
    Container,
    Input,
    Row,
    Text,
    Title,
} from '@orderandchaos/react-components';
import { baseUrl } from '../constants';
import Router, { withRouter } from 'next/router';

class CommonsDivisionList extends React.Component {

    state = {search: ''};

    static async getInitialProps({query}) {
        const page = query.page || 1;
        const search = query.search || '';
        let url = baseUrl + '/commons-division/page/' + page;
        if (search !== '') {
            url += '?filter=title:' + search
        }
        const res = await fetch(url);
        const json = await res.json();

        return {json};
    };

    handler = (event) => {
        const {query} = this.props.router;
        console.log(event);
        Router.push({
            pathname: '/',
            query: {page: query.page, search: this.state.search},
        });
    };

    render() {
        const {data, meta} = this.props.json;
        const {page, total, limit} = meta;
        const next = page < total / limit ? page + 1 : false;
        const prev = page > 0 ? page + 1 : false;

        return (
            <Page>
                <Container>
                    <Row>
                        <Column>
                            <Input
                                onChange={this.handleInputChange}
                                value={this.state.search}
                            />
                            <Button onClick={this.handler}>Search</Button>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            {data.map(commonsDivision => (
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
                            <Text>Total: {meta.total}</Text>
                            <Text>Page: {meta.page}</Text>
                            <nav className="pagination">
                                {
                                    prev
                                        ? <Link
                                            href={`/?page=${prev}`}
                                            as={`/page/${prev}`}
                                        >
                                            <a className="pagination--button">Prev</a>
                                        </Link>
                                        : null
                                }
                                {
                                    next
                                        ? <Link
                                            href={`/?page=${next}`}
                                            as={`/page/${next}`}
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

    handleInputChange = (event) => {
        console.log(event);
        this.setState({search: event.target.value});
    }
}

CommonsDivisionList = withRouter(CommonsDivisionList);

export default CommonsDivisionList;


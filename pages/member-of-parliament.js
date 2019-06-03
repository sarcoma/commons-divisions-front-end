import 'isomorphic-unfetch';
import Page from '../layout/main.js';
import {
    Column,
    Container,
    Row,
    Text,
    Title,
} from '@orderandchaos/react-components';
import React from 'react';
import { baseUrl } from '../constants';

function MemberOfParliament({memberOfParliament}) {

    return (
        <Page>
            <Container>
                <Row>
                    <Column>
                        <Title tag="h2">{memberOfParliament.name}</Title>
                        <Text>{memberOfParliament.party}<br/>{memberOfParliament.constituency}
                        </Text>
                    </Column>
                </Row>
            </Container>
        </Page>
    );
}

MemberOfParliament.getInitialProps = async({req, query}) => {
    const id = query.id || 1;
    const res = await fetch(baseUrl + '/member-of-parliament/' + id);
    const json = await res.json();
    return {memberOfParliament: json};
};

export default MemberOfParliament;


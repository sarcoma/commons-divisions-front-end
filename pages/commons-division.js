import 'isomorphic-unfetch';
import Link from 'next/link';
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

function CommonsDivision({commonsDivision}) {

    const filterByVote = (vote) => commonsDivision.votes.filter(
        cd => cd.vote === vote).map(cd => {
        const mp = cd.member_of_parliament;
        return <div className="border--bottom">
            <Title tag="h3">{mp.name}</Title>
            <Text>{mp.party}<br/>{mp.constituency}</Text>
            <Text className="margin-bottom--none">
                <Link
                    href={`/member-of-parliament/?id=${mp.id}`}
                    as={`/member-of-parliament/${mp.id}`}
                >
                    <a className="button">View</a>
                </Link>
            </Text>
        </div>;
    });

    const ayeVotes = filterByVote('aye');
    const noVotes = filterByVote('no');
    const didNotVote = filterByVote('no_vote');

    return (
        <Page>
            <Container>
                <Row>
                    <Column>
                        <Title tag="h2">{commonsDivision.title}</Title>
                        <Text>{commonsDivision.date}</Text>
                        <Text className={'text--semi-bold'}>{
                            ayeVotes.length > noVotes.length
                                ? 'The ayes have it'
                                : noVotes.length > ayeVotes.length
                                ? 'The noes have it'
                                : 'Votes tied'
                        }.{' '}
                            <span className={'text--regular'}>
                               Margin {commonsDivision.margin} votes
                            </span>
                        </Text>
                        <Row>
                            <Column span={['1']}>Ayes</Column>
                            <Column span={['11']}>
                                <div
                                    style={{
                                        height: '60px',
                                        width: ((ayeVotes.length /
                                            commonsDivision.votes.length) *
                                            100) + '%',
                                    }} className="bc--dark-grey"
                                />
                            </Column>
                        </Row>
                        <Row>
                            <Column span={['1']}>Noes</Column>
                            <Column span={['11']}>
                                <div
                                    style={{
                                        height: '60px',
                                        width: ((noVotes.length /
                                            commonsDivision.votes.length) *
                                            100) + '%',
                                    }} className="bc--darker-grey"
                                />
                            </Column>
                        </Row>
                        <Row>
                            <Column span={['1']}>No Vote</Column>
                            <Column span={['11']}>
                                <div
                                    style={{
                                        height: '60px',
                                        width: ((didNotVote.length /
                                            commonsDivision.votes.length) *
                                            100) + '%',
                                    }} className="bc--grey"
                                />
                            </Column>
                        </Row>
                        <Title tag="h3">Votes</Title>
                        <Row>
                            <Column span={['4']}>
                                <div className="border--left padding-left--half-gutter">
                                    <Title
                                        tag="h4"
                                        className="border--bottom padding-bottom--gutter-half"
                                    >Aye: {ayeVotes.length}</Title>
                                    {ayeVotes}
                                </div>
                            </Column>
                            <Column span={['4']}>
                                <div className="border--left padding-left--half-gutter">
                                    <Title
                                        tag="h4"
                                        className="border--bottom padding-bottom--gutter-half"
                                    >No: {noVotes.length}</Title>
                                    {noVotes}
                                </div>
                            </Column>
                            <Column span={['4']}>
                                <div className="border--left padding-left--half-gutter">
                                    <Title
                                        tag="h4"
                                        className="border--bottom padding-bottom--gutter-half"
                                    >Did Not Vote: {didNotVote.length}</Title>
                                    {didNotVote}
                                </div>
                            </Column>
                        </Row>
                    </Column>
                </Row>
            </Container>
        </Page>
    );
}

CommonsDivision.getInitialProps = async({req, query}) => {
    const id = query.id || 1;
    const res = await fetch(baseUrl + '/commons-division/' + id);
    const json = await res.json();
    return {commonsDivision: json};
};

export default CommonsDivision;


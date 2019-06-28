import 'isomorphic-unfetch';
import Link from 'next/link';
import Page from '../layout/main.js';
import {
    Block,
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
            <Block>
                <div>
                    <Title tag="h3">{mp.name}</Title>
                    <Text className={'margin-left--auto margin-bottom--none '}>{mp.party}<br/>
                        {mp.constituency}
                    </Text>
                </div>
                <Text className="margin-bottom--none margin-left--auto margin-top--auto">
                    <Link
                        href={`/member-of-parliament/?id=${mp.id}`}
                        as={`/member-of-parliament/${mp.id}`}
                    >
                        <a className="button">View</a>
                    </Link>
                </Text>
            </Block>
        </div>;
    });

    const filterVoteData = (vote) => commonsDivision.votes.filter(
        cd => cd.vote === vote).map(cd => {
        return cd.member_of_parliament;
    });

    const ayeVotes = filterByVote('aye');
    const noVotes = filterByVote('no');
    const didNotVote = filterByVote('no_vote');

    const ayeVotesData = filterVoteData('aye');
    const noVotesData = filterVoteData('no');
    const didNotVoteData = filterVoteData('no_vote');

    const voteBar = votes => {
        const splitVotes = votes.reduce((acc, vote) => {
            if(!acc.hasOwnProperty(vote.party)) {
                acc[vote.party] = {votes: 1};
            } else {
                acc[vote.party].votes++;
            }
            return acc;
        }, {});

        const sections = [];
        for(const party in splitVotes) {
            if(splitVotes.hasOwnProperty(party)) {
                sections.push(voteSection(party, splitVotes[party].votes));
            }
        }
        return sections;
    };

    const voteSection = (party, votes) => <div
        title={`${party}: ${votes} votes`} style={{
        height: '60px',
        width: ((votes / commonsDivision.votes.length) * 100) + '%',
    }} className={[getPartyColour(party), 'vote-section'].join(' ')}
    />;

    const getPartyColour = (party) => {
        switch(party) {
            case 'Labour':
            case 'Labour (Co-op)':
                return 'labour';
            case 'Conservative':
                return 'tory';
            case 'Liberal Democrat':
                return 'lib-dem';
            case 'Green Party':
                return 'green-party';
            case 'Scottish National Party':
                return 'snp';
            case 'Sinn Féin':
                return 'sinn-fein';
            case 'Democratic Unionist Party':
                return 'dup';
            case 'Change UK - The Independent Group':
                return 'change-uk';
            case 'Plaid Cymru':
                return 'plaid-cymru';
            case 'Brexit Party':
                return 'brexit-party';
            case 'UK Independence Party':
                return 'ukip';
            default:
                return 'independent';
        }
    };

    return (
        <Page>
            <Container>
                <Row>
                    <Column>
                        <Title tag="h2">{commonsDivision.title}</Title>
                        <Text className="border--bottom">
                            {commonsDivision.date
                                .replace(/\d{2}:\d{2}:\d{2} GMT/i, '')}
                        </Text>
                        <Title tag="h3" className={'text--semi-bold'}>{
                            ayeVotes.length > noVotes.length
                                ? 'The Ayes have it'
                                : noVotes.length > ayeVotes.length
                                ? 'The Noes have it'
                                : 'Votes tied'
                        }.{' '}
                            <br/>
                            <span className={'text--regular'}>
                               Margin {commonsDivision.margin} votes.
                            </span>
                        </Title>
                        <Row>
                            <Column span={['1']}>
                                <Text>
                                    <strong>Ayes</strong><br/>
                                    {ayeVotes.length}
                                </Text>
                            </Column>
                            <Column span={['11']}>
                                <div className={'vote-bar'}>
                                    {voteBar(ayeVotesData)}
                                </div>
                            </Column>
                        </Row>
                        <Row>
                            <Column span={['1']}>
                                <Text>
                                    <strong>noes</strong><br/>
                                    {noVotes.length}
                                </Text>
                            </Column>
                            <Column span={['11']}>
                                <div className={'vote-bar'}>
                                    {voteBar(noVotesData)}
                                </div>
                            </Column>
                        </Row>
                        <Row>
                            <Column span={['1']}>
                                <Text>
                                    <strong>Did not vote</strong><br/>
                                    {didNotVote.length}
                                </Text>
                            </Column>
                            <Column span={['11']}>
                                <div className={'vote-bar'}>
                                    {voteBar(didNotVoteData)}
                                </div>
                            </Column>
                        </Row>
                        <Title tag="h3" className="border--top">Votes</Title>
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


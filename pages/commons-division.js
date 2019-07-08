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
import React, { Component } from 'react';
import { baseUrl } from '../constants';
import * as PropTypes from 'prop-types';
import MpVoteList from '../component/mp-vote-list';
import getPartyColour from '../utility/party-colour';

class CommonsDivision extends Component {

    filterByVote = (vote) => this.props.commonsDivision.votes
        .filter(cd => cd.vote === vote)
        .map(cd => {
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

    filterVoteData = (vote) =>
        this.props.commonsDivision.votes.filter(
            cd => cd.vote === vote).map(cd => {
            return cd.member_of_parliament;
        });

    ayeVotes = this.filterByVote('aye');
    noVotes = this.filterByVote('no');
    didNotVote = this.filterByVote('no_vote');

    ayeVotesData = this.filterVoteData('aye');
    noVotesData = this.filterVoteData('no');
    didNotVoteData = this.filterVoteData('no_vote');

    voteBar = votes => {
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
                sections.push(this.voteSection(party, splitVotes[party].votes));
            }
        }
        return sections;
    };

    voteSection = (party, votes) => <div
        title={`${party}: ${votes} votes`} style={{
        height: '60px',
        width: ((votes / this.props.commonsDivision.votes.length) * 100) + '%',
    }} className={[getPartyColour(party), 'vote-section'].join(' ')}
    />;

    render() {
        let {commonsDivision} = this.props;
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
                                this.ayeVotes.length > this.noVotes.length
                                    ? 'The Ayes have it'
                                    : this.noVotes.length > this.ayeVotes.length
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
                                        {this.ayeVotes.length}
                                    </Text>
                                </Column>
                                <Column span={['11']}>
                                    <div className={'vote-bar'}>
                                        {this.voteBar(this.ayeVotesData)}
                                    </div>
                                </Column>
                            </Row>
                            <Row>
                                <Column span={['1']}>
                                    <Text>
                                        <strong>noes</strong><br/>
                                        {this.noVotes.length}
                                    </Text>
                                </Column>
                                <Column span={['11']}>
                                    <div className={'vote-bar'}>
                                        {this.voteBar(this.noVotesData)}
                                    </div>
                                </Column>
                            </Row>
                            <Row>
                                <Column span={['1']}>
                                    <Text>
                                        <strong>Did not vote</strong><br/>
                                        {this.didNotVote.length}
                                    </Text>
                                </Column>
                                <Column span={['11']}>
                                    <div className={'vote-bar'}>
                                        {this.voteBar(this.didNotVoteData)}
                                    </div>
                                </Column>
                            </Row>
                            <Title
                                tag="h3" className="border--top"
                            >Votes</Title>
                            <MpVoteList votes={this.props.commonsDivision.votes} />
                        </Column>
                    </Row>
                </Container>
            </Page>
        );
    }
}

CommonsDivision.propTypes = {commonsDivision: PropTypes.any};

CommonsDivision.getInitialProps = async({req, query}) => {
    const id = query.id || 1;
    const res = await fetch(baseUrl + '/commons-division/' + id);
    const json = await res.json();
    return {commonsDivision: json};
};

export default CommonsDivision;


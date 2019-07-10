import 'isomorphic-unfetch';
import Page from '../layout/main.js';
import {
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
import VoteBar from '../component/vote-bar';

class CommonsDivision extends Component {

    filterByVote = (vote) => this.props.commonsDivision.votes
        .filter(cd => cd.vote === vote);

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
                            <div className={'bar-chart-grid'}>
                                <div className={'bar-chart-line'}
                                     style={{left: ((100/6) - 8.3333).toFixed(4) + '%'}}
                                />
                                <div className={'bar-chart-line'}
                                     style={{left: (((100/6) * 2)  - 8.3333).toFixed(4) + '%'}}
                                />
                                <div className={'bar-chart-line'}
                                     style={{left: (((100/6) * 3)  - 8.3333).toFixed(4) + '%'}}
                                />
                                <div className={'bar-chart-line'}
                                     style={{left: (((100/6) * 4)  - 8.3333).toFixed(4) + '%'}}
                                />
                                <div className={'bar-chart-line'}
                                     style={{left: (((100/6) * 5)  - 8.3333).toFixed(4) + '%'}}
                                />
                                <div className={'bar-chart-line'}
                                     style={{left: (((100/6) * 6)  - 8.3333).toFixed(4) + '%'}}
                                />
                                <Row>
                                    <VoteBar
                                        title={'Ayes'}
                                        votes={this.ayeVotes}
                                        voteData={this.ayeVotesData}
                                        voteTotal={commonsDivision.votes.length}
                                    />
                                </Row>
                                <Row>
                                    <VoteBar
                                        title={'Noes'}
                                        votes={this.noVotes}
                                        voteData={this.noVotesData}
                                        voteTotal={commonsDivision.votes.length}
                                    />
                                </Row>
                                <Row>
                                    <VoteBar
                                        title={'No Vote'}
                                        votes={this.didNotVote}
                                        voteData={this.didNotVoteData}
                                        voteTotal={commonsDivision.votes.length}
                                    />
                                </Row>
                            </div>
                            <MpVoteList votes={this.props.commonsDivision.votes}/>
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


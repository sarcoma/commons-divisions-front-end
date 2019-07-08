import React, { Component, Fragment } from 'react';
import { Column, Row, Text } from '@orderandchaos/react-components';
import MpVoteRow from './mp-vote-row';

export default class MpVoteList extends Component {

    state = {
        sort: 'mp',
        filter: 'name',
    };

    voteList = () => {
        let votes = this.filterVotes();
        switch(this.state.sort) {
            case 'name':
                votes = this.sortByMpField(votes, this.state.sort);
                break;
            case 'vote':
                votes = this.sortByVotes(votes);
                break;
        }
        return votes;
    };

    filterVotes = (filter = false) => {
        if (!filter) return this.props.votes;
        return this.props.votes.filter(vote => {
            const mp = vote.member_of_parliament;
            return (
                mp.name.includes(this.state.filter) ||
                mp.constituency.includes(this.state.filter) ||
                mp.party.includes(this.state.filter)
            );
        })
    };

    sortByMpField = (votes, field) =>
        votes.sort((a, b) => {
            a = a.member_of_parliament[field].toLowerCase();
            b = b.member_of_parliament[field].toLowerCase();
            return a < b ? -1 : a > b ? 1 : 0;
        });

    sortByVotes = (votes) =>
        votes.sort((a, b) => {
            a = a.vote.toLowerCase();
            b = b.vote.toLowerCase();
            return a < b ? -1 : a > b ? 1 : 0;
        });

    render() {
        return (
            <Fragment>
                <Row className="padding--none">
                    <div className={'margin-left--half-gutter padding-left--half-gutter'}/>
                    <Column span={['1']} push={['6']}>
                        <Text className="margin-bottom--none">
                            Aye
                        </Text>
                    </Column>
                    <Column span={['1']}>
                        <Text className="margin-bottom--none">
                            No
                        </Text>
                    </Column>
                    <Column span={['1']}>
                        <Text className="margin-bottom--none">
                            No Vote
                        </Text>
                    </Column>
                </Row>
                {this.voteList().map(v => <MpVoteRow vote={v.vote} member_of_parliament={v.member_of_parliament}/>)}
            </Fragment>
        );
    }
}

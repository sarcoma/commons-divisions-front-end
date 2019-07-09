import React, { Component, Fragment } from 'react';
import {
    Column,
    Row,
    Text,
    Title,
} from '@orderandchaos/react-components';
import MpVoteRow from './mp-vote-row';
import { SearchBar } from './search-bar';

export default class MpVoteList extends Component {

    state = {
        sort: 'name',
        filter: '',
    };

    voteList = () => {
        let votes = this.filterVotes();
        switch(this.state.sort) {
            case 'name':
            case 'constituency':
            case 'party':
                votes = this.sortByMpField(votes, this.state.sort);
                break;
            case 'vote':
                votes = this.sortByVotes(votes);
                break;
        }
        return votes;
    };

    filterVotes = () => {
        return this.props.votes.filter(vote => {
            const mp = vote.member_of_parliament;
            return (
                mp.name.toLowerCase().includes(this.state.filter.toLowerCase()) ||
                mp.constituency.toLowerCase().includes(this.state.filter.toLowerCase()) ||
                mp.party.toLowerCase().includes(this.state.filter.toLowerCase())
            );
        });
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

    handleFilterChange = (e) => {
        this.setState({filter: e.target.value});
    };

    handleSortChange = (sort) => {
        this.setState({sort});
    };

    render() {
        return (
            <Fragment>
                <Row>
                    <Column span={['4']}>
                        <Title tag={'h3'}>Votes</Title>
                    </Column>
                    <Column span={['8']}>
                        <SearchBar
                            className={'margin-left--auto'}
                            onChange={this.handleFilterChange}
                            value={this.state.filter}
                            type='text'
                            name='text'
                            label='Filter'
                            placeholder='Search'
                        />
                    </Column>
                </Row>
                <Row className="padding--none">
                    <div className={'margin-left--half-gutter padding-left--half-gutter'}/>
                    <Column span={['2']} push={['5']}>
                        <Text className="margin-bottom--none">
                            Aye
                        </Text>
                    </Column>
                    <Column span={['2']}>
                        <Text className="margin-bottom--none">
                            No
                        </Text>
                    </Column>
                    <Column span={['2']}>
                        <Text className="margin-bottom--none">
                            No Vote
                        </Text>
                    </Column>
                </Row>
                {this.voteList()
                    .map(v => <MpVoteRow
                        key={v.member_of_parliament.constituency}
                        vote={v.vote}
                        member_of_parliament={v.member_of_parliament}
                    />)}
            </Fragment>
        );
    }
}

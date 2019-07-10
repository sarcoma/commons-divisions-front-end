import React, {Fragment} from 'react';
import { Column, Text } from '@orderandchaos/react-components';
import getPartyColour from '../utility/party-colour';

const VoteBar = ({title, votes, voteData, voteTotal}) => {

    const makeVoteBar = data => {
        const splitVotes = data.reduce((acc, vote) => {
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

    const voteSection = (party, voteSection) => <div
        title={`${party}: ${votes} votes`} style={{
        height: '60px',
        width: ((voteSection / voteTotal) * 100) + '%',
    }} className={[getPartyColour(party), 'vote-section'].join(' ')}
    />;

    return (
        <Fragment>
            <Column span={['1']}>
                <Text>
                    <strong>{title}</strong><br/>
                    {votes.length}
                </Text>
            </Column>
            <Column span={['11']}>
                <div className={'vote-bar'}>
                    {makeVoteBar(voteData)}
                </div>
            </Column>
        </Fragment>
    );
};

export default VoteBar;

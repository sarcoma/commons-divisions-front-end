import React from 'react';
import { Column, Row, Text } from '@orderandchaos/react-components';
import getPartyColour from '../utility/party-colour';

const MpVoteRow = ({vote, member_of_parliament}) =>
    <Row>
        <div
            className={[
                'margin-left--half-gutter',
                'padding-left--half-gutter',
                getPartyColour(member_of_parliament.party),
            ].join(' ')}
        />
        <Column span={['3']}>
            <Text className="text--one margin-bottom--none">
                {member_of_parliament.party.toUpperCase()}
            </Text>
        </Column>
        <Column span={['3']}>
            <Text className="margin-bottom--none">
                <strong>{member_of_parliament.name}</strong><br/>{member_of_parliament.constituency}
            </Text>
        </Column>
        <Column span={['1']}>
            <Text className="margin-bottom--none">
                {vote === 'aye' ? 'x' : null}
            </Text>
        </Column>
        <Column span={['1']}>
            <Text className="margin-bottom--none">
                {vote === 'no' ? 'x' : null}
            </Text>
        </Column>
        <Column span={['1']}>
            <Text className="margin-bottom--none">
                {vote === 'no_vote' ? 'x' : ''}
            </Text>
        </Column>
    </Row>
;

export default MpVoteRow;

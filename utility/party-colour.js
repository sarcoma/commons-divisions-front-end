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

export default getPartyColour;


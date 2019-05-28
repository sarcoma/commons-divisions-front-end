import 'isomorphic-unfetch';
import Link from 'next/link';

function Page({ commonsDivision }) {

    const filterByVote = (vote) => commonsDivision.votes.filter(cd => cd.vote === vote).map(cd => {
                                const mp = cd.member_of_parliament;
                                return <div>
                                    <h4 style={{marginTop: "0", marginBottom: "0"}}>{mp.name}</h4>
                                    <p style={{marginTop: "0"}}>{mp.party}<br/>{mp.constituency}</p>
                                </div>
                            });

    const ayeVotes = filterByVote('aye');
    const noVotes = filterByVote('no');
    const didNotVote = filterByVote('no_vote');

    return  (
        <div>
            <div>
                <h2>{commonsDivision.title}</h2>
                <p>{commonsDivision.date}</p>
                <p>Margin: {commonsDivision.margin}</p>
                <div>
                    <h3>Votes</h3>
                    <div style={{display: "flex"}}>
                    <div style={{width: "33%"}}>
                        <h4>Aye: {ayeVotes.length}</h4>
                        {ayeVotes}
                    </div>
                    <div style={{width: "33%"}}>
                        <h4>No: {noVotes.length}</h4>
                        {noVotes}
                    </div>
                    <div style={{width: "33%"}}>
                        <h4>Did Not Vote: {didNotVote.length}</h4>
                        {didNotVote}
                    </div>
                    </div>
                </div>
                <hr/>
            </div>
        </div>
    );
}

Page.getInitialProps = async ({ req, query }) => {
    const id = query.id || 1;
    const res = await fetch('https://commonsdivisions.orderandchaoscreative.com/commons-division/' + id);
    const json = await res.json();
    return { commonsDivision: json };
};

export default Page;


import 'isomorphic-unfetch';
import Link from 'next/link';
import Page from '../layout/main.js'

function CommonsDivision({ commonsDivision }) {

    const filterByVote = (vote) => commonsDivision.votes.filter(cd => cd.vote === vote).map(cd => {
                                const mp = cd.member_of_parliament;
                                return <div>
                                    <h4>{mp.name}</h4>
                                    <p>{mp.party}<br/>{mp.constituency}</p>
                                    <p>
                                    <Link href={`/member-of-parliament/?id=${mp.id}`}
                                          as={`/member-of-parliament/${mp.id}`}>
                                        <a className="button">View</a>
                                    </Link>
                                    </p>
                                </div>
                            });

    const ayeVotes = filterByVote('aye');
    const noVotes = filterByVote('no');
    const didNotVote = filterByVote('no_vote');

    return  (
        <Page>
            <div className="container">
                <div className="row">
                    <div className="column col-12">
                        <h2>{commonsDivision.title}</h2>
                        <p>{commonsDivision.date}</p>
                        <p>Margin: {commonsDivision.margin}</p>
                        <h3>Votes</h3>
                        <div className="row">
                            <div className="column col-4">
                                <h4>Aye: {ayeVotes.length}</h4>
                                {ayeVotes}
                            </div>
                            <div className="column col-4">
                                <h4>No: {noVotes.length}</h4>
                                {noVotes}
                            </div>
                            <div className="column col-4">
                                <h4>Did Not Vote: {didNotVote.length}</h4>
                                {didNotVote}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}

CommonsDivision.getInitialProps = async ({ req, query }) => {
    const id = query.id || 1;
    const res = await fetch('https://commonsdivisions.orderandchaoscreative.com/commons-division/' + id);
    const json = await res.json();
    return { commonsDivision: json };
};

export default CommonsDivision;


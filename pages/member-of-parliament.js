import 'isomorphic-unfetch';
import Link from 'next/link';
import Page from '../layout/main.js'

function MemberOfParliament({ memberOfParliament }) {

    return  (
        <Page>
            <div className="container">
                <div className="row">
                    <div className="column col-12">
                        <h2>{memberOfParliament.name}</h2>
                        <p>{memberOfParliament.party}<br/>{memberOfParliament.constituency}</p>
                    </div>
                </div>
            </div>
        </Page>
    );
}

MemberOfParliament.getInitialProps = async ({ req, query }) => {
    const id = query.id || 1;
    const res = await fetch('https://commonsdivisionsapi.orderandchaoscreative.com/member-of-parliament/' + id);
    const json = await res.json();
    return { memberOfParliament: json };
};

export default MemberOfParliament;


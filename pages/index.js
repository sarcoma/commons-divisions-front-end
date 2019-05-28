import 'isomorphic-unfetch';
import Link from 'next/link';
import Page from '../layout/main.js'

function CommonsDivisionList({ commonsDivisionList }) {
    const {page} = commonsDivisionList.meta;
    const next = page < commonsDivisionList.meta.total / commonsDivisionList.meta.limit ? page + 1 : false;
    const prev = page > 0 ? page + 1 : false;
    return  (
        <Page>
            <div className="container">
                <div className="row">
                    <div className="column col-12">
                        {commonsDivisionList.data.map(commonsDivision => (
                            <div>
                                <h2>{commonsDivision.title}</h2>
                                <p>{commonsDivision.date}</p>
                                <p>Margin: {commonsDivision.margin}</p>
                                <p>
                                    <Link href={`/commons-division/?id=${commonsDivision.id}`}
                                          as={`/commons-division/${commonsDivision.id}`}>
                                        <a className="button">View</a>
                                    </Link>
                                </p>
                                <hr/>
                            </div>
                        ))}
                        <p>Total: {commonsDivisionList.meta.total}</p>
                        <p>Page: {commonsDivisionList.meta.page}</p>
                        <ul>
                            {
                                prev
                                ? <li><Link href={`/?page=${prev}`}
                                            as={`/page/${prev}`}>
                                    <a className="button">Prev</a>
                                </Link></li>
                                : null
                            }
                            {
                                next
                                ? <li><Link href={`/?page=${next}`}
                                            as={`/page/${next}`}>
                                    <a className="button">Next</a>
                                </Link></li>
                                : null
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </Page>
    );
}

CommonsDivisionList.getInitialProps = async ({ req, query }) => {
    const page = query.page || 1
    const res = await fetch('https://commonsdivisions.orderandchaoscreative.com/commons-division/page/' + page);
    const json = await res.json();
    return { commonsDivisionList: json };
};

export default CommonsDivisionList;


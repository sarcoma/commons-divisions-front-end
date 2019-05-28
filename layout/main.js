import Meta from '../component/meta'
import Footer from '../component/footer'
import Header from '../component/header'

export default ({ children }) => (
      <div className="page-wrapper">
        <Meta />
        <Header />
        {children}
        <Footer />
      </div>
)


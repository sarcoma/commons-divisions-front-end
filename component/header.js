import { Column, Container, Row, Title } from '@orderandchaos/react-components';
import React, { Component } from 'react';
import { SearchBar } from './search-bar';
import Router, { withRouter } from 'next/router';

class Header extends Component {
    state = {search: ''};

    handler = (event) => {
        event.preventDefault();
        const {query} = this.props.router;
        Router.push({
            pathname: '/',
            query: {page: query.page, search: this.state.search},
        });
    };

    handleInputChange = (event) => {
        this.setState({search: event.target.value});
    };

    render() {
        return (
            <Container>
                <Row>
                    <Column span={['8', 'sml-7', 'xsml-12']}>
                        <Title tag="h1">Commons Divisions</Title>
                    </Column>
                    <Column span={['4', 'sml-5', 'xsml-12']}>
                        <SearchBar
                            onChange={this.handleInputChange}
                            value={this.state.search}
                            onClick={this.handler}
                        />
                    </Column>
                </Row>
            </Container>
        );
    }
}

Header = withRouter(Header);

export default Header;

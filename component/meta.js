import React from 'react';
import Head from 'next/head'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import styles from '../sass/styles.scss'

library.add(fas);

export default () => (
      <div>
        <Head>
            <title>House of Commons Divisions</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />
            <link href="https://fonts.googleapis.com/css?family=Vollkorn:400,700&display=swap&subset=latin-ext" rel="stylesheet" />
        </Head>
      </div>
)

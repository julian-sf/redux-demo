import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

const Home = () => (
  <div className='container'>
    <Head>
      <title>Create Next App</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <main>
      <h1 className='title'>
        Welcome to{' '}
        <Link href={'/'}>
          <a>Next.js!</a>
        </Link>
      </h1>

      <p className='description'>
        Get started by editing <code>pages/index.tsx</code>
      </p>

      <div className='grid'>
        <a href='https://nextjs.org/docs' className='card'>
          <h3>Documentation &rarr;</h3>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a href='https://nextjs.org/learn' className='card'>
          <h3>Learn &rarr;</h3>
          <p>Learn about Next.js in an interactive course with quizzes!</p>
        </a>

        <a href='https://github.com/zeit/next.js/tree/master/examples' className='card'>
          <h3>Examples &rarr;</h3>
          <p>Discover and deploy boilerplate example Next.js projects.</p>
        </a>

        <a
          href='https://zeit.co/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          className='card'
        >
          <h3>Deploy &rarr;</h3>
          <p>Instantly deploy your Next.js site to a public URL with ZEIT Now.</p>
        </a>
      </div>
    </main>

    <footer>
      <a
        href='https://zeit.co?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
        target='_blank'
        rel='noopener noreferrer'
      >
        Powered by <img src='/zeit.svg' alt='ZEIT Logo' />
      </a>
    </footer>
  </div>
)

export default Home

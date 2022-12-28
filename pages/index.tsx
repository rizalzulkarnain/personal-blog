import fs from 'fs';
import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';

import { BlogList } from '@components/blog';
import { PortfolioList } from '@components/portfolios';

import { BaseLayout } from '@components/layout';
import { getBlogs } from '@lib/blog';
import { Blog } from '@interfaces/Blog';
import { saveSearchData } from '@lib/md';
import { getPortfolios } from '@lib/Portfolio';
import { Portfolio } from '@interfaces/Portfolio';

type Props = {
  blogs: Blog[];
  portfolios: Portfolio[];
};

const Home: NextPage<Props> = ({ blogs, portfolios }) => {
  return (
    <BaseLayout>
      <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
        Newest Blogs
        <Link legacyBehavior href='/blogs'>
          <a className='text-sm ml-1 text-indigo-600'>(See All)</a>
        </Link>
      </h2>

      {/* Blog List Starts */}
      <BlogList blogs={blogs} />
      {/* Blog List Ends */}

      <br></br>

      <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
        Portfolios
        <Link legacyBehavior href='/portfolios'>
          <a className='text-sm ml-1 text-indigo-600'>(See All)</a>
        </Link>
      </h2>

      {/* Portfolio List Starts */}
      <PortfolioList portfolios={portfolios} />
      {/* Portfolio List Ends */}
    </BaseLayout>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const blogs = getBlogs();
  const portfolios = getPortfolios();

  const content = {
    blogs,
    portfolios,
  };

  saveSearchData(content);

  return {
    props: {
      blogs: blogs.slice(0, 4),
      portfolios: portfolios.slice(0, 4),
    },
  };
};

export default Home;

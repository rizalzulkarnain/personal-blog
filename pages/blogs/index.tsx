import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import { Blog } from '@interfaces/Blog';
import { PageLayout } from '@components/layout';
import { BlogList } from '@components/blog';
import { getBlogs } from '@lib/blog';

type Props = {
  blogs: Blog[];
};

const BlogPage: NextPage<Props> = ({ blogs }) => {
  return (
    <PageLayout pageTitle={`All Blogs`}>
      <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
        All Blogs
      </h2>
      <BlogList blogs={blogs} />
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const blogs = getBlogs();

  return {
    props: { blogs },
  };
};

export default BlogPage;

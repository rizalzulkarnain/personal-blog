import { NextPage, GetStaticProps, GetStaticPaths } from 'next/types';
import { PageLayout } from '@components/layout';
import { getBlogSlugs, getBlogBySlugWithMarkdown } from '@lib/blog';
import { Blog } from '@interfaces/Blog';
import { ParsedUrlQuery } from 'querystring';
import { BlogHeader } from '@components/blog/';

type Props = {
  blog: Blog;
};

const BlogDetail: NextPage<Props> = ({ blog }) => {
  return (
    <>
      <PageLayout pageTitle={blog.title}>
        <div className='w-2/3 m-auto'>
          {/* Blog Header Starts */}
          <BlogHeader blog={blog} />
          {/* Blog Header Ends */}
          <article className='prose lg:prose-lg markdown-image-50'>
            {/* Blog Content Here */}
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            {blog.content}
          </article>
        </div>
      </PageLayout>
    </>
  );
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const { slug } = context.params!;
  const blog = await getBlogBySlugWithMarkdown(slug);

  return {
    props: { blog },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const slugs = getBlogSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default BlogDetail;

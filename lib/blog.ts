import { join } from 'path';
import { Blog } from '@interfaces/Blog';
import {
  getDir,
  getFileNames,
  getItemInPath,
  getAllItems,
  markdownToHTML,
} from './md';

const BLOG_DIR = getDir('/content/blogs');

const getBlogFileNames = () => {
  return getFileNames(BLOG_DIR);
};

const getBlogSlugs = () => {
  return getBlogFileNames().map((filename) => filename.replace(/\.md$/, ''));
};

const getBlog = (filename: string): Blog => {
  const blog = getItemInPath(join(BLOG_DIR, filename)) as Blog;
  blog.slug = filename.replace(/\.md$/, '');
  return blog;
};

const getBlogBySlug = (slug: string) => {
  const filename = slug + '.md';
  return getBlog(filename);
};

const getBlogBySlugWithMarkdown = async (slug: string): Promise<Blog> => {
  const blog = getBlogBySlug(slug);
  blog.content = await markdownToHTML(blog.content);
  return blog;
};

const getBlogs = (): Blog[] => {
  const names = getBlogFileNames();
  return getAllItems(names, getBlog) as Blog[];
};

export {
  getBlogFileNames,
  getBlog,
  getBlogs,
  getBlogSlugs,
  getBlogBySlug,
  getBlogBySlugWithMarkdown,
};

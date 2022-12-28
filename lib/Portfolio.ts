import { Portfolio } from '@interfaces/Portfolio';
import {
  getAllItems,
  getDir,
  getFileNames,
  getItemInPath,
  markdownToHTML,
} from './md';
import { join } from 'path';

const PORTFOLIO_DIR = getDir('/content/portfolios');

const getPortfolioFileNames = () => {
  return getFileNames(PORTFOLIO_DIR);
};

const getPortfolioSlugs = () => {
  return getPortfolioFileNames().map((filename) =>
    filename.replace(/\.md$/, '')
  );
};

const getPortfolio = (filename: string): Portfolio => {
  const portfolio = getItemInPath(join(PORTFOLIO_DIR, filename)) as Portfolio;
  portfolio.slug = filename.replace(/\.md$/, '');
  return portfolio;
};

const getPortfolios = (): Portfolio[] => {
  const names = getPortfolioFileNames();
  return getAllItems(names, getPortfolio) as Portfolio[];
};

const getPortfolioBySlug = (slug: string) => {
  const filename = slug + '.md';
  return getPortfolio(filename);
};

const getPortfolioBySlugWithMarkdown = async (
  slug: string
): Promise<Portfolio> => {
  const portfolio = getPortfolioBySlug(slug);
  portfolio.content = await markdownToHTML(portfolio.content);
  return portfolio;
};

export { getPortfolios, getPortfolioBySlugWithMarkdown, getPortfolioSlugs };

import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import { Portfolio } from '@interfaces/Portfolio';
import { PageLayout } from '@components/layout';
import { PortfolioList } from '@components/portfolios';
import { getPortfolios } from '@lib/Portfolio';

type Props = {
  portfolios: Portfolio[];
};

const PortfolioPage: NextPage<Props> = ({ portfolios }) => {
  return (
    <PageLayout pageTitle={`All Portfolios`}>
      <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
        All Portfolios
      </h2>
      <PortfolioList portfolios={portfolios} />
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const portfolios = getPortfolios();

  return {
    props: { portfolios },
  };
};

export default PortfolioPage;

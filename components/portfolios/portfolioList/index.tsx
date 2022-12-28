import React, { FC } from 'react';

import PortfolioItem from './PortfolioItem';
import { Portfolio } from '@interfaces/Portfolio';

type Props = {
  portfolios: Portfolio[];
};

const PortfolioList:FC<Props> = ({portfolios}) => {
  return (
    <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
      {portfolios.map((portfolio) => (
        <PortfolioItem key={portfolio.slug} portfolio={portfolio} />
      ))}
    </div>
  );
};

export default PortfolioList;

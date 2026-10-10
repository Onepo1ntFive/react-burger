import { Layout } from '@components/layout/layout.tsx';

import type * as React from 'react';

export const PageFeed = (): React.JSX.Element => {
  return (
    <Layout>
      <div className={'p-10'}>PageFeed</div>
      <div className={'p-10'}>Пейдж андер констракшн</div>
    </Layout>
  );
};

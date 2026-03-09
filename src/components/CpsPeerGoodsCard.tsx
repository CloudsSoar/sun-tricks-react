import React from 'react';
import { View } from '@kds/web';
import GalaxyCard from '@es/kprom-cps-kds-dynamic-goods-card';
import { rem } from '@kds/web-api';

export default function CpsPeerGoodsCard(props: any) {
  console.log('   ...props?.extLog', {
    ...props?.extLog,
    special: '同行跟选（达人详情）',
  });
  return (
    <GalaxyCard
      {...props}
      extLog={{
        ...props?.extLog,
        special: '同行跟选（达人详情）',
      }}
    />
  );
}
'use client';

import dynamic from 'next/dynamic';

const Global3DBackground = dynamic(() => import('./Global3DBackground'), { ssr: false });

export default function Global3DBackgroundLoader() {
  return <Global3DBackground />;
}

'use client';

import {getQueryClient} from '@functions/app/get_query_client';
import {QueryClientProvider} from '@tanstack/react-query';
import {ReactNode} from 'react';

type Props = {
  children: ReactNode;
};

/**
 * Global provider for the different needed app providers
 *
 * @param children {ReactNode} - children components
 */
export default function AppProviders({children}: Props) {
  const queryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

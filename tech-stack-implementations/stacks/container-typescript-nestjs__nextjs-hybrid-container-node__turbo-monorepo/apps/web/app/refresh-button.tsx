/**
 * App: container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo
 * File: apps/web/app/refresh-button.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: AI Coding Agent (Codex)
 * Date: 2026-04-04T16:40:00Z
 * Description: Client-side refresh control for revalidating the home page.
 */

'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Button } from '@repo/ui';

export function RefreshButton(): JSX.Element {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="primary"
      loading={isPending}
      onClick={() => {
        startTransition(() => {
          router.refresh();
        });
      }}
    >
      Refresh Status
    </Button>
  );
}

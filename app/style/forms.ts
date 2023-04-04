import { text } from './text';

export const form = 'w-[400px] grid grid-flow-row gap-2';

export const formLabel = `${text()} block mb-0 w-full`;

export const input = `${text()} p-0 w-full rounded bg-transparent border border-gray data-[invalid=true]:border-red-600`;

export const errorMessage = 'block mt-[4px] -text-1 text-red-600';

import { Sun } from 'lucide-react';
import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export default function AppearanceToggleTab({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('inline-flex gap-1 rounded-lg bg-neutral-100 p-1', className)} {...props}>
            <button
                className="flex items-center rounded-md px-3.5 py-1.5 transition-colors bg-white shadow-xs text-black"
                disabled
            >
                <Sun className="-ml-1 h-4 w-4" />
                <span className="ml-1.5 text-sm">Light</span>
            </button>
        </div>
    );
}

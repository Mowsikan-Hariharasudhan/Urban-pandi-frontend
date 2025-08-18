import React from 'react';
import { cn } from '@/lib/utils';
import { Info, Sparkles } from 'lucide-react';

interface InfoBannerProps {
  tone?: 'blue' | 'orange' | 'neutral';
  title: string;
  description?: string | React.ReactNode;
  className?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  compact?: boolean;
}

const toneClasses: Record<string, { container: string; title: string; iconBg: string; iconColor: string; } > = {
  blue: {
    container: 'bg-blue-50 border-blue-100',
    title: 'text-blue-700',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  orange: {
    container: 'bg-orange-50 border-orange-100',
    title: 'text-orange-700',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600'
  },
  neutral: {
    container: 'bg-gray-50 border-gray-200',
    title: 'text-gray-700',
    iconBg: 'bg-gray-200',
    iconColor: 'text-gray-600'
  }
};

const InfoBanner: React.FC<InfoBannerProps> = ({
  tone = 'blue',
  title,
  description,
  className,
  action,
  icon,
  compact
}) => {
  const t = toneClasses[tone];
  return (
    <div className={cn('rounded-xl border p-5 md:p-6 flex flex-col md:flex-row gap-4 md:items-center', t.container, className)}>
      <div className="flex items-start gap-4 flex-1">
        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center shrink-0', t.iconBg)}>
          {icon || (tone === 'orange' ? <Sparkles className={cn('w-5 h-5', t.iconColor)} /> : <Info className={cn('w-5 h-5', t.iconColor)} />)}
        </div>
        <div>
          <p className={cn('font-semibold mb-1', t.title)}>{title}</p>
          {!compact && description && (
            <div className="text-sm text-gray-600 leading-relaxed">{description}</div>
          )}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};

export default InfoBanner;

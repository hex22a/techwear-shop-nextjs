'use client';

import CrossIcon from '@/app/ui/vector/cross.svg';

export type ErrorComponentProps = {
  message: string,
  onClose?: () => void,
}

export default function ErrorComponent(props: ErrorComponentProps) {
  const {message, onClose} = props;
  return (
    <div className="relative rounded-xl border border-red-500 bg-red-100 p-4 text-red-500">
      {message}
      <button onClick={onClose} className="absolute top-4 right-1">
        <CrossIcon className="fill-red-500 opacity-60" width={24} height={24} />
      </button>
    </div>
  );
}

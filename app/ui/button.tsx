import clsx from 'clsx';
//import { useFormStatus } from 'react-dom';
import { sendGTMEvent } from '@next/third-parties/google';


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {

 // const status = useFormStatus();
  return (
    <button
      {...rest}
      onClick={() => sendGTMEvent({event: 'buttonClicked', value: 'xyz'})}
      className={clsx(
        'flex h-10 items-center rounded-lg bg-[#27374D] px-4 text-sm font-medium text-white transition-colors hover:bg-[#526D82] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-[#526D82] active:bg-[#27374D] aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className,
      )}

     // disabled={status.pending}
    > 
      {children}
    </button>
  );
}

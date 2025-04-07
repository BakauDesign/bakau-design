import {
    component$,
    Slot,
    type QwikIntrinsicElements,
  } from '@builder.io/qwik';
  import { cva, type VariantProps } from 'class-variance-authority';
  import { cn } from '~/lib/utils';
  
  // Variant style
  const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm sm:text-base font-inter font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    {
      variants: {
        variant: {
          default: 'bg-lime-400 text-lime-950 hover:bg-lime-300',
          destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
          outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
          secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
          ghost: 'hover:bg-accent hover:text-accent-foreground',
          link: 'text-primary underline-offset-4 hover:underline',
        },
        size: {
          default: 'h-10 px-4 py-2',
          sm: 'h-9 rounded-md px-3',
          lg: 'h-11 rounded-md px-8',
          icon: 'h-10 w-10',
        },
      },
      defaultVariants: {
        variant: 'default',
        size: 'default',
      },
    }
  );
  
  // Komponen props
  type ButtonProps = {
    as?: 'button' | 'a' | 'div';
    class?: string;
    variant?: VariantProps<typeof buttonVariants>['variant'];
    size?: VariantProps<typeof buttonVariants>['size'];
  } & QwikIntrinsicElements['button'] & QwikIntrinsicElements['a'] & QwikIntrinsicElements['div'];
  
export const Button = component$<ButtonProps>((props) => {
    const {
        as = 'button',
        class: className,
        variant,
        size,
        ...rest
    } = props;
  
    const classes = cn(buttonVariants({ variant, size, class: className }));
  
    if (as === 'a') {
        const aProps = rest as QwikIntrinsicElements['a'];
        return (
            <a class={classes} {...aProps}>
            <Slot />
            </a>
        );
    }
  
    if (as === 'div') {
        const divProps = rest as QwikIntrinsicElements['div'];
        return (
            <div class={classes} {...divProps}>
            <Slot />
            </div>
        );
    }
  
    const buttonProps = rest as QwikIntrinsicElements['button'];
    return (
        <button class={classes} {...buttonProps}>
            <Slot />
        </button>
    );
});
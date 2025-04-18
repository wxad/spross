import * as React from 'react';
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useMergeRefs,
  FloatingPortal,
  FloatingOverlay,
  useTransitionStatus,
} from '@floating-ui/react';

interface ModalOptions {
  initialOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function useModal({
  initialOpen = false,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: ModalOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    open,
    onOpenChange: setOpen,
  });

  const context = data.context;

  const click = useClick(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' });
  const role = useRole(context);

  const interactions = useInteractions([click, dismiss, role]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
    }),
    [open, setOpen, interactions, data],
  );
}

type ContextType = ReturnType<typeof useModal> | null;

const ModalContext = React.createContext<ContextType>(null);

export const useModalContext = () => {
  const context = React.useContext(ModalContext);

  if (context == null) {
    throw new Error('Modal components must be wrapped in <Modal />');
  }

  return context;
};

export function Modal({
  children,
  ...options
}: {
  children: React.ReactNode;
} & ModalOptions) {
  const modal = useModal(options);
  return <ModalContext.Provider value={modal}>{children}</ModalContext.Provider>;
}

interface ModalTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const ModalTrigger = React.forwardRef<HTMLElement, React.HTMLProps<HTMLElement> & ModalTriggerProps>(
  function ModalTrigger({ children, asChild = false, ...props }, propRef) {
    const context = useModalContext();
    const childrenRef = (children as any).ref;
    const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

    // `asChild` allows the user to pass any element as the anchor
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(
        children,
        context.getReferenceProps({
          ref,
          ...props,
          ...children.props,
          'data-state': context.open ? 'open' : 'closed',
        }),
      );
    }

    return (
      <button
        ref={ref}
        // The user can style the trigger based on the state
        data-state={context.open ? 'open' : 'closed'}
        {...context.getReferenceProps(props)}
      >
        {children}
      </button>
    );
  },
);

export const ModalContent = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(function ModalContent(
  props,
  propRef,
) {
  const { context: floatingContext, ...context } = useModalContext();
  const { isMounted, status } = useTransitionStatus(floatingContext);
  const ref = useMergeRefs([context.refs.setFloating, propRef]);
  const { type, ...otherProps } = props;

  return (
    isMounted && (
      <FloatingPortal>
        <FloatingOverlay data-status={status} data-spross-modal-overlay={type} lockScroll>
          <div ref={ref} {...context.getFloatingProps(otherProps)} data-status={status}>
            {otherProps.children}
          </div>
        </FloatingOverlay>
      </FloatingPortal>
    )
  );
});

export const ModalClose = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  function ModalClose(props, ref) {
    const { setOpen } = useModalContext();
    return <button type="button" {...props} ref={ref} onClick={() => setOpen(false)} />;
  },
);

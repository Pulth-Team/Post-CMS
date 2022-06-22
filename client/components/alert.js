import { Dialog, Transition } from "@headlessui/react";
import { useState, useEffect, Fragment } from "react";

const Alert = ({ open, handle, children }) => {
  useEffect(() => {
    const time = setTimeout(() => {
      handle(false);
    }, 2000);
    return () => {
      clearTimeout(time);
    };
  }, [open]);

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog className="relative z-10" onClose={() => null}>
        <div className="fixed flex items-start justify-center inset-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="-translate-y-full"
            enterTo=""
            leave="ease-in duration-200"
            leaveFrom=""
            leaveTo="-translate-y-full"
          >
            <Dialog.Panel className="mx-auto bg-white rounded-b-lg h-auto p-2 border-x-2 border-b-2 shadow-lg select-none">
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Alert;

import { Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

interface IProps {
  content: string;
  visible: boolean;
}

export default function Tip(props: IProps) {
  const { visible } = props;

  return (
    <Transition
      as={Fragment}
      show={visible}
      enter="transform transition duration-[400ms]"
      enterFrom="opacity-0 scale-50"
      enterTo="opacity-100 scale-100"
      leave="transform duration-200 transition ease-in-out"
      leaveFrom="opacity-100 scale-100 "
      leaveTo="opacity-0 scale-95"
    >
      <div className="block rounded-md bg-white shadow-lg px-4 py-2 fixed top-1">
        <p>
          {
            props.content
          }
        </p>
      </div>
    </Transition>
  )
}

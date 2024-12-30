'use client'

import { Fragment } from 'react'
import { Disclosure, Menu } from '@headlessui/react'
import { DocumentTextIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  {
    name: '결재',
    href: '#',
    icon: DocumentTextIcon,
    current: false,
    children: [
      { 
        name: '결재 요청', 
        href: '/payment/request',
        current: false 
      },
      { 
        name: '결재 목록', 
        href: '/payment/list',
        current: false 
      },
    ]
  },
];

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="space-y-1">
      {navigation.map((item) => (
        <Disclosure key={item.name} as="div" className="space-y-1">
          {({ open }) => (
            <>
              <Disclosure.Button
                className={`
                  group w-full flex items-center px-2 py-2 text-sm font-medium rounded-md
                  ${item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <item.icon className="mr-3 h-6 w-6" />
                <span className="flex-1">{item.name}</span>
                <svg
                  className={`${open ? 'rotate-90' : ''} ml-3 h-5 w-5 transform transition-colors duration-150 ease-in-out`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Disclosure.Button>
              <Disclosure.Panel className="space-y-1">
                {item.children.map((subItem) => (
                  <Link
                    key={subItem.name}
                    href={subItem.href}
                    className={`
                      group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium rounded-md
                      ${pathname === subItem.href 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                    `}
                  >
                    {subItem.name}
                  </Link>
                ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </nav>
  )
}

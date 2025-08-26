'use client';

import { SunIcon } from '@heroicons/react/16/solid';

export function Header() {
  return (
    <div className="sticky top-0 border-b border-b-gray-300 bg-white  backdrop-blur-md flex items-center gap-8 py-6 px-4 p-4 z-50">
      <a className="btn btn-ghost normal-case text-xl">TanStock</a>
      <div className="flex gap-2 items-center justify-between flex-1">
        <ul className="flex gap-4">
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Projects</a>
          </li>
          <li>
            <a>Blog</a>
          </li>
          <li>
            <a>Contact</a>
          </li>
        </ul>
        <div className="flex gap-4 items-center justify-end">
          <button className="btn btn-primary">
            <SunIcon className="size-5"></SunIcon>
          </button>
          <button className="btn btn-primary">EN</button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
const Navigation = () => {
  return (
    <div className="capitalize text-center mx-auto flex items-stretch">
      <Link href="/role/project/status/material-request">
        <div
          className="font-medium w-20 md:w-32 lg:w-36 xl:w-40 py-3 px-2 xl:py-5"
          style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
        >
          material request
        </div>
      </Link>
      <Link href="/role/project/status/good-issue">
        <div
          className="font-medium w-20 md:w-32 lg:w-36 xl:w-40 py-3 px-2 xl:py-5"
          style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
        >
          good issue
        </div>
      </Link>
      <Link href="/role/project/database-availability">
        <div
          className="font-medium w-20 md:w-32 lg:w-36 xl:w-40 py-3 px-2 xl:py-5"
          style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
        >
          database avail.
        </div>
      </Link>
    </div>
  );
};

export default Navigation;

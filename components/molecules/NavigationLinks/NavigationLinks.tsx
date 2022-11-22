import Link from 'next/link';

const NavigationLinks = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="ml-4">
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
      <div className="ml-4">
        <Link href="/add">
          <a>Add</a>
        </Link>
      </div>
    </div>
  );
};

export { NavigationLinks };

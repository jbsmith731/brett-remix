import { Outlet } from '@remix-run/react';
import { cx } from 'cva';
import { Footer } from '~/components/Footer';
import { Logo } from '~/components/Logo';
import { Nav } from '~/components/Nav';
import { container } from '~/style/container';

const HomeLayout = () => {
  return (
    <div className="py-4">
      <div className="md:fixed md:top-4 md:left-none md:right-none">
        <div
          className={cx(
            container,
            'flex justify-between items-baseline md:justify-end',
          )}
        >
          <Logo className="w-[18px] md:hidden" />

          <Nav />
        </div>
      </div>

      <main className={cx(container)}>
        <div className="max-md:mt-6 lg:max-w-[880px]">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
